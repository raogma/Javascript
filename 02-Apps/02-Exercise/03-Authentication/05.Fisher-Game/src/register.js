function register() {
    switchActiveBtns();

    document.querySelector('form').addEventListener('submit', onSubmit);

    async function onSubmit(ev) {
        ev.preventDefault();

        let inputs = new FormData(ev.target);
        let email = inputs.get('email');
        let password = inputs.get('password');
        let password2 = inputs.get('rePass'); 

        try {
            validateInputs(email, password, password2);

            let data = await sendPostRequest('http://localhost:3030/users/register', email, password);

            localStorage.setItem('userData', JSON.stringify({
                email: data.email,
                token: data.accessToken,
                ownerId: data._id
            }))

            ev.target.reset();
            window.location = './index.html';

        } catch (e) {
            alert(e.message);
        }
    }

    async function sendPostRequest(url, email, password){
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        if(response.status === 409) throw new Error('User already exists!');
        if (response.status !== 200) throw new Error('Wrong Address!');
        return await response.json();
    }

    function validateInputs(email, pass1, pass2) {
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) === false) throw new Error("Invalid email!");
        if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password) === false) throw new Error("Invalid password!");

        if(pass1 !== pass2) throw new Error("Passwords don't match!");
    }

    function switchActiveBtns(){
        document.querySelector('a[id="register"]').classList.add('active');
        document.querySelector('a[id="home"]').classList.remove('active');
        document.querySelector('a[id="logout"]').style.display = 'none';
    }
}

register();

// {"email":"a",
// "_createdOn":1636456474818,
// "_id":"c4884d61-2024-426f-b2be-48959b94557b",
// "accessToken":"b25de30a76262e221fb0fba32d234a4b844e77d49a589e978b494ca285d19bb8"}