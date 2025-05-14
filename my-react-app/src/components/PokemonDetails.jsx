import { Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';

function PokemonDetails({selectedDetails}) {
    // console.log("SELECTED details: ", {selectedDetails})
    // console.log("Name: ", {selectedDetails.pokemonName})
    let types = ""
    selectedDetails.types.map(type => types = types.concat(" ", type.type.name))
    console.log("Types: ", types)

    return(
        <Card variant="outlined" sx={{m:5, p:2, width:"300px", height:"300px"}}>
            <Typography variant="h4" component="h2">{selectedDetails.pokemonName}</Typography>
            <CardContent>
                <CardMedia>
                    <img src={selectedDetails.img} />
                </CardMedia>
                <Typography component="p">Height: {selectedDetails.height}</Typography>
                <Typography component="p">Weight: {selectedDetails.weight}</Typography>
                <Typography component="p">Type(s):{types}</Typography>
            </CardContent>
        </Card>
    )
}

export default PokemonDetails;