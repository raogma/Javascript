import { createCurrentData, html, validateEmptyInputs } from "../lib.js";

function template(onCreate){
    return html`<!-- Create Page ( Only for logged-in users ) -->
    <section id="create-page" class="create">
        <form @submit=${onCreate} id="create-form" action="" method="">
            <fieldset>
                <legend>Add new Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" placeholder="Title">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description" placeholder="Description"></textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" placeholder="Image">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type">
                            <option value="Fiction">Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Add Book">
            </fieldset>
        </form>
    </section>`
}

export function loadCreate(ctx){
    ctx.renderView(template(onCreate));

    async function onCreate(ev){
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');
        let type = formData.get('type');

        try{
            validateEmptyInputs([title, description, imageUrl, type]);
            await createCurrentData(title, description, imageUrl, type);
            ctx.page.redirect(`/`);
        }catch(e){
             alert(e.message);
        }
    }
}