import { addPage } from './add.js';
import { detailsPage } from './details.js';
import { loadMovies } from './loadMovies.js';
import { changeView } from './requests.js';

let referrence = undefined;

function initialize (DOMReferrence) {
    referrence = DOMReferrence;
}

function getReferrence(){return referrence}

function getView() {
    changeView(referrence);
    loadMovies();

    let userData = JSON.parse(localStorage.getItem('userData'));
//if logged
    if(userData !== null){
        referrence.querySelector('[id="add-movie-button"] a').addEventListener('click', addPage.getView);
    } else {
        referrence.querySelector('[id="add-movie-button"] a').removeEventListener();
        referrence.querySelector('[id="add-movie-button"] a').disabled = true;
    }
    referrence.querySelector('#movies').addEventListener('click', getMovie);
}

async function getMovie(ev) {
    ev.preventDefault();
    if (ev.target.textContent === 'Details'){
        detailsPage.getView(
            ev.target.id,
            ev.target.parentElement.parentElement.parentElement.id
        )
    }
}

export let homePage = {
    initialize,
    getView,
    getReferrence
}
