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
    console.log('disabling', element);
    element.classList.add('disabled');
    element.attributes.disabled = true;
}

export const enableElement = (element) => {
    console.log('enabling', element);
    element.classList.remove('disabled');
    element.attributes.disabled = false;
}