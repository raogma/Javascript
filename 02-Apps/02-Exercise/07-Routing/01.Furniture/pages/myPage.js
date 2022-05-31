import { html, sendRequest } from '../lib.js';

function template(myFurnitureList) {
    return html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${myFurnitureList.map(f => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${f.img} />
                <p>Description here</p>
                <footer>
                    <p>Price: <span>${f.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${f._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
    `)}
</div>`
}

export async function myPage(ctx) {
    let myFurnitureList = await sendRequest(
        `http://localhost:3030/data/catalog?where=_ownerId%3D%22${localStorage.getItem('ownerId')}%22`,
        'get'
        )
    ctx.renderView(template(myFurnitureList));
}