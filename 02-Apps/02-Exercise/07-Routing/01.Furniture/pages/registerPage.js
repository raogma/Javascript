import { html, sendRequest } from '../lib.js';

function template(onRegister) {
    return html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onRegister}>
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
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`
}

export function registerPage(ctx) {
    ctx.renderView(template(onRegister));
    async function onRegister(ev){
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('rePass');
    
        try{
            if(email === '' || password === '') throw new Error('All fields are required!');
            if(password !== rePass) throw new Error('Passwords don\'t match!');
   
            let response = await sendRequest('http://localhost:3030/users/register', 'post', {email, password})
            localStorage.setItem('token', response.accessToken);
            ctx.page.redirect('/');
        }catch(e){
            alert(e.message)
        }
    }
}