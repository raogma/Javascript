import { getMyData, html } from "../lib.js";

function template(books){
    return html`<!-- My Books Page ( Only for logged-in users ) -->
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        ${books.length > 0 
        ? books.map(x => html`<!-- Display ul: with list-items for every user's books (if any) -->
        <ul class="my-books-list">
            <li class="otherBooks">
                <h3>${x.title}</h3>
                <p>Type: ${x.type}</p>
                <p class="img"><img src=${x.imageUrl}></p>
                <a class="button" href="/details/${x._id}">Details</a>
            </li>
        </ul>`)
        : html`<!-- Display paragraph: If the user doesn't have his own books  -->
        <p class="no-books">No books in database!</p>`
        }
    </section>`
}

export async function loadMy(ctx){
    let data = await getMyData(ctx.params.id)
    ctx.renderView(template(data));
}