import '../css/main.scss';
import {getBreeds} from './models/Breeds';
import {getRandomCat} from './models/Cat';
import {renderBreeds} from './views/breedsView';
// Init page: Load breeds list, load initial image
(() => {
    const elements = {
        breeds: document.querySelector('.breeds'),
        image: document.querySelector('.cat-image'),
        button: document.querySelector('.next-cat'),
    };
    // Populate list of breeds
    getBreeds().
    then(breeds => {
        renderBreeds(elements.breeds, breeds);
    })
    .catch(err => {
        alert(err);
    })
    // Get picture for the front side of the tile
    getRandomCat()
    .then(url => {
        elements.image.setAttribute('src', url);
    })
    .catch(err => {
        alert(err);
    });
    // set up on-click event listener
    elements.button.addEventListener('click', () => {
        const breed = elements.breeds.selectedOptions[0].value;
        getRandomCat(breed)
        .then(url => {
            elements.image.setAttribute('src', url);
        })
        .catch(err => {
            alert(err);
        });
    })
})();