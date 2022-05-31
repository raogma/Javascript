import { html, isLogged, searchRecord } from "../lib.js";

function template(onSearch, records, isLogged) {
    return html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${onSearch} class="button-list">Search</button>
        </div>
        <h2>Results:</h2>
        ${records !== undefined && isLogged !== undefined
        ? html`
        <div class="search-result">
            ${records.length > 0 
            ? records.map(r => html` 
            <div class="card-box">
                    <img src=${r.imgUrl}>
                    <div>
                        <div class="text-center">
                            <p class="name">Name: ${r.name}</p>
                            <p class="artist">Artist: ${r.artist}</p>
                            <p class="genre">Genre: ${r.genre}</p>
                            <p class="price">Price: ${r.price}</p>
                            <p class="date">Release Date: ${r.releaseDate}</p>
                        </div>
                        ${isLogged
                        ? html`
                        <div class="btn-group">
                            <a href="/details/${r._id}" id="details">Details</a>
                        </div>`
                        : null
                        }
                    </div>
            </div>`)
            : html`<p class="no-result">No result.</p>`
            }
        </div>`
        : null}
    </section>`
}

export async function getSearchPage(ctx) {
    ctx.renderView(template(onSearch));

    async function onSearch(ev) {
        let searchedRecord = ev.target.parentElement.querySelector('input').value;

        try{
            if(searchedRecord === ''){throw new Error('Field is required!')}
            let records = await searchRecord(searchedRecord);
            ctx.renderView(template(onSearch, records, isLogged()));
        }catch(e){
            alert(e.message);
        }
    }
}