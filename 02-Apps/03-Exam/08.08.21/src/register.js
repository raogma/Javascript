import { html, register, validateEmptyInputs } from "../lib.js";

function template(onRegister) {
    return html`<!-- Register Page ( Only for Guest users ) -->
<section id="register-page" class="register">
    <form @submit=${onRegister} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email" value="raimar@dir.bg">
                </span>
            </p>
            <p class="field">
                <label for="username">Username</label>
                <span class="input">
                    <input type="text" name="username" id="username" placeholder="Username" value="raimar">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password" value="123456">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password" value="123456">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>`
}

export function loadRegister(ctx) {
    ctx.renderView(template(onRegister));

    async function onRegister(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let email = formData.get('email');
        let username = formData.get('username');
        let password = formData.get('password');
        let rePass = formData.get('confirm-pass');
        try {
            validateEmptyInputs([email, username, password]);
            if (password !== rePass) { throw new Error('Passwords don\'t match!') }
            let response = await register(email, username, password);
            localStorage.setItem('token', response.sessionToken);
            localStorage.setItem('owner', response.objectId);
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            ctx.page.redirect('/');
        } catch (e) {
            alert(e.message);
        }
    }
}