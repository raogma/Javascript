import { html, createRecord, notify } from "../lib.js";

function template(onCreate) {
    return html`
    <!-- Create Meme Page ( Only for logged users ) -->
    <section id="create-meme">
        <form @submit=${onCreate} id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>
    `
}

export function getCreatePage(ctx) {
    ctx.renderView(template(onCreate));

    async function onCreate(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');

        try {
            if(title === '' || description === '' || imageUrl === '') { throw new Error('All field are required!')}
            await createRecord(title, description, imageUrl, localStorage.getItem('token'));
            ctx.page.redirect('/all');
        } catch (e) {
            notify(e.message);
        }
    }
}