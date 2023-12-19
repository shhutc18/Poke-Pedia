let pokemonArray = [];
let dropdownClicked = false;

getPokemonData();

// Retrieves the Pokemon data from the local storage and assigns it to the pokemonArray variable.
// If the data is not found in the local storage, the pokemonArray remains unchanged.

function getPokemonData() {
    const storedData = localStorage.getItem('pokemonData');
    if (storedData) {
        pokemonArray = JSON.parse(storedData).results;
    }
}

// Add an event listener to the letter-dropdown
const letterDropdown = document.getElementById('letter-dropdown');
letterDropdown.addEventListener('change', filterPokemonByLetter);


// Filters the pokemonArray based on the selected letter and displays the filtered pokemon.
 
function filterPokemonByLetter() {
    const selectedLetter = letterDropdown.value;
    const filteredPokemon = pokemonArray.filter(pokemon => pokemon.name.startsWith(selectedLetter));
    displayFilteredPokemon(filteredPokemon);
}

// Displays the filtered pokemon in the letter-list.

function displayFilteredPokemon(filteredPokemon) {
    const pokemonLetterList = document.getElementById('pokemon-letter-list');
    pokemonLetterList.innerHTML = ''; // Clear previous content

    filteredPokemon.forEach(pokemon => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.setAttribute('href', `index.html?name=${pokemon.name}`);
        link.setAttribute('class', 'hover:text-red-500');
        link.textContent = pokemon.name;
        listItem.appendChild(link);
        pokemonLetterList.appendChild(listItem);
    });
}
