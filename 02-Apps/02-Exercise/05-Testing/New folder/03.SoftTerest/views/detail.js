import { sendRequest } from "../app.js";
import { dashPage } from "./dash.js";
import { navigation } from "./nav.js";

let ref

function setter(DOMRef){
    ref = DOMRef;
}

function getView(img, title, description, _ownerId, _id){
    navigation.switchButtons()
    document.querySelector('main').replaceChildren();
    document.querySelector('main').appendChild(ref);

    showContent(img, title, description, _ownerId, _id);

    let deleteBtn = ref.querySelector('a'); 
    if(deleteBtn !== null) {
        deleteBtn.addEventListener('click', onDelete);
    }
}

async function onDelete(ev){
    ev.preventDefault();
    sendRequest(
        `http://localhost:3030/data/ideas/${ev.target.id}`,
        'delete',
        {},
        localStorage.getItem('token')
        )
        dashPage.getView();
}

function showContent(img, title, description, _ownerId, _id){
    ref.replaceChildren();
    ref.innerHTML = 
`<img class="det-img" src="${img}" />
<div class="desc">
    <h2 class="display-5">${title}</h2>
    <p class="infoType">Description:</p>
    <p class="idea-description">${description}</p>
</div>

`
    if(localStorage.getItem('ownerId') === _ownerId){
        ref.innerHTML += 
`<div class="text-center">
    <a id="${_id}" class="btn detb" href="">Delete</a>
</div>
`   
    }
}

export let detailPage ={
    setter,
    getView
}