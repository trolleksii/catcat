export const renderSelectBreeds = (parent, breeds) => {
    const markup = breeds.map(breed => `<option value="${breed.slug}">${breed.name}</option>`).join('');
    parent.insertAdjacentHTML('beforeend', markup);
};

export const renderListBreeds = (parent, breeds) => {
    const markup = breeds.map(breed => `<li>${breed.name}</li>`).join('');
    parent.insertAdjacentHTML('beforeend', markup);
};
