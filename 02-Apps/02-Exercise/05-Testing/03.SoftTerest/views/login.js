import { sendRequest } from '../request.js';
import { changeView } from '../universalFns.js'
import { homePage } from './home.js';


let ref = undefined;

function setter(DOMRef) {
    ref = DOMRef;
}

function getter() {
    return ref;
}

function getView() {
    changeView(ref, ['Logout', 'Create', 'Login'], ['Dashboard', 'Register']);

    let form = ref.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

function onSubmit(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target);
    sendRequest('http://localhost:3030/users/login', 'post', {
        email: formData.get('email'),
        password: formData.get('password')
    })
    ev.target.reset();
    homePage.getView();
}

export let loginPage = {
    getter,
    setter,
    getView
}