import { sendRequest } from "../app.js";
import { detailPage } from "./detail.js";
import { navigation } from "./nav.js";

let ref

function setter(DOMRef) {
    ref = DOMRef;
}

function getView() {
    navigation.switchButtons()

    document.querySelector('main').replaceChildren();
    document.querySelector('main').appendChild(ref);
    ref.replaceChildren();
    showContent();

    ref.addEventListener('click', onClick);
}

export let dashPage = {
    setter,
    getView
}

async function onClick(ev){
    ev.preventDefault();
    if(ev.target.textContent === 'Details'){
        let response = await sendRequest(
            `http://localhost:3030/data/ideas/${ev.target.id}`,
            'get'
        )
        detailPage.getView(response.img, response.title, response.description, response._ownerId, response._id);
    }
}

async function showContent(){
    let data = await sendRequest(
        'http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
        'get'
    )
    if (data.length !== 0) {
        let res = '';
        for (let element of data) {
            res +=
`<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${element.title}</p>
    </div>
    <img class="card-image" src="${element.img}" alt="Card image cap">
    <a  id="${element._id}" class="btn" href="">Details</a>
</div>
`
        }
        ref.innerHTML = res;
    } else {
        ref.innerHTML = 'No ideas yet! Be the first one :)'
    }
}