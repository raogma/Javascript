import { homePage } from './home.js';
import { changeView, sendRequest } from './requests.js';
let referrence = undefined;

function initialize(DOMReferrence) {
    referrence = DOMReferrence;
}

function getView() {
    changeView(referrence)

    referrence.querySelector('form').addEventListener('submit', addMovie);

    function addMovie(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);

        sendRequest(
            'http://localhost:3030/data/movies',
            'post',
            {
                title: formData.get('title'),
                description: formData.get('description'),
                img: formData.get('imageUrl'),
                likes: 0
            },
            JSON.parse(localStorage.getItem('userData')).accessToken
        )
        homePage.getView();
    }
};

export let addPage = {
    initialize,
    getView
}