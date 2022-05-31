import { html, login, validateInputs } from '../lib.js';

function template(onLogin) {
    return html`
    <section id="login">
        <div class="pad-large">
            <div class="glass narrow">
                <header class="tab layout">
                    <h1 class="tab-item active">Login</h1>
                    <a class="tab-item" href="/register">Register</a>
                </header>
                <form @submit=${onLogin} class="pad-med centered">
                    <label class="block centered">Username: <input class="auth-input input" type="text" name="username" value="raogma"/></label>
                    <label class="block centered">Password: <input class="auth-input input" type="password"
                            name="password" value="123456"/></label>
                    <input class="block action cta" type="submit" value="Sign In" />
                </form>
                <footer class="tab-footer">
                    Don't have an account? <a class="invert" href="/register">Create one here</a>.
                </footer>
            </div>
        </div>
    </section>`
}

export function renderLogin(ctx){
    ctx.renderView(async () => template(onLogin));

    async function onLogin(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let username = formData.get('username');
        let password = formData.get('password');

        try {
            validateInputs([username, password]);
            let response = await login(username, password);

            if (response !== undefined){
                sessionStorage.setItem('ownerId', response.objectId);
                sessionStorage.setItem('token', response.sessionToken);
                sessionStorage.setItem('email', response.email);
                sessionStorage.setItem('username', username);
    
                ctx.page.redirect('/');
            }
        } catch (e) {
            alert(e.message)
        }
    }
}