import { Grid, Button } from '@mui/material';

const NameCards = ({ pokemon, setSelectedURL }) => {
    return(
        <>
        <Grid container sx={{backgroundColor:"black", m:2, p:2, borderRadius:"5px"}}>
            {/* {console.log("In NameCards, Pokemon is: ", pokemon)} */}
            {pokemon.map( poke => <Button key={poke.name} sx={{p: 1, m: 1, backgroundColor: "grey", color: "white", borderRadius: "5px"}} onClick={() => setSelectedURL(poke.url)}>{poke.name}</Button>)}
        </Grid> 
        </>
    );
}

export default NameCards;