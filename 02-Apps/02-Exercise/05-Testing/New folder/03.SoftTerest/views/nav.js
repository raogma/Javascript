import { createPage } from './create.js';
import { homePage } from './home.js';
import { loginPage } from './login.js';
import { registerPage } from './register.js';
import { dashPage } from './dash.js';
import { sendRequest } from '../app.js';

let ref, dash, create, logout, login, register

function setter(DOMRef) {
    ref = DOMRef;
    ref.addEventListener('click', onClick);
    [dash, create, logout, login, register] = Array.from(ref.querySelectorAll('li'))
}

function switchButtons(){

    let ul = ref.querySelector('ul');
    ul.replaceChildren();

    if (localStorage.getItem('token') === null) { // not logged
        [dash, login, register].map(x => ul.appendChild(x));

    } else { // logged
        [dash, create, logout].map(x => ul.appendChild(x));
    }
}

function onClick(ev) {
    ev.preventDefault();
    if (ev.target.textContent === 'Dashboard') {
        dashPage.getView()
    } else if (ev.target.textContent === 'Create') {
        createPage.getView()

    } else if (ev.target.textContent === 'Logout') {
        sendRequest(
            'http://localhost:3030/users/logout',
            'get',
            {},
            localStorage.getItem('token')
        )
        localStorage.clear();
        homePage.getView();

    } else if (ev.target.textContent === 'Login') {
        loginPage.getView()

    } else if (ev.target.textContent === 'Register') {
        registerPage.getView()

    } else if (ev.target.tagName === 'IMG') {
        homePage.getView()

    }
}

export let navigation = {
    setter,
    switchButtons
}

