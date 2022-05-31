import { render, html } from '../node_modules/lit-html/lit-html.js';
import { tableTemplate, formTemplate } from './template.js';

let url = 'http://localhost:3030/jsonstore/collections/books';
let _id;
let shouldEdit = false;
update();

async function update() {
    let data = await sendRequest(url, 'get');
    render([tableTemplate(data), formTemplate(shouldEdit)], document.querySelector('body'))
}

export function onClick(ev) {
    _id = ev.target.parentElement.parentElement.id;
    if (ev.target.textContent === 'Edit') {
        shouldEdit = true;
        update();

    } else if (ev.target.textContent === 'Delete') {
        sendRequest(`${url}/${_id}`, 'delete')
    }
    update();
}

export async function onSubmit(ev) {
    ev.preventDefault();
    let button = ev.target.querySelector('[type="submit"]').value;
    let formData = new FormData(ev.target);
    let bodyData = {
        title: formData.get('title'),
        author: formData.get('author'),
    };

    if (button === 'Submit') {
        await sendRequest(url, 'post', bodyData);

    } else if (button === 'Save') {
        await sendRequest(`${url}/${_id}`, 'put', bodyData);
    }

    shouldEdit = false;
    update();
    ev.target.reset();
}

async function sendRequest(url, method, bodyData) {
    let options = {};

    if (method !== 'get') {
        options = {
            method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(bodyData)
        };
    }

    try {
        let response = await fetch(url, options);
        if (response.status !== 200) throw new Error(response.message);
        return await response.json();
    } catch (e) {
        alert(e.message);
    }
}