export const renderBreeds = (parent, breeds, prefix='') => {
    const markup = prefix + breeds.map(breed => `<option value="${breed.slug}">${breed.name}</option>`).join();
    parent.insertAdjacentHTML('beforeend', markup);
};