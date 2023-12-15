//https://pokeapi.co/
//html variables
let searchInput = $('#searchInput');
let searchButton = $('#searchButton');
let container = $('#pokemonContainer');
let pokemonNameEl = $('#pokemonNameEl');
let pokemonGenerationEl = $('#pokemonGenerationEl');
let pokemonSpriteEl = $('#pokemonSpriteEl');
let pokemonShinySpriteEl = $('#pokemonShinySpriteEl');
let pokemonTypeEl = $('#pokemonTypeEl');
let pokemonDexNumberEl = $('#pokemonDexNumberEl');
let pokemonHeightWeightEl = $('#pokemonHeightWeightEl');
let pokemonStatsEl = $('#pokemonStatsEl');
let pokemonMovesEl = $('#pokemonMovesEl');
//jquery autocomplete array for search bar
let pokemonArray = [];

// parameters: pokemon name as a string
// results: pokemon data is fetched and displayed on the page
function searchPokemon(name) {
    let apiURL = pokemonArray.find(pokemon => pokemon.name === name).url;
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

// parameters: data is the current pokemon data returned from the api
// results: pokemon data is displayed on the page
function displayPokemon(data) {
    displayPokemonSprite(data.sprites.front_default, false);
    displayPokemonSprite(data.sprites.front_shiny, true);
    displayPokemonName(data.name);
    displayPokemonGeneration(data.species.url);
    displayPokemonType(data.types);
    displayPokemonDexNumber(data.id);
    displayPokemonHeightWeight(data.height, data.weight);
    displayPokemonStats(data.stats);
    displayPokemonMoves(data.moves);
}

function displayPokemonName(name) {
    pokemonNameEl.text(name);
}

//parameters: types is an array of obects included in the api data. Each object has a name property that is the type name
//results: all types the pokemon has are appended to an unordered list and displayed on the page
function displayPokemonType(types) {
    types.forEach(type => {
        let pokemonType = $('<li>');
        pokemonType.text(type.type.name);
        pokemonTypeEl.append(pokemonType);
    });
}

function displayPokemonDexNumber(dexNumber) {
    pokemonDexNumberEl.text(dexNumber);
}

function displayPokemonHeightWeight(height, weight) {
    pokemonHeightWeightEl.text(height + " inches, " + weight + " lbs");
}

//parameters: spriteURL is the url of the sprite to be displayed
//            shiny is a boolean value that determines whether the sprite is shiny or not
//            true = shiny sprite, false = default sprite
//results: the default sprite or shiny sprite is appended to the page depending on the value of shiny
function displayPokemonSprite(spriteURL, shiny) {
    let pokemonImage = $('<img>', {src: spriteURL});
    if (shiny) {
        pokemonShinySpriteEl.append(pokemonImage);
    } else {
        pokemonSpriteEl.append(pokemonImage);
    }
}

//parameters: stats is an array of objects included in the api data. 
//            Each object has a name property that is the stat name
//            and a base_stat property that is the stat value
//results: all stats the pokemon has are appended to an unordered list and displayed on the page
function displayPokemonStats(stats) {
    stats.forEach(stat => {
        let pokemonStat = $('<li>');
        pokemonStat.text(stat.stat.name + ": " + stat.base_stat);
        pokemonStatsEl.append(pokemonStat);
    });
}

//parameters: moves is an array of objects included in the api data.
//            Each object has a move property that is the move name
//results: all moves the pokemon has are appended to an unordered list and displayed on the page
function displayPokemonMoves(moves) {
    moves.forEach(move => {
        let pokemonMove = $('<li>');
        pokemonMove.text(move.move.name);
        pokemonMovesEl.append(pokemonMove);
    });
}

// parameters: speciesURL which is included in the initial pokemon data
// results: generation name is displayed on the page
async function displayPokemonGeneration(speciesURL) {
    //api request to get the generation name
    let generation = await getPokemonGeneration(speciesURL);
    pokemonGenerationEl.text(generation);
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
// after the first time the data is fetched, it is stored in local storage
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
    //autocomplete feature on the search bar
    $(searchInput).autocomplete({
        source: pokemonArray.map(pokemon => pokemon.name)
    });
}

// event listener for the search button
searchButton.on('click', function() {
    searchPokemon(searchInput.val());
});

$('#logo').on('click', function() {
    window.location.href = 'index.html';
});

$(document).ready(function() {
    getPokemonData();
    // check for passed in pokemon name in the url
    let queryString = window.location.search;
    let name = queryString.split('=')[1];
    if (name) {
        searchPokemon(name);
    }
});


// Pokemon of Day

// Display current date
document.addEventListener('DOMContentLoaded', async (event) => {
    const h2Element = document.querySelector('h2');
    const dateParagraph = document.createElement('p');
    dateParagraph.className = 'text-center';
    const currentDate = dayjs().format('MMMM D, YYYY');
    dateParagraph.textContent = `Today is: ${currentDate}`;
    h2Element.insertAdjacentElement('afterend', dateParagraph);

    // Generate a random Pokemon ID
    const pokemonId = Math.floor(Math.random() * 898) + 1;

    // Fetch the Pokemon data from the PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemonData = await response.json();

    // Create and append the Pokemon sprite
    const pokemonSpriteEl = document.createElement('img');
    pokemonSpriteEl.src = pokemonData.sprites.front_default;
    pokemonSpriteEl.className = 'mx-auto'; // Center the image
    h2Element.insertAdjacentElement('afterend', pokemonSpriteEl);

    // Create and append the Pokemon name
    const pokemonNameEl = document.createElement('p');
    pokemonNameEl.textContent = pokemonData.name;
    pokemonNameEl.className = 'text-center';
    h2Element.insertAdjacentElement('afterend', pokemonNameEl);
});







