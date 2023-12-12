let pokemonArray = [];

getPokemonData();

function getPokemonData() {
    const storedData = localStorage.getItem('pokemonData');
    if (storedData) {
        pokemonArray = JSON.parse(storedData).results;
        populateDropdown();
    }
}

function populateDropdown() {
    const dropdown = document.getElementById('pokemonDropdown');
    pokemonArray.forEach(pokemon => {
        const option = document.createElement('option');
        option.value = pokemon.name;
        option.text = pokemon.name;
        dropdown.appendChild(option);
    });
}


