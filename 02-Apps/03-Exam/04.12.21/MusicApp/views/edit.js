import { html, editRecord, getRecord} from "../lib.js";

function template(record, onEdit) {
    return html`
 <!--Edit Page-->
 <section class="editPage">
            <form @submit=${onEdit}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" name="name" class="name" type="text" value=${record.name}>

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value=${record.imgUrl}>

                        <label for="price" class="vhide">Price</label>
                        <input id="price" name="price" class="price" type="text" value=${record.price}>

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value=${record.releaseDate}>

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" name="artist" class="artist" type="text" value=${record.artist}>

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" name="genre" class="genre" type="text" value=${record.genre}>

                        <label for="description" class="vhide">Description</label>
                        <textarea name="description" class="description" rows="10"
                            cols="10">${record.description}</textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>`
}

export async function getEditPage(ctx) {
    let record = await getRecord(ctx.params.id);
    ctx.renderView(template(record, onEdit));

    async function onEdit(ev){
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let name = formData.get('name');
        let imgUrl = formData.get('imgUrl');
        let price = formData.get('price');
        let releaseDate = formData.get('releaseDate');
        let artist = formData.get('artist');
        let genre = formData.get('genre');
        let description = formData.get('description');
        try{
            [name, imgUrl, price, releaseDate, artist, genre, description].map(x => {
                if(x === ''){ throw new Error('All field are required!')}
            })

            await editRecord(
                ctx.params.id,
                name, imgUrl, price, releaseDate, artist, genre, description,
                localStorage.getItem('token')
            )
            ctx.page.redirect(`/details/${ctx.params.id}`);
        } catch(e){
            // notify(e.message);
        }
    }   
}