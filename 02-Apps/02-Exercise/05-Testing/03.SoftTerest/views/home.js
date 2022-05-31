import { changeView } from '../universalFns.js'

let ref = undefined;

function setter(DOMRef) {
    ref = DOMRef;
}

function getter() {
    return ref;
}

function getView() {
    changeView(ref, ['Create', 'Logout'], ['Dashboard', 'Login', 'Register']);
}



export let homePage = {
    getter,
    setter,
    getView
}
