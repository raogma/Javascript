import { html, loginUser } from "../lib.js";

function template(onLogin) {
    return html`
        <section id="loginPage">
            <form @submit=${onLogin}>
                <fieldset>
                    <legend>Login</legend>
        
                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">
        
                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">
        
                    <button type="submit" class="login">Login</button>
        
                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>`
}

export function getLoginPage(ctx) {
    ctx.renderView(template(onLogin));

    async function onLogin(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let email = formData.get('email');
        let password = formData.get('password');
        try {
            if (email === '' || password === '') { throw new Error('All fields are required!') }
            let response = await loginUser(email, password);

            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('ownerId', response._id);
            // localStorage.setItem('email', response.email);
            ctx.page.redirect('/');
        } catch (e) {
            // notify(e.message);
        }
    }
}
