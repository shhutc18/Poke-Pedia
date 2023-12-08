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
            // if the response is not successful, throw an error
            throw new Error("There was a problem retrieving the pokemon data. Most likely the pokemon is misspelled or does not exist.");
        }
    })
    .then(function(pokemonData) {
        // log the data to the console
        console.log(pokemonData);
        // call the function to display the data
        displayPokemon(pokemonData);
    })
    .catch(function(error) {
        // this will run if there is an error
        console.log("There was a problem: ", error.message);
    });

// function to display the pokemon data
function displayPokemon(data) {
    displayPokemonName(data.name);
    displayPokemonType(data.types);
    displayPokemonDexNumber(data.id);
    displayPokemonHeightWeight(data.height, data.weight);
    displayPokemonSprite(data.sprites.front_default);
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
    console.log("sprite url:", spriteURL);
    // create an image element
    let pokemonImage = document.createElement('img');
    // set the src attribute to the spriteURL
    pokemonImage.setAttribute('src', spriteURL);
    // append the image to the body
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

async function displayPokemonGeneration(speciesURL) {
    let generation = await getPokemonGeneration(speciesURL);
    console.log(generation);
}

async function getPokemonGeneration(speciesURL) {
    // scoped variable to hold the generation
    let generation = "";
    // fetch request using the speciesURL
    await fetch(speciesURL)
        .then(function(response) {
            // if the response is successful, return the json data
            if (response.ok) {
                return response.json();
            } else {
                // if the response is not successful, throw an error
                throw new Error("There was a problem retrieving the species data.");
            }
        })
        .then(function(speciesData) {
            // log the data to the console
            //console.log(speciesData);
            // call the function to display the data
            generation = speciesData.generation.name;
        })
        .catch(function(error) {
            // this will run if there is an error
            console.log("There was a problem: ", error.message);
        });

    // return the generation
    return generation;
}