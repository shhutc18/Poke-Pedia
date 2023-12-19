const staticURL = 'https://pokeapi.co/api/v2';

let favoriteButton = document.getElementById('favoriteButton');
let pokemonName = document.getElementById('pokemonNameEl');
let favoritesEl = document.getElementById('favoritesEl');
let favorites = JSON.parse(localStorage.getItem('favorites'));

favoriteButton.addEventListener('click', function() {
    if (!favorites) {
        favorites = [];
    }
    for (let favorite of favorites) {
        if (favorite.name === pokemonName.textContent) {
            return;
        }
    }
    console.log(document.getElementById('pokemonSpriteEl'));
    let pokemonSprite = document.getElementById('pokemonSpriteEl').children[0].src;
    let newFavorite= {
        sprite: pokemonSprite,
        name: pokemonName.textContent,
    };

    favorites.push(newFavorite);

    localStorage.setItem('favorites', JSON.stringify(favorites));

    window.location.href ="index.html?q=" + pokemonName.textContent;
});

if (favorites) {
    favorites.forEach(favorite =>{
    
        let newElement = document.createElement('img');
        newElement.src = favorite.sprite;
    
        newElement.addEventListener('click', function() {
            searchPokemon(favorite.name);
        });
    
        favoritesEl.appendChild(newElement);
    })
}


