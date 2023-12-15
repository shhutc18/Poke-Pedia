const staticURL = 'https://pokeapi.co/api/v2';

let favoriteButton = document.getElementById('favoriteButton');
let pokemonSprite = document.getElementById('pokemonSpriteEl');
let pokemonName = document.getElementById('pokemonNameEl');

favoriteButton.addEventListener('click', function() {
    localStorage.setItem('pokemonSprite', pokemonSprite.innerHTML);
    localStorage.setItem('pokemonName', pokemonName.innerHTML);

    let newFavorite= {
        sprite: pokemonSprite.innerHTML,
        name: pokemonName.innerHTML
    };
    let favorites = JSON.parse(localStorage.getItem('favorites'));

    if (!favorites) {
        favorites = [];
    }

    favorites.push(newFavorite);

    localStorage.setItem('favorites', JSON.stringify(favorites));
});