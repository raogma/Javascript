import { html, register, validateInputs } from '../lib.js';

function template(onRegister) {
    return html`
    <section id="register">
        <div class="pad-large">
            <div class="glass narrow">
                <header class="tab layout">
                    <a class="tab-item" href="/login">Login</a>
                    <h1 class="tab-item active">Register</h1>
                </header>
                <form @submit=${onRegister} class="pad-med centered">
                    <label class="block centered">Username: <input class="auth-input input" type="text" name="username"
                            value="raogma" /></label>
                    <label class="block centered">Email: <input class="auth-input input" type="text" name="email"
                            value="raogma@dir.bg" /></label>
                    <label class="block centered">Password: <input class="auth-input input" type="password" name="password"
                            value="123456" /></label>
                    <label class="block centered">Repeat: <input class="auth-input input" type="password" name="repass"
                            value="123456" /></label>
                    <input class="block action cta" type="submit" value="Create Account" />
                </form>
                <footer class="tab-footer">
                    Already have an account? <a class="invert" href="/login">Sign in here</a>.
                </footer>
            </div>
        </div>
    </section>`
}

export function renderRegister(ctx) {
    ctx.renderView(async () => template(onRegister));

    async function onRegister(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let username = formData.get('username');
        let email = formData.get('email');
        let password = formData.get('password');
        let repass = formData.get('repass');

        try {
            validateInputs([username, email, password]);
            if (password !== repass) { throw new Error('Passwords don\'t match!') }
            let response = await register(username, email, password);
            if(response !== undefined){
                sessionStorage.setItem('ownerId', response.objectId)
                sessionStorage.setItem('token', response.sessionToken)
                sessionStorage.setItem('email', email)
                sessionStorage.setItem('username', username)
                ctx.page.redirect('/');
            }
        } catch (e) {
            alert(e.message)
        }
    }
}