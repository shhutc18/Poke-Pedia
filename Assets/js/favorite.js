const staticURL = 'https://pokeapi.co/api/v2';

let favoriteButton = document.getElementById('favoriteButton');
let pokemonSprite = document.getElementById('pokemonSpriteEl');
let pokemonName = document.getElementById('pokemonNameEl');

favoriteButton.addEventListener('click', function() {
    let favorite= localStorage.getItem('favorites');
    if (favorite) {
        favorite = JSON.parse(favorite);
    } else {
        favorite = [];
    }
pokemonSprite = pokemonSprite.children[0].src;
    let newFavorite= {
        sprite: pokemonSprite,
        name: pokemonName.textContent,
    };

console.log(pokemonSprite);
    favorite.push(newFavorite);

    localStorage.setItem('favorites', JSON.stringify(favorite));

    location.reload();
});


let favoritesEl = document.getElementById('favoritesEl');
let favorites = JSON.parse(localStorage.getItem('favorites'));


favorites.forEach(favorite =>{
    let newElement = document.createElement('img');
    newElement.src = favorite.sprite;

    newElement.addEventListener('click', function() {
        searchPokemon(favorite.name);
    });

    favoritesEl.appendChild(newElement);
})


