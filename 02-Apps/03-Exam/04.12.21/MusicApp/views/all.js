import { html, getAllRecords, isLogged } from "../lib.js";

function template(records, isLogged) {
    return html`
        <!--Catalog-->
        <section id="catalogPage">
            <h1>All Albums</h1>
            ${records.length > 0 
            ? records.map(r => html`
            <div class="card-box">
                <img src=${r.imgUrl}>
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${r.name}</p>
                        <p class="artist">Artist: ${r.artist}</p>
                        <p class="genre">Genre: ${r.genre}</p>
                        <p class="price">Price: ${r.price}</p>
                        <p class="date">Release Date: ${r.releaseDate}</p>
                    </div>
                    ${isLogged
                    ? html`
                    <div class="btn-group">
                        <a href="/details/${r._id}" id="details">Details</a>
                    </div>
                    `
                    : null}
                </div>
            </div>`
            )
            : html`<p>No Albums in Catalog!</p>`
            }
        </section>`
}

export async function getAllPage(ctx) {
    let data = await getAllRecords() 
    ctx.renderView(template(data, isLogged()));
}