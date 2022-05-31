import { changeView, sendRequest } from './requests.js'
import { homePage } from './home.js'

let referrence = undefined;

function initialize(DOMReferrence) {
    referrence = DOMReferrence;
}

function getView() {
    changeView(referrence)

    referrence.querySelector('form').addEventListener('submit', onRegister);
    
    async function onRegister(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        let result = await sendRequest(
            'http://localhost:3030/users/register',
            'post',
            { email, password, repeatPassword }
        )

        localStorage.setItem('userData', JSON.stringify({
            ownerId: result._id,
            accessToken: result.accessToken,
            email: result.email
        }))

        homePage.getView();
    }
};

export let registerPage = {
    initialize,
    getView,
}