import { getAllData, html } from "../lib.js";

function template(booksData) {
    return html`<!-- Dashboard Page ( for Guests and Users ) -->
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${booksData.length > 0 
    ?html`<!-- Display ul: with list-items for All books (If any) -->
        <ul class="other-books-list">
            ${booksData.map(x => html`
            <li class="otherBooks">
                <h3>${x.title}</h3>
                <p>Type: ${x.type}</p>
                <p class="img"><img src="${x.imageUrl}"></p>
                <a class="button" href="/details/${x.objectId}">Details</a>
            </li>`)}
        </ul>`
    :html`<!-- Display paragraph: If there are no books in the database -->
    <p class="no-books">No books in database!</p>`
    }
</section>`
}

export async function loadDash(ctx){
    let booksData = await getAllData()
    ctx.renderView(template(booksData.results));
}