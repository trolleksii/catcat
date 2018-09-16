export const highlightInput = (input, isValid) => {
    if (isValid) {
        input.classList.add('valid');
        input.classList.remove('invalid');
    } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
    }
};

export const clearInput = (input) => {
    input.value = '';
}

export const disableElement = (element) => {
    element.classList.add('disabled');
    element.setAttribute('disabled', true);
}

export const enableElement = (element) => {
    element.classList.remove('disabled');
    element.removeAttribute('disabled');
}