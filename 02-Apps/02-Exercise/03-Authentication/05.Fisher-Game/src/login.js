function login() {
    switchActiveBtns();

    document.querySelector('form').addEventListener('submit', onSubmit);

    async function onSubmit(ev) {
        ev.preventDefault();

        let inputs = new FormData(ev.target);
        let email = inputs.get('email');
        let password = inputs.get('password');

        try {
            let data = await sendPostRequest('http://localhost:3030/users/login', email, password);

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

    async function sendPostRequest(url, email, password) {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        if (response.status !== 200) throw new Error('User is not registered yet!');
        return await response.json();
    }

    function switchActiveBtns() {
        document.querySelector('a[id="login"]').classList.add('active');
        document.querySelector('a[id="home"]').classList.remove('active');
        document.querySelector('a[id="logout"]').style.display = 'none';
    }
}

login();