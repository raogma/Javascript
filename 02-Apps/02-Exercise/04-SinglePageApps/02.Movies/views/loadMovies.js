import { homePage } from './home.js'
import { sendRequest } from './requests.js'


export async function loadMovies() {
    let result = await sendRequest(
        'http://localhost:3030/data/movies',
        'get'
    )
    let movieContainer = homePage.getReferrence().querySelector('#movies');
    movieContainer.replaceChildren()

    for(let movie of result) {
        if(movie._id !== '1240549d-f0e0-497e-ab99-eb8f703713d7' && movie._id !== '143e5265-333e-4150-80e4-16b61de31aa0' && movie._id !== 'a9bae6d8-793e-46c4-a9db-deb9e3484909'){
            movieContainer.innerHTML +=
    `<div id="${movie._ownerId}" class="card mb-4">
        <img class="card-img-top" src="${movie.img}"
            alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
            <a href="">
                <button id="${movie._id} "type="button" class="btn btn-info">Details</button>
            </a>
        </div>
    </div>
    ` 
        }
    }
}