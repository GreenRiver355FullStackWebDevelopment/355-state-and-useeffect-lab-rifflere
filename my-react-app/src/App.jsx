import NameCards from './components/NameCards'
import PokemonDetails from './components/PokemonDetails';
import { useState, useEffect } from 'react'
import { Typography, Button } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffc107',
      main: '#f44336',
      dark: '#757575',
      contrastText: '#FAFAFA',
    }
  },
});

function App() {
  const [pokemon, setPokemon] = useState([])
  const [offset, setOffset] = useState(0);
  const [selectedURL, setSelectedURL] = useState("https://pokeapi.co/api/v2/pokemon/1/")
  const [selectedDetails, setSelectedDetails] = useState({pokemonName: "bulbasaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", height: 7, weight: 69, types: [
    {
    "slot": 1,
    "type": {
    "name": "grass",
    "url": "https://pokeapi.co/api/v2/type/12/"
    }
    },
    {
    "slot": 2,
    "type": {
    "name": "poison",
    "url": "https://pokeapi.co/api/v2/type/4/"
    }
    }
    ]})

  // Load all pokemon on page load, and when "back" and "next" buttons are selected
  useEffect( () => 
    {
      loadAllPokemon()
    }, [offset])

  // Checking selectedURL updates onClick of button
  useEffect(() => {
    // console.log(selectedURL)
    loadSelectedPokemon();
  }, [selectedURL])

  // API call to load up to 20 pokemon for the page
  const loadAllPokemon = async () => {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
    const data = await result.json()
    const { results } = data;
    // console.log("Pokemon set to: ", results)
    setPokemon(results)
  }

  // API call on specific Pokemon URL to get details
  const loadSelectedPokemon = async () => {
    const result = await fetch(selectedURL)
    const data = await result.json()

    console.log(selectedURL)
    const pokemonName = data.species.name;
    const img = data.sprites.front_default;
    const height = data.height;
    const weight = data.weight;
    const types = data.types;

    // console.log("Name: ", pokemonName, "image: ", img, "Height and weight: ", height, " ", weight)

    setSelectedDetails({pokemonName, img, height, weight, types})
  }

  // Clicking back and next buttons shift the offset
  const onClickBack = () => {
    if(offset > 19) {
      setOffset((prev) => prev - 20)
    } else {
      setOffset(1300);
    }
  }

  const onClickNext = () => {
    if(offset < 1300) {
      setOffset((prev) => prev + 20)
    } else {
      setOffset(20);
    }
  }

  return (
    <>
    <Typography variant="h3" component="h1" color="theme.primary.contrastText" sx={{color:"white", textAlign:"center"}}>Pokémon List</Typography>
    <NameCards pokemon={pokemon} setSelectedURL={setSelectedURL}/>
    {/* {pokemon.map(poke => <p>{poke.name}</p>)} */}
    <Button variant="contained" sx={{ backgroundColor:"grey", m:1}} onClick={onClickBack}>Back</Button>
    <Button variant="contained" sx={{ backgroundColor:"grey", m:1}} onClick={onClickNext}>Next</Button>
    <PokemonDetails selectedDetails={selectedDetails}/>
    </>
  )
}

export default App
