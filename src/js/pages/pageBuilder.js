import {getBreeds, addBreed} from '../models/Breeds';
import {getRandomCat, uploadCatImage} from '../models/Cat';
import {renderSelectBreeds, renderListBreeds} from '../views/breedsView';
import {highlightInput, disableElement, enableElement, clearInput} from '../views/miscView';


export const buildMain = (parent) => {
    const markup = `
    <div class="row">
        <img src="" alt="Cat image" class="cat-image">
    </div>
    <div class="row">
        <div class="row">
            <select name="breeds" class="breed__selector">
                <option value="">All Breeds</option>
            </select>
        </div>
        <div class="row">
            <button class="btn">Next</button>
        </div>
    </div>`;
    parent.insertAdjacentHTML('beforeend', markup);
    const elements = {
        breeds: document.querySelector('.breed__selector'),
        image: document.querySelector('.cat-image'),
        button: document.querySelector('.btn'),
    };
    // Populate list of breeds
    getBreeds().
    then(breeds => {
        renderSelectBreeds(elements.breeds, breeds);
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
        <h2 class="page-heading">Add new breed</h2>
    </div>
    <div class="row">
        <p class="page-text">Breeds currently present:</p>
    </div>
    <div class="row">
        <ul class="breed__list">
        </ul>
    </div>
    <div class="row">
        <form class="breed-form">
            <div class="row">
            <input class="new-breed" type="text" name="" placeholder="Add new breed">
            </div>
            <div class="row">
            <input type="submit" value="Add" class="btn disabled" disabled>
            </div>
        </form>
    </div>`;
    parent.insertAdjacentHTML('beforeend', markup);
    const elements = {
        breeds: document.querySelector('.breed__list'),
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
            // TODO: Write regex to match first two contitions at once
            if (elements.input.value.length < 3
                || /[^A-Z a-z]/.test(elements.input.value)
                || breeds.some((breed) => elements.input.value.toUpperCase() === breed.name.toUpperCase())) {
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

const renderSuccessIcon = (parent) => {
    const markup = '<i class="icon ion-md-checkmark"></i>';
    parent.insertAdjacentHTML('beforeend', markup);
    setTimeout(()=>{
        parent.innerHTML = '';
    }, 2000);
};

export const buildAddCat = (parent) => {
    const markup = `
    <div class="row">
        <h2 class="page-heading">Add new image</h2>
    </div>
    <div class="row">
        <select name="breeds" class="breed__selector">
        </select>
    </div>
    <div class="row">
        <form class="form" action="/" enctype="multipart/form-data">
            <div class="row">
                <input class="file-input" type="file" name="files" multiple>
            </div>
            <p class="page-text">You can upload one or more image files, each of them should be less than 500KB.
            </p>
            <div class="row">
                <input type="submit" value="Add" class="btn disabled" disabled><div class="success"></div>
            </div>
        </div>
        </form>
    </div>`;
    parent.insertAdjacentHTML('beforeend', markup);
    const elements = {
        breeds: document.querySelector('.breed__selector'),
        form: document.querySelector('.form'),
        files: document.querySelector('.file-input'),
        button: document.querySelector('.btn'),
        success: document.querySelector('.success')
    };
    getBreeds().
    then(breeds => {
        renderSelectBreeds(elements.breeds, breeds);
    })
    .catch(err => {
        alert(err);
    })
    elements.files.addEventListener('input', (event) => {
        if (Array.prototype.filter.call(event.target.files,file => /^image\/.{3,4}$/.test(file.type)).length > 0) {
            enableElement(elements.button);
        } else {
            disableElement(elements.button);
        }
    });
    elements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        const breed = elements.breeds.selectedOptions[0].value,
              formData = new FormData();
        for (let file of elements.form.files.files) {
            if (file.size < 509600 && /^image\/.{3,4}$/.test(file.type)) {
                formData.append('files', file);
            }
        };
        uploadCatImage(breed, formData)
        .then(() => {
            elements.form.reset();
            renderSuccessIcon(elements.success);
        })
        .catch(err => {
            alert(err);
        });
    });
};

export const clearPage = (parent) => {
    parent.innerHTML = '';
}