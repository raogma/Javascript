function addItem() {
    let textInput = document.querySelector('#newItemText');
    let valueInput = document.querySelector('#newItemValue');

    let option = document.createElement('option');
    option.setAttribute('value', valueInput.value);
    option.textContent = textInput.value;
    document.querySelector('#menu').appendChild(option);
    
    textInput.value = '';
    valueInput.value = '';
}