const staticURL = 'https://pokeapi.co/api/v2';

const pokemonEndpoint = 'pokemon/';

function getPokemon(id) {
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then (pokemon => pokemon.json())
    .then (pokemon =>{
        localStorage.setItem('pokemon', JSON.stringify(pokemon));
        return weather;
    })
    .then(displayResults)
}

function displayResults(pokemon) {
    console.log(pokemon)
    let sprite = document.querySelector('.sprite');
    let name = document.querySelector('.name');
}
