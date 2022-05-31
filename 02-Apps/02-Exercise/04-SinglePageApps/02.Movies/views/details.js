import { editPage } from "./edit.js";
import { homePage } from "./home.js";
import { changeView, sendRequest } from "./requests.js";

async function getView(_id, _ownerId) {
    let data = await sendRequest(`http://localhost:3030/data/movies/${_id}`, 'get');
    let section = attachDetailsView(data, _id, _ownerId);

    section.querySelector('[class="col-md-4 text-center"]').addEventListener('click', async function(ev){
        data = await sendRequest(`http://localhost:3030/data/movies/${_id}`, 'get');
        if (ev.target.textContent === 'Like'){
            section.querySelector('span').textContent = `Like ${data.likes + 1}`;

            sendRequest(
                `http://localhost:3030/data/movies/${_id}`,
                'put',
                {
                    title: data.title,
                    description: data.description,
                    img: data.img,
                    likes: data.likes + 1,
                },
                JSON.parse(localStorage.getItem('userData')).accessToken
            )
        } else if (ev.target.textContent === 'Delete') {
            sendRequest(
                `http://localhost:3030/data/movies/${_id}`,
                'delete',
                undefined,
                JSON.parse(localStorage.getItem('userData')).accessToken 
            )
            homePage.getView();
        } else if(ev.target.textContent === 'Edit'){
            editPage.getView(_id, data.likes);
        }
    })


};

function attachDetailsView(data, _id, _ownerId) {
    let section = document.createElement('section');
    section.id = 'movie-example';

    section.innerHTML =
        `<div class="container">
    <div class="row bg-light text-dark">
        <h1>Movie title: ${data.title}</h1>
        <div class="col-md-8">
            <img class="img-thumbnail" src="${data.img}"
                alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${data.description}</p>
        </div>
    </div>
</div>
`
    let userData = JSON.parse(localStorage.getItem('userData'));
    let card = section.querySelector('[class="col-md-4 text-center"]');

    if(userData !== null){
    //logged owner
        if (userData.ownerId === _ownerId) {
            card.innerHTML +=
`<a class="btn btn-danger" href="#">Delete</a>
<a class="btn btn-warning" href="#">Edit</a>
<a class="btn btn-primary" href="#">Like</a>
`
    //logged not owner
        } else {
            card.innerHTML +=
`<a class="btn btn-primary" href="#">Like</a>
`
        }
    }
    card.innerHTML += `<span class="enrolled-span">Liked ${data.likes}</span>`;

    changeView(section);
    return section;
}

export let detailsPage = {
    getView
}