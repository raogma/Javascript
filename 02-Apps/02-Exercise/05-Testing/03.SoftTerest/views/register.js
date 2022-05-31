import {changeView} from '../universalFns.js'


let ref = undefined;

function setter(DOMRef) {
    ref = DOMRef;
}

function getter() {
    return ref;
}

function getView() {
    changeView(ref, ['Logout', 'Create', 'Register'], ['Dashboard','Login']);
}

export let registerPage = {
    getter,
    setter,
    getView
}