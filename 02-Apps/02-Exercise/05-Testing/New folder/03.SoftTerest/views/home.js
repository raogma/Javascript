import { navigation } from "./nav.js";

let ref

function setter(DOMRef){
    ref = DOMRef;
}

function getView(){
    navigation.switchButtons()
    document.querySelector('main').replaceChildren();
    document.querySelector('main').appendChild(ref);
}

export let homePage ={
    setter,
    getView
}