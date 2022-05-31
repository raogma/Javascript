function validate() {
    document.getElementById('email').addEventListener('change', eventHandler);

    function eventHandler(event){
        let email = event.target;

        /^[a-z]+@[a-z]+\.[a-z]+$/.test(email.value) === false 
            ? email.setAttribute('class', 'error'):  email.removeAttribute('class')
    }
}