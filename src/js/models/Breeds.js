import axios from 'axios';

export const getBreeds = () => new Promise((resolve, reject) => {
    const url = 'https://cats.wanderingcypriot.co.uk/api/breeds';
    axios.get(url)
    .then(res => {
        resolve(res.data.message);
    })
    .catch(err => {
        reject(err.response.data.errors[0]);
    })
});

export const addBreed = (name) => new Promise((resolve, reject) => {
    axios.post(
        'http://127.0.0.1:8000/api/breeds',
        {
            name
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then(res => {
        resolve(res);
    })
    .catch(err => {
        reject(err.response.data.errors[0]);
    });
});