import axios from 'axios';

export const getRandomCat = (breed='') => new Promise((resolve, reject) => {
    const url = `https://cats.wanderingcypriot.co.uk/api/breeds/${breed === '' ? '': `${breed}/`}random`;
    axios.get(url)
    .then(res => {
        resolve(res.data.message);
    })
    .catch(err => {
        reject(err.response.data.errors[0]);
    });
});

export const uploadCatImage = (breed, formData) => new Promise((resolve, reject) => {
    const url = `https://cats.wanderingcypriot.co.uk/api/breeds/${breed}`;
    axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(res => {
        resolve(res.data.message);
    })
    .catch(err => {
        reject(err.response.data.errors[0]);
    });
});

export const arrayToFormData = filesArray => filesArray.reduce((container, element) => {
    container.append('files', element)
}, new FormData());