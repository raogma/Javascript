import { html, sendRequest } from '../lib.js';

function template(product, onDelete) {
    return html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${product.img.substr(1, product.img.length - 1)}/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${product.make}</span></p>
        <p>Model: <span>${product.model}</span></p>
        <p>Year: <span>${product.year}</span></p>
        <p>Description: <span>${product.description}</span></p>
        <p>Price: <span>${product.price}</span></p>
        <p>Material: <span>${product.material}</span></p>
        ${product._ownerId === localStorage.getItem('ownerId') 
        ? html`
            <div id=${product._ownerId}>
                <a href="/details/edit/${product._id}" class="btn btn-info">Edit</a>
                <a @click=${onDelete} href="/" class="btn btn-red">Delete</a>
            </div>`
        : null}   
    </div>
</div>`
}

export async function detailsPage(ctx) {
    let product = await sendRequest(`http://localhost:3030/data/catalog/${ctx.params.id}`, 'get')
    ctx.renderView(template(product, onDelete));
    async function onDelete(ev){
        await sendRequest(
        `http://localhost:3030/data/catalog/${ctx.params.id}`,
        'delete',
        undefined,
        localStorage.getItem('token')
        ) 
        ctx.page.redirect('/');
    }
}