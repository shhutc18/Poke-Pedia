let pokemonArray = [];
let dropdownClicked = false;

getPokemonData();

function getPokemonData() {
    const storedData = localStorage.getItem('pokemonData');
    if (storedData) {
        pokemonArray = JSON.parse(storedData).results;
    }
}

// Add an event listener to the letter-dropdown
const letterDropdown = document.getElementById('letter-dropdown');
letterDropdown.addEventListener('change', filterPokemonByLetter);

function filterPokemonByLetter() {
    const selectedLetter = letterDropdown.value;
    const filteredPokemon = pokemonArray.filter(pokemon => pokemon.name.startsWith(selectedLetter));
    displayFilteredPokemon(filteredPokemon);
}

function displayFilteredPokemon(filteredPokemon) {
    const pokemonLetterList = document.getElementById('pokemon-letter-list');
    pokemonLetterList.innerHTML = ''; // Clear previous content

    filteredPokemon.forEach(pokemon => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.setAttribute('href', `index.html?name=${pokemon.name}`);
        link.textContent = pokemon.name;
        listItem.appendChild(link);
        pokemonLetterList.appendChild(listItem);
    });
}
