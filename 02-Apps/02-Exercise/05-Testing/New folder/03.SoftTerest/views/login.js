import { sendRequest } from "../app.js";
import { homePage } from "./home.js";
import { navigation } from "./nav.js";

let ref

function setter(DOMRef) {
    ref = DOMRef;
}

function getView() {
    navigation.switchButtons()

    document.querySelector('main').replaceChildren();
    document.querySelector('main').appendChild(ref);

    ref.querySelector('form').addEventListener('submit', async function(ev){
        ev.preventDefault();
        let formData = new FormData(ev.target);

        let response = await sendRequest(
            'http://localhost:3030/users/login',
            'post',
            {
                email: formData.get('email'),
                password: formData.get('password')
            }
        )
        
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('ownerId', response._id);


        ev.target.reset();
        homePage.getView()
    })
}

export let loginPage = {
    setter,
    getView
}