import { html, sendRequest } from '../lib.js';

function template(product, onEdit) {
    return html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onEdit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" value=${product.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model" value=${product.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year" value=${product.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description" value=${product.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" value=${product.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" value=${product.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value=${product.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`
}

export async function editPage(ctx) {
    let product = await sendRequest(
        `http://localhost:3030/data/catalog/${ctx.params.id}`,
        'get'
    )
    ctx.renderView(template(product, onEdit));
    async function onEdit(ev){
        ev.preventDefault();
        let formData = new FormData(ev.target);

        await sendRequest(`
            http://localhost:3030/data/catalog/${ctx.params.id}`,
            'put',
            {
                "make": formData.get('make'),
                "model": formData.get('model'),
                "year": Number(formData.get('year')),
                "description": formData.get('description'),
                "price": Number(formData.get('price')),
                "img": formData.get('img'),
                "material": formData.get('material'),
            },
            localStorage.getItem('token')
        )
        ctx.page.redirect('/');
    }
}