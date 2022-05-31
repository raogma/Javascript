function validate() {
    let password = document.querySelector('#password');
    let confirmPassword = document.querySelector('#confirm-password');
    let checkbox = document.querySelector('#company');
    let company = document.querySelector('#companyNumber');
    let companyField = document.querySelector('#companyInfo');
    let valid = document.querySelector('#valid');

    checkbox.addEventListener('change', () => checkbox.checked ? companyField.style.display = 'block' : companyField.style.display = 'none')

    document.querySelector('#submit').addEventListener('click', (ev) => {
        function validatorCheck(input, regex){
            if(!regex.test(input.value)){
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.border = '';
            }
            return input.style.borderColor;
        }
        
        ev.preventDefault();
        let isValid = true;

        validatorCheck(document.querySelector('#username'), /^[a-zA-Z0-9]{3,20}$/);
        validatorCheck(document.querySelector('#email'), /.*@.*\..*/);

        let ex = validatorCheck(password, /^[\w]{5,15}$/);
        if(password.value === confirmPassword.value && password.value !== '' && ex === ''){
            password.style.border = '';
            confirmPassword.style.border = '';
        } else {
            password.style.borderColor = 'red';
            confirmPassword.style.borderColor = 'red';
            isValid = false;
        }

        if(checkbox.checked){
            if(company.value < 1000 || company.value > 9999){
                company.style.borderColor = 'red';
                isValid = false;
            } else {
                company.style.border = '';
            }
        }

        isValid ? valid.style.display = 'block' : valid.style.display = 'none';
    })
}
