import { getCurrentData, getTotalLikes, html, isLiked, isLogged } from "../lib.js";

function template(book, isLogged, totalLikes, isLiked){
    return html`<!-- Details Page ( for Guests and Users ) -->
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                ${book.ownerId.objectId === localStorage.getItem('owner')
                ? html`                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                <a class="button" href="/edit/${book.objectId}">Edit</a>
                <a class="button" href="/delete/${book.objectId}">Delete</a>`
                : null
                }

                <!-- Bonus -->

                ${isLogged && book.ownerId.objectId !== localStorage.getItem('owner') && isLiked.count === 0
                ? html`<!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                <a class="button" href="/like/${book.objectId}">Like</a>`
                : null
                }

                <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${totalLikes}</span>
                </div>
                <!-- Bonus -->
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>`
}

export async function loadDetails(ctx){
    let bookId = ctx.params.id;
    let totalLikes = await getTotalLikes(bookId);
    ctx.renderView(template(
        await getCurrentData(bookId),
        isLogged(),
        totalLikes.count,
        await isLiked(bookId, localStorage.getItem('owner'))
    ));
}