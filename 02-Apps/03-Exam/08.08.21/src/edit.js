import { getCurrentData, html, updateCurrentData, validateEmptyInputs } from "../lib.js";

function template(book, onEdit){
    return html` <!-- Edit Page ( Only for the creator )-->
    <section id="edit-page" class="edit">
        <form @submit=${onEdit} id="edit-form" action="#" method="">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" value=${book.title}>
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description"
                            id="description">${book.description}</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" value=${book.imageUrl}>
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" value="Fiction">
                            <option value="Fiction" selected>Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>`
}

export async function loadEdit(ctx){
    let bookId = ctx.params.id;
    ctx.renderView(template(await getCurrentData(bookId), onEdit));

    async function onEdit(ev){
       ev.preventDefault();
       
       let formData = new FormData(ev.target);
       let title = formData.get('title');
       let description = formData.get('description');
       let imageUrl = formData.get('imageUrl');
       let type = formData.get('type');
       try{
           validateEmptyInputs([title, description, imageUrl, type]);
           await updateCurrentData(bookId, title, description, imageUrl, type);
           ctx.page.redirect(`/details/${bookId}`);
       }catch(e){
            alert(e.message);
       }
    }
}