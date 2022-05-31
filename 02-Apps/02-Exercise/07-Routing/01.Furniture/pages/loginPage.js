import { html, sendRequest } from '../lib.js';

function template(onLogin) {
    return html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onLogin}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`
}

export function loginPage(ctx) {
    ctx.renderView(template(onLogin));
    async function onLogin(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let email = formData.get('email');
        let password = formData.get('password');
        try {
            if(email === '' || password === '') throw new Error('All fields are required!');
            let response = await sendRequest('http://localhost:3030/users/login', 'post', { email, password })
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('ownerId', response._id);
            ctx.page.redirect('/');
        } catch (e) {
            alert(e.message);
        }
    }
}