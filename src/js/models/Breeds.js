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
        'https://cats.wanderingcypriot.co.uk/api/breeds',
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
        resolve(res.data.message);
    })
    .catch(err => {
        reject(err.response.data.errors[0]);
    });
});