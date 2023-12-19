//global variables
const staticURL = 'https://pokeapi.co/api/v2';
let favoriteButton = document.getElementById('favoriteButton');
let pokemonName = document.getElementById('pokemonNameEl');
let favoritesEl = document.getElementById('favoritesEl');
let favorites = JSON.parse(localStorage.getItem('favorites'));

//adds event listener to the favorite button (star)
favoriteButton.addEventListener('click', function() {
    if (!favorites) {
        favorites = [];
    }
    //prevents duplicates
    for (let favorite of favorites) {
        if (favorite.name === pokemonName.textContent) {
            return;
        }
    }
    let pokemonSprite = document.getElementById('pokemonSpriteEl').children[0].src;
    let newFavorite= {
        sprite: pokemonSprite,
        name: pokemonName.textContent,
    };

    favorites.push(newFavorite);

    localStorage.setItem('favorites', JSON.stringify(favorites));
    //refresh page
    window.location.href ="index.html?q=" + pokemonName.textContent;
});

//creates the favorite list on the bottom of the page
if (favorites) {
    favorites.forEach(favorite =>{
    
        let newElement = document.createElement('img');
        newElement.src = favorite.sprite;
    
        //adds event listener to each favorite allowing user to search when clicking on their favorites
        newElement.addEventListener('click', function() {
            searchPokemon(favorite.name);
        });
    
        favoritesEl.appendChild(newElement);
    })
}


