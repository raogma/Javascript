import { homePage } from './home.js';
import { loginPage } from './login.js';
import { registerPage } from './register.js';

let referrence = undefined;

function initialize(DOMReferrence) {
    referrence = DOMReferrence;
}

function getView() {
    let userData = JSON.parse(localStorage.getItem('userData'));

    let navUl = referrence.querySelector('ul');
    navUl.replaceChildren();
//logged
    if (userData !== null) {
        navUl.innerHTML = 
`<li class="nav-item">
<a class="nav-link">Welcome, ${userData.email}</a>
</li>
<li class="nav-item">
<a class="nav-link" href="#">Logout</a>
</li>
`
//not
    } else {
        navUl.innerHTML =
`<li class="nav-item">
<a class="nav-link">Welcome, email</a>
</li>
<li class="nav-item">
<a class="nav-link" href="#">Login</a>
</li>
<li class="nav-item">
<a class="nav-link" href="#">Register</a>
</li>
`
    }

    referrence.addEventListener('click', onClick);
}

function onClick(ev){
    if(ev.target.textContent === 'Logout'){
        localStorage.clear();
        homePage.getView();
    } else if(ev.target.textContent === 'Login') {
        loginPage.getView();
    } else if(ev.target.textContent === 'Register') {
        registerPage.getView();
    } else if(ev.target.textContent === 'Movies') {
        homePage.getView();
    }
}

export let nav = {
    initialize,
    getView
}

