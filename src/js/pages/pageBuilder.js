import {getBreeds} from '../models/Breeds';
import {getRandomCat} from '../models/Cat';
import {renderBreeds} from '../views/breedsView';

export const buildMain = (parent) => {
    const markup = `<div class="row">
    <img src="" alt="Cat image" class="cat-image">
</div>
<div class="row breed-select">
    <div class="row">
        <select name="breeds" class="breeds">
        </select>
    </div>
    <div class="row">
        <button class="btn next-cat">Moar</button>
    </div>
</div>`;
    parent.insertAdjacentHTML('beforeend', markup);
    const elements = {
        breeds: document.querySelector('.breeds'),
        image: document.querySelector('.cat-image'),
        button: document.querySelector('.next-cat'),
    };
    // Populate list of breeds
    getBreeds().
    then(breeds => {
        renderBreeds(elements.breeds, breeds, '<option value="">All Breeds</option>`');
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
};

export const buildAddBreed = (parent) => {
    const markup = ``;
    parent.insertAdjacentHTML('beforeend', markup);
};

export const buildAddCat = (parent) => {
    const markup = ``;
    parent.insertAdjacentHTML('beforeend', markup);
};

export const clearPage = (parent) => {
    parent.innerHTML = '';
}