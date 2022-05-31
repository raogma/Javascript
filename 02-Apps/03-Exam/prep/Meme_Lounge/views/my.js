import { html, myRecords } from "../lib.js";

function template(myMemeList) {
    return html`
        <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                <img id="user-avatar-url" alt="user-profile" src="/images/${localStorage.getItem('gender')}.png">
                <div class="user-content">
                    <p>Username: ${localStorage.getItem('username')}</p>
                    <p>Email: ${localStorage.getItem('email')}</p>
                    <p>My memes count: ${myMemeList.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                ${myMemeList.length > 0
                ? myMemeList.map(m => html`
                <div class="user-meme">
                    <p class="user-meme-title">${m.title}</p>
                    <img class="userProfileImage" alt="meme-img" src="${m.imageUrl}">
                    <a class="button" href="/details/${m._id}">Details</a>
                </div>`)
                : html`<p class="no-memes">No memes in database.</p>`}
            </div>
        </section>`
}

export async function getMyPage(ctx) {
    let myData = await myRecords(localStorage.getItem('ownerId'));
    ctx.renderView(template(myData));
}