//https://pokeapi.co/
let pokemonArray = [];

// input: pokemon name as a string
// results: pokemon data is fetched and displayed on the page
// for testing purposes, I am just logging the data to the console
function searchPokemon(name) {
    let apiURL = pokemonArray.find(pokemon => pokemon.name === name).url;
    console.log(apiURL);
    fetch(apiURL)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("There was a problem retrieving the pokemon data. Most likely the pokemon is misspelled or does not exist.");
            }
        })
        .then(function(pokemonData) {
            displayPokemon(pokemonData);
        })
        .catch(function(error) {
            console.log("There was a problem: ", error.message);
        });
}

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

async function displayPokemonGeneration(speciesURL) {
    let generation = await getPokemonGeneration(speciesURL);
    console.log(generation);
}

// parameters: speciesURL from the current pokemon data
// returned: generation name as a string
async function getPokemonGeneration(speciesURL) {
    let generation = "";
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

    return generation;
}

// parameters: none
// results: pokemonArray is populated with 1118 pokemon objects
// each pokemon object has a name and url property
async function getPokemonData() {
    const storedData = localStorage.getItem('pokemonData');
    if (storedData) {
        pokemonArray = JSON.parse(storedData).results;
    } else {
        await fetch('https://pokeapi.co/api/v2/pokemon?limit=1118')
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("There was a problem retrieving the pokemon data.");
                }
            })
            .then(function(pokemonData) {
                localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
                pokemonArray = pokemonData.results;
            })
            .catch(function(error) {
                console.log("There was a problem: ", error.message);
            });
    }
}
    
getPokemonData();

searchPokemon('squirtle');
