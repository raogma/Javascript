import { html, notify, registerUser } from "../lib.js";

function template(onRegister) {
    return html`
    <section id="register">
        <form @submit=${onRegister} id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="#">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>
    `

}

export function getRegisterPage(ctx) {
    ctx.renderView(template(onRegister));
    async function onRegister(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);

        let username = formData.get('username');
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPass = formData.get('repeatPass');
        let gender = formData.get('gender');

        try{
            validateRegister();
            let response = await registerUser(username, email, password, gender)
        
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('ownerId', response._id);
            localStorage.setItem('username', response.username);
            localStorage.setItem('email', response.email);
            localStorage.setItem('gender', response.gender);
            ctx.page.redirect('/');
        } catch(e){
            notify(e.message);
        }

        function validateRegister(){
            if(password !== repeatPass){throw new Error('Passwords don\'t match!')}
            if(username === ''|| email === ''|| password === ''){throw new Error('All fields are required!')}
            if(!['male', 'female'].includes(gender)){throw new Error('Invalid gender!')}
        }
    }
}