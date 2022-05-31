import { html, render } from '../node_modules/lit-html/lit-html.js'
import { cats } from './catSeeder.js';

function template(cats) {
    return html`
<ul>
    ${cats.map(catCls => html`
    <li>
    <img src="./images/${catCls.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${() => onClick(catCls)} class="showBtn">${catCls.isVisible ? 'Hide': 'Show'} status code</button>
        ${catCls.isVisible ? html`<div class="status" id="${catCls.id}">
            <h4>Status Code: ${catCls.statusCode}</h4>
            <p>${catCls.statusMessage}</p>
        </div>`: null}
    </div>
    </li>
`)}  
</ul>
`}

cats.map(c => c.isVisible = false);
update();

function update(){
    render(template(cats), document.querySelector('#allCats'))
}


function onClick(catCls){
    catCls.isVisible = !catCls.isVisible;
    update();
}
