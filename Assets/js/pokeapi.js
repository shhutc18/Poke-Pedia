//https://pokeapi.co/
// this is the base url for the api
const staticURL = 'https://pokeapi.co/api/v2/';
// this is the endpoint for the api to get a pokemon by name or id ex: https://pokeapi.co/api/v2/pokemon/pikachu
const pokemonEndpoint = 'pokemon/';
// hardcoding a pokemon name for testing
const pokemon = "pikachu";
// this is the full url to the api endpoint
let apiURL = staticURL + pokemonEndpoint + pokemon;

console.log(apiURL);

// fetch request using the apiURL
fetch(apiURL)
    .then(function(response) {
        // if the response is successful, return the json data
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("There was a problem retrieving the pokemon data. Most likely the pokemon is misspelled or does not exist.");
        }
    })
    .then(function(pokemonData) {
        // log the data to the console for testing
        console.log(pokemonData);
        // display the pokemon data on the page
        displayPokemon(pokemonData);
    })
    .catch(function(error) {
        console.log("There was a problem: ", error.message);
    });

// function to generate the pokemon data on the page
// for easier reading, I broke the data up into separate functions
// for testing, I am just logging the data to the console
function displayPokemon(data) {
    displayPokemonName(data.name);
    displayPokemonType(data.types);
    displayPokemonDexNumber(data.id);
    displayPokemonHeightWeight(data.height, data.weight);
    displayPokemonSprite(data.sprites.front_default);
    displayPokemonSprite(data.sprites.front_shiny);
    displayPokemonGeneration(data.species.url);
    displayPokemonStats(data.stats);
    displayPokemonMoves(data.moves);
}

function displayPokemonName(name) {
    console.log(name);
}

function displayPokemonType(types) {
    types.forEach(type => {
        console.log(type.type.name);
    });
}

function displayPokemonDexNumber(dexNumber) {
    console.log("PokeDex Number:", dexNumber);
}

function displayPokemonHeightWeight(height, weight) {
    console.log("Height:", height);
    console.log("Weight:", weight);
}

function displayPokemonSprite(spriteURL) {
    // create an image element and set the src attribute to the spriteURL
    let pokemonImage = document.createElement('img');
    pokemonImage.setAttribute('src', spriteURL);
    document.body.appendChild(pokemonImage);
}

function displayPokemonStats(stats) {
    stats.forEach(stat => {
        console.log(stat.stat.name, stat.base_stat);
    });
}

function displayPokemonMoves(moves) {
    moves.forEach(move => {
        console.log(move.move.name);
    });
}

// async function to wait for the generation data to be returned
async function displayPokemonGeneration(speciesURL) {
    let generation = await getPokemonGeneration(speciesURL);
    console.log(generation);
}

// gets the pokemon species data and returns the generation name
async function getPokemonGeneration(speciesURL) {
    // scoped variable to hold the generation
    let generation = "";
    // fetch request using the speciesURL passed in from the pokemon data
    await fetch(speciesURL)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("There was a problem retrieving the species data.");
            }
        })
        .then(function(speciesData) {
            generation = speciesData.generation.name;
        })
        .catch(function(error) {
            console.log("There was a problem: ", error.message);
        });

    // return the generation
    return generation;
}