import { getRecord, html, deleteRecord } from "../lib.js";

function template(record, recordOwner, onDelete) {
    return html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${record.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${record.name}</h1>
                <h3>Artist: ${record.artist}</h3>
                <h4>Genre: ${record.genre}</h4>
                <h4>Price: ${record.price}</h4>
                <h4>Date: ${record.releaseDate}</h4>
                <p>Description: ${record.description}</p>
            </div>

            ${recordOwner === localStorage.getItem('ownerId')
            ? html`
            <div class="actionBtn">
                <a href="/edit/${record._id}" class="edit">Edit</a>
                <a @click=${onDelete} class="remove">Delete</a>
            </div>`
            : null
            }
        </div>
    </div>
</section>`
}

export async function getDetailsPage(ctx) {
    let record = await getRecord(ctx.params.id);
    ctx.renderView(template(record, record._ownerId, onDelete));

    async function onDelete(ev) {
        let result = confirm('Are you sure you want to delete this record?')
        if(result === true){
            try{
                let record = await deleteRecord(ctx.params.id, localStorage.getItem('token'));
                ctx.page.redirect('/all');
            }catch(e){
                alert(e.message);
            }
        }
    }
}