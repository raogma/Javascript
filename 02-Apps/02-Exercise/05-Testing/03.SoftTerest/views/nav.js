import { homePage } from './home.js'
import { loginPage } from './login.js'
import { registerPage } from './register.js'
import { dashPage } from './dash.js'
import { createPage } from './create.js'
import { sendRequest } from '../request.js'

let ref = undefined;

let dataBtns = {
    //btnText:liRef
}

function setter(DOMRef) {
    ref = DOMRef;
    for (let li of Array.from(ref.querySelectorAll('li'))) {
        dataBtns[li.querySelector('a').textContent] = li;
    }

    ref.addEventListener('click', onNavClick);
}

function getter() {
    return ref;
}

function prepareNav(btnsToHide, btnsToShow) {
    let ul = ref.querySelector('ul');
    ul.replaceChildren();

    btnsToHide.map(btn => dataBtns[btn].remove())
    btnsToShow.map(btn => ul.appendChild(dataBtns[btn]))
}

export let navigation = {
    setter,
    getter,
    prepareNav,
}

function onNavClick(ev) {
    ev.preventDefault();
    if (ev.target.textContent === 'Login') {
        loginPage.getView();
    } else if (ev.target.textContent === 'Register') {
        registerPage.getView();
    } else if (ev.target.textContent === 'Logout') {
        sendRequest('http://localhost:3030/users/logout', 'get');
        localStorage.clear();
        homePage.getView();
    } else if (ev.target.textContent === 'Create') {
        createPage.getView();
    } else if (ev.target.textContent === 'Dashboard') {
        dashPage.getView();
    } else if (ev.target.tagName === 'IMG') {
        homePage.getView();
    }
}