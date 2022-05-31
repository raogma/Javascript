function validate() {
    let emailInput = document.querySelector('#email');

    emailInput.addEventListener('change', () =>{
        if(!/\w+@\w+\.[a-z]+/.test(emailInput.value)){
            emailInput.setAttribute('class', 'error');
        } else {
            emailInput.removeAttribute('class');
        }
    })
}