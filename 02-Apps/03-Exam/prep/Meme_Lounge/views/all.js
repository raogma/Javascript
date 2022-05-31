import { html, getAllRecords } from "../lib.js";

function template(memeList) {
    return html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            ${memeList.length > 0 
            ? memeList.map(m => html`
                <div class="meme">
                    <div class="card">
                        <div class="info">
                            <p class="meme-title">${m.title}</p>
                            <img class="meme-image" alt="meme-img" src="${m.imageUrl}">
                        </div>
                        <div id="data-buttons">
                            <a class="button" href="/details/${m._id}">Details</a>
                        </div>
                    </div>
                </div>`)
            :html`<p class="no-memes">No memes in database.</p>`
            }
        </div>
    </section>`
}

export async function getAllPage(ctx) {
    let data = await getAllRecords() 
    ctx.renderView(template(data));
}