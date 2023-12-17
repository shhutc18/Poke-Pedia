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
    $("#favoriteButton").attr("hidden", false);
}

function displayPokemonName(name) {
    pokemonNameEl.text(name);
}

//parameters: types is an array of obects included in the api data. Each object has a name property that is the type name
//results: all types the pokemon has are appended to an unordered list and displayed on the page
function displayPokemonType(types) {
    pokemonTypeEl.empty();
    let pokemonTypeHeader = $('<p>');
    pokemonTypeHeader.text("Type(s): ");
    types.forEach(type => {
        pokemonTypeHeader.append(type.type.name + " ");
    });
    pokemonTypeEl.append(pokemonTypeHeader);
}

function displayPokemonDexNumber(dexNumber) {
    pokemonDexNumberEl.text("Dex Number: " + dexNumber);
}

function displayPokemonHeightWeight(height, weight) {
    pokemonHeightWeightEl.empty();
    let pokemonHeightWeightHeader = $('<p>');
    pokemonHeightWeightHeader.text("Height: " + (height / 10) + " meters, " + "Weight: " + (weight / 10) + " kgs");
    pokemonHeightWeightEl.append(pokemonHeightWeightHeader);
}

//parameters: spriteURL is the url of the sprite to be displayed
//            shiny is a boolean value that determines whether the sprite is shiny or not
//            true = shiny sprite, false = default sprite
//results: the default sprite or shiny sprite is appended to the page depending on the value of shiny
function displayPokemonSprite(spriteURL, shiny) {
    let pokemonImage = $('<img>', {src: spriteURL});
    pokemonImage.css('width', '200px'); // Set the width of the image to 200 pixels
    if (shiny) {
        pokemonShinySpriteEl.empty();
        pokemonShinySpriteEl.append(pokemonImage);
    } else {
        pokemonSpriteEl.empty();
        pokemonSpriteEl.append(pokemonImage);
    }
}

//parameters: stats is an array of objects included in the api data. 
//            Each object has a name property that is the stat name
//            and a base_stat property that is the stat value
//results: all stats the pokemon has are appended to an unordered list and displayed on the page
function displayPokemonStats(stats) {
    pokemonStatsEl.empty();
    let pokemonStatHeader = $('<li>');
    pokemonStatHeader.text("Base Stats");
    pokemonStatsEl.append(pokemonStatHeader);
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
    pokemonMovesEl.empty();
    pokemonMovesEl.attr('class', 'flex flex-wrap text-md w-full list-none');
    let pokemonMoveHeader = $('<li>');
    pokemonMoveHeader.attr('class', 'm-1')
    pokemonMoveHeader.text("Learnable Moves: " + moves.length);
    pokemonMovesEl.append(pokemonMoveHeader);
    moves.forEach(move => {
        let pokemonMove = $('<li>');
        pokemonMove.text(move.move.name);
        pokemonMove.append(',')
        pokemonMove.attr('class', 'm-1')
        pokemonMovesEl.append(pokemonMove);
    });
}

// parameters: speciesURL which is included in the initial pokemon data
// results: generation name is displayed on the page
async function displayPokemonGeneration(speciesURL) {
    //api request to get the generation name
    let generation = await getPokemonGeneration(speciesURL);
    pokemonGenerationEl.text("Introduced In: " + generation);
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


// Pokemon of Day Container

// Display current date
// Add an event listener that runs when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async (event) => {
    // Select the first h2 element in the document
    const h2Element = document.querySelector('h2');

    // Create a new paragraph element
    const dateParagraph = document.createElement('p');

    // Add a class to the paragraph element
    dateParagraph.className = 'text-center';

    // Get the current date and format it - using Day.js
    const currentDate = dayjs().format('MMMM D, YYYY');

    // Set the text content of the paragraph to the current date
    dateParagraph.textContent = `Today is: ${currentDate}`;

    // Insert the paragraph after the h2 element
    h2Element.insertAdjacentElement('afterend', dateParagraph);

    // Get the Pokemon of the day from local storage
    let pokemonOfDay = JSON.parse(localStorage.getItem('pokemonOfDay'));
    let pokemonOfDayData;

    // If there's no Pokemon of the day or the date doesn't match the current date
    if (pokemonOfDay == null || pokemonOfDay == undefined || pokemonOfDay.date != currentDate) {
        // Generate a random Pokemon ID
        const pokemonId = Math.floor(Math.random() * 898) + 1;

        // Fetch the Pokemon data from the PokeAPI
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        pokemonOfDayData = await response.json();

        // Set the Pokemon of the day and the date in local storage
        pokemonOfDay = {
            date: currentDate,
            pokemon: pokemonOfDayData
        };
        localStorage.setItem('pokemonOfDay', JSON.stringify(pokemonOfDay));
    } else {
        // If there's a Pokemon of the day and the date matches the current date, use the existing data
        pokemonOfDayData = pokemonOfDay.pokemon;
    }

    // Create a link element for the Pokemon sprite
    const pokemonSpriteContainer = document.createElement('a');

    // Set the href of the link to the Pokemon's page
    pokemonSpriteContainer.href = `index.html?name=${pokemonOfDayData.name}`;

    // Create an image element for the Pokemon sprite
    const pokemonSpriteEl = document.createElement('img');

    // Set the width and height of the image
    pokemonSpriteEl.style.width = '200px';
    pokemonSpriteEl.style.height = '200px';

    // Set the source of the image to the Pokemon's sprite
    pokemonSpriteEl.src = pokemonOfDayData.sprites.front_default;

    // Add a class to the image to center it
    pokemonSpriteEl.className = 'mx-auto';

    // Append the image to the link
    pokemonSpriteContainer.appendChild(pokemonSpriteEl);

    // Insert the link after the h2 element
    h2Element.insertAdjacentElement('afterend', pokemonSpriteContainer);

    // Create a paragraph element for the Pokemon's name
    const pokemonNameEl = document.createElement('p');

    // Set the text content of the paragraph to the Pokemon's name
    pokemonNameEl.textContent = pokemonOfDayData.name;

    // Add a class to the paragraph to center the text
    pokemonNameEl.className = 'text-center';

    // Insert the paragraph after the h2 element
    h2Element.insertAdjacentElement('afterend', pokemonNameEl);
});
