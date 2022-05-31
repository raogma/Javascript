import { sendRequest } from "../app.js";
import { dashPage } from "./dash.js";
import { navigation } from "./nav.js";

let ref

function setter(DOMRef) {
    ref = DOMRef;
}

function getView() {
    navigation.switchButtons()

    document.querySelector('main').replaceChildren();
    document.querySelector('main').appendChild(ref);

    ref.querySelector('form').addEventListener('submit', function (ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('imageURL');

        let isValid = validateData(title, description, img);
        if ( isValid !== false) {
            sendRequest(
                'http://localhost:3030/data/ideas',
                'post',
                { title, img, description },
                localStorage.getItem('token')
            )

            ev.target.reset();
            dashPage.getView();
        }
    })
}

export let createPage = {
    setter,
    getView
}

function validateData(title, description, img) {
    try {
        if (title.length < 6) throw new Error('Title must be at least 6 characters long!');
        if (description.length < 10) throw new Error('Description must be at least 10 characters long!')
        if (img.length < 5) throw new Error('Image must be at least 5 characters long!')

    } catch (e) {
        alert(e.message);
        return false;
    }
}