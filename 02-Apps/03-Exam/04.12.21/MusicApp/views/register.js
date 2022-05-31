import { html, registerUser } from "../lib.js";

function template(onRegister) {
    return html`
        <section id="registerPage">
            <form @submit=${onRegister}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>`

}

export function getRegisterPage(ctx) {
    ctx.renderView(template(onRegister));
    async function onRegister(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);

        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPass = formData.get('conf-pass');

        try{
            validateRegister();
            let response = await registerUser( email, password )
        
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('ownerId', response._id);
            // localStorage.setItem('email', response.email);
            ctx.page.redirect('/');
        } catch(e){
            // notify(e.message);
        }

        function validateRegister(){
            if(password !== repeatPass){throw new Error('Passwords don\'t match!')}
            if(email === ''|| password === ''){throw new Error('All fields are required!')}
        }
    }
}