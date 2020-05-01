const ObjectsToCsv = require('objects-to-csv')
const Pokedex = require('pokedex');
const pokemon = require('pokemon');

// Create an instance of pokedex and get all pokemons
const pokedex = new Pokedex();
let pokemons = pokemon.all();

// Make an array of objects, 
// where each object has the information about the pokemon
let pokemonData = pokemons.map (pokemon => {
    let pokemonDetails = pokedex.pokemon(pokemon.toLowerCase());
    // Stringify the nested object
    pokemonDetails = {
        ...pokemonDetails,
        sprites: JSON.stringify(pokemonDetails.sprites)
    }
    return pokemonDetails;
})

// Write to CSV File
const writeToCsv = async (data) => {
    const csv = new ObjectsToCsv(data);

    // Save to file:
    await csv.toDisk('./pokedex.csv');
}

writeToCsv (pokemonData);