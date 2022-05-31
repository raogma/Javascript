import { html, render } from '../node_modules/lit-html/lit-html.js'

update();
document.querySelector('form').addEventListener('submit', onSubmit)

function onSubmit(ev) {
    ev.preventDefault();
    let text = document.querySelector('#itemText').value;
    sendRequest(
        'http://localhost:3030/jsonstore/advanced/dropdown',
        'post',
        {text}
    )
    update();
    ev.target.reset();
}

async function update() {
    let data = await sendRequest('http://localhost:3030/jsonstore/advanced/dropdown');
    render(template(Object.values(data)), document.querySelector('div'));
}

function template(items) {
    return html`
    <select id="menu">
        ${items.map(o => html`<option value=${o._id}>${o.text}</option>` )}
    </select>`
}

async function sendRequest(url, method, bodyData) {
    let options = {};
    if(method === 'post'){
        options = {
            method,
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(bodyData)
        };
    }
    try {
        let response = await fetch(url, options);
        if (response.status !== 200) { throw new Error(response.message) }
        return await response.json();
    } catch (e) {
        alert(e.message);
    }
}
