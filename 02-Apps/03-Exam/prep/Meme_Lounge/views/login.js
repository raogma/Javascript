import { html, loginUser, notify } from "../lib.js";

function template(isLogged, onLogin) {
    return html`
    <!-- Login Page ( Only for guest users ) -->
    <section id="login">
        <form @submit=${onLogin} id="login-form">
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="#">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>
    `
}

export function getLoginPage(ctx) {
    ctx.renderView(template(ctx.user, onLogin));

    async function onLogin(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let email = formData.get('email');
        let password = formData.get('password');
        try{
            if(email === '' || password === ''){ throw new Error('All fields are required!') }
            let response = await loginUser(email, password);

            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('ownerId', response._id);
            localStorage.setItem('username', response.username);
            localStorage.setItem('email', response.email);
            localStorage.setItem('gender', response.gender);
            ctx.page.redirect('/');
        }catch(e){
            notify(e.message);
        }
    }   
}
