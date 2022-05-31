import { html, editRecord, getRecord, notify} from "../lib.js";

function template(meme, onEdit) {
    return html`
<section id="edit-meme">
    <form @submit=${onEdit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" >
${meme.description}
            </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`
}

export async function getEditPage(ctx) {
    let record = await getRecord(ctx.params.id);
    ctx.renderView(template(record, onEdit));

    async function onEdit(ev){
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');   
        try{
            if(title === '' || description === '' || imageUrl === ''){throw  new Error('All fields are required!')};
            await editRecord(
                ctx.params.id, title, description, imageUrl, localStorage.getItem('token')
            )
            ctx.page.redirect(`/details/${ctx.params.id}`);
        } catch(e){
            notify(e.message);
        }
    }   
}