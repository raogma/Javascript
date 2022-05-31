import { getRecord, html, deleteRecord } from "../lib.js";

function template(meme, onDelete) {
    return html`
        <section id="meme-details">
            <h1>Meme Title: ${meme.title}
            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${meme.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>${meme.description}</p>
                    ${localStorage.getItem('ownerId') === meme._ownerId 
                    ? html`                
                    <a class="button warning" href="/edit/${meme._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>`
                    : null
                    }
                </div>
            </div>
        </section>`
}

export async function getDetailsPage(ctx) {
    let record = await getRecord(ctx.params.id);
    ctx.renderView(template(record, onDelete));

    async function onDelete(ev){
        await deleteRecord(ctx.params.id, localStorage.getItem('token'));
        ctx.page.redirect('/all');
    }
}