export const renderBreeds = (parent, breeds) => {
    const markup = breeds.map(breed => `<option value="${breed.slug}">${breed.name}</option>`).join();
    parent.insertAdjacentHTML('beforeend', markup);
};