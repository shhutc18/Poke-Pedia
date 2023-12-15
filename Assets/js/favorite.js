const staticURL = 'https://pokeapi.co/api/v2';

let favoriteButton = document.getElementById('favoriteButton');
let pokemonSprite = document.getElementById('pokemonSpriteEl');
let pokemonName = document.getElementById('pokemonNameEl');

favoriteButton.addEventListener('click', function() {
    localStorage.setItem('pokemonSprite', pokemonSprite.innerHTML);
    localStorage.setItem('pokemonName', pokemonName.innerHTML);
});