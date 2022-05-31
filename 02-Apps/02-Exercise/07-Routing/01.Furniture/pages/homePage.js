import { html } from '../lib.js';
import {sendRequest} from '../lib.js';

function template(furnitureList) {
    return html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${furnitureList.map(f => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${f.img}"/>
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


export async function homePage(ctx) {
    let furnitureList = await sendRequest('http://localhost:3030/data/catalog', 'get')
    ctx.renderView(template(furnitureList));
}