//https://pokeapi.co/
let searchInput = document.getElementById('searchInput');
let searchButton = document.getElementById('searchButton');
let container = document.getElementById('pokemonContainer');

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
    displayPokemonSprite(data.sprites.front_default);
    displayPokemonSprite(data.sprites.front_shiny);
    displayPokemonName(data.name);
    displayPokemonGeneration(data.species.url);
    displayPokemonType(data.types);
    displayPokemonDexNumber(data.id);
    displayPokemonHeightWeight(data.height, data.weight);
    displayPokemonStats(data.stats);
    displayPokemonMoves(data.moves);
}

function displayPokemonName(name) {
    console.log(name);
    let pokemonName = document.createElement('h3');
    pokemonName.innerText = name;
    container.appendChild(pokemonName);
}

function displayPokemonType(types) {
    types.forEach(type => {
        let pokemonType = document.createElement('p');
        pokemonType.innerText = type.type.name;
        container.appendChild(pokemonType);
    });
}

function displayPokemonDexNumber(dexNumber) {
    let pokemonDexNumber = document.createElement('p');
    pokemonDexNumber.innerText = dexNumber;
    container.appendChild(pokemonDexNumber);
}

function displayPokemonHeightWeight(height, weight) {
    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = "Height: " + height;
    container.appendChild(pokemonHeight);
    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = "Weight: " + weight;
    container.appendChild(pokemonWeight);
}

function displayPokemonSprite(spriteURL) {
    // create an image element and set the src attribute to the spriteURL
    let pokemonImage = document.createElement('img');
    pokemonImage.setAttribute('src', spriteURL);
    container.appendChild(pokemonImage);
}

function displayPokemonStats(stats) {
    stats.forEach(stat => {
        let pokemonStat = document.createElement('p');
        pokemonStat.innerText = stat.stat.name + ": " + stat.base_stat;
        container.appendChild(pokemonStat);
    });
}

function displayPokemonMoves(moves) {
    let pokemonMoves = document.createElement('ul');
    moves.forEach(move => {
        let pokemonMove = document.createElement('li');
        pokemonMove.innerText = move.move.name;
        pokemonMoves.appendChild(pokemonMove);
    });
    container.appendChild(pokemonMoves);
}

async function displayPokemonGeneration(speciesURL) {
    let generation = await getPokemonGeneration(speciesURL);
    let pokemonGeneration = document.createElement('p');
    pokemonGeneration.innerText = generation;
    container.appendChild(pokemonGeneration);
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
    $(searchInput).autocomplete({
        source: pokemonArray.map(pokemon => pokemon.name)
    });
}

searchButton.addEventListener('click', function() {
    searchPokemon(searchInput.value);
});



getPokemonData();



