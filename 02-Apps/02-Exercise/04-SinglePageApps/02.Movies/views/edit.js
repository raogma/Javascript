import { detailsPage } from "./details.js";
import { changeView, sendRequest } from "./requests.js";

let referrence = undefined;

function initialize (DOMReferrence) {
    referrence = DOMReferrence;
}

function getView(_id, currLikes) {
    changeView(referrence);
    referrence.querySelector('form').addEventListener('submit', async function(ev){
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let data = await sendRequest(
            `http://localhost:3030/data/movies/${_id}`,
            'put',
            {
                title: formData.get('title'),
                description: formData.get('description'),
                img: formData.get('imageUrl'),
                likes: currLikes
            },
            JSON.parse(localStorage.getItem('userData')).accessToken
        )
        if (data !== undefined) {
            detailsPage.getView(data._id, data._ownerId);
        }
    });
};

export let editPage = {
    initialize,
    getView
}