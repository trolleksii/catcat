import {getBreeds, addBreed} from '../models/Breeds';
import {getRandomCat} from '../models/Cat';
import {renderSelectBreeds, renderListBreeds} from '../views/breedsView';
import {highlightInput, disableElement, enableElement, clearInput} from '../views/miscView';


export const buildMain = (parent) => {
    const markup = `<div class="row">
    <img src="" alt="Cat image" class="cat-image">
</div>
<div class="row breed-select">
    <div class="row">
        <select name="breeds" class="breeds-select">
        </select>
    </div>
    <div class="row">
        <button class="btn next-cat">Moar</button>
    </div>
</div>`;
    parent.insertAdjacentHTML('beforeend', markup);
    const elements = {
        breeds: document.querySelector('.breeds-select'),
        image: document.querySelector('.cat-image'),
        button: document.querySelector('.next-cat'),
    };
    // Populate list of breeds
    getBreeds().
    then(breeds => {
        renderSelectBreeds(elements.breeds, breeds, '<option value="">All Breeds</option>`');
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
    const markup = `
    <div class="row">
        <h2 class="page-header">Breeds present</h2>
    </div>
    <div class="row">
        <ul class="breeds-list">
        </ul>
    </div>
    <div class="row breed-select">
        <form class="breed-form">
            <div class="row">
            <input class="new-breed" type="text" name="" placeholder="Add new breed">
            </div>
            <div class="row">
            <input type="submit" value="Add" class="btn disabled">
            </div>
        </form>
    </div>`;
    parent.insertAdjacentHTML('beforeend', markup);
    const elements = {
        breeds: document.querySelector('.breeds-list'),
        input: document.querySelector('.new-breed'),
        form: document.querySelector('.breed-form'),
        button: document.querySelector('.btn')
        };
    getBreeds()
    .then(breeds => {
        renderListBreeds(elements.breeds, breeds);
    })
    .catch(err => {
        alert(err);
    })

    var inputIsValid = false;
    elements.input.addEventListener('input', () => {
        getBreeds()
        .then(breeds => {
            if (elements.input.value.length < 3 || breeds.filter((breed) => elements.input.value.toUpperCase() === breed.name.toUpperCase()).length > 0) {
                inputIsValid = false;
                highlightInput(elements.input, false);
                disableElement(elements.button);
            } else {
                inputIsValid = true;
                highlightInput(elements.input, true);
                enableElement(elements.button);
            }
        })
        .catch(err => {
            alert(err);
        })
    })

    elements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (inputIsValid) {
            addBreed(elements.input.value)
            .then(breed => {
                renderListBreeds(elements.breeds, [breed]);
                clearInput(elements.input);
            })
            .catch(err => {
                alert(err);
            });
        }
    });
};

export const buildAddCat = (parent) => {
    const markup = ``;
    parent.insertAdjacentHTML('beforeend', markup);
};

export const clearPage = (parent) => {
    parent.innerHTML = '';
}