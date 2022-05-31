import { html, login, validateEmptyInputs } from "../lib.js";

function template(onLogin) {
    return html`<!-- Login Page ( Only for Guest users ) -->
<section id="login-page" class="login">
    <form @submit=${onLogin} id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="username">Username</label>
                <span class="input">
                    <input type="text" name="username" id="username" placeholder="Username">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
    </form>
</section>`
}

export function loadLogin(ctx) {
    ctx.renderView(template(onLogin));

    async function onLogin(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let username = formData.get('username');
        let password = formData.get('password');
        try {
            validateEmptyInputs([username, password]);
            let response = await login(username, password);
            localStorage.setItem('token', response.sessionToken);
            localStorage.setItem('owner', response.objectId);
            localStorage.setItem('email', response.email);
            localStorage.setItem('username', username);
            ctx.page.redirect('/');
        } catch (e) {
            alert(e.message);
        }
    }
}