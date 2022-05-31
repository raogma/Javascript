import { homePage } from "./home.js";
import { changeView, sendRequest } from "./requests.js";

let referrence = undefined;

function initialize(DOMReferrence) {
    referrence = DOMReferrence;
}

async function getView() {
    changeView(referrence);

    referrence.querySelector('form').addEventListener('submit', onLogin);

    async function onLogin(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let email = formData.get('email');
        let password = formData.get('password');

        let result = await sendRequest(
            'http://localhost:3030/users/login',
            'post',
            { email, password }
        )
        
        localStorage.setItem('userData', JSON.stringify({
            ownerId: result._id,
            accessToken: result.accessToken,
            email: result.email
        }))

        homePage.getView();
    }
}

export let loginPage = {
    initialize,
    getView
}