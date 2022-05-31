import { html, render } from './node_modules/lit-html/lit-html.js';
import page from "./node_modules/page/page.mjs";

let host = 'http://localhost:3030'; // for testing its 3000

export {
    page, html, render, isLogged,
    loginUser, registerUser, logoutUser, notify,
    createRecord, deleteRecord, editRecord, getRecord, getAllRecords, myRecords
}

function isLogged() {
    if (localStorage.getItem('token') !== null) {
        return true;
    }
    return false;
}

async function sendRequest(url, method, bodyData, auth) {
    let options = {
        method,
        headers: { 'content-type': 'application/json' }
    };

    if (bodyData) { options['body'] = JSON.stringify(bodyData) }

    if (auth) { options['headers']['X-Authorization'] = auth; }

    try {
        let response = await fetch(url, options);
        // if (response.status == 204) { return }
        if (response.status === 200 && auth !== undefined) { return }
        if (response.status !== 200) { throw new Error(response.message) }
        return await response.json();
    } catch (e) {
        alert(e.message)
    }
}

async function loginUser(email, password) {
    return await sendRequest(
        `${host}/users/login`,
        'post',
        { email, password }
    )
}

async function registerUser(username, email, password, gender) {
    return await sendRequest(
        `${host}/users/register`,
        'post',
        { username, email, password, gender }
    )
}

async function logoutUser() {
    await sendRequest(
        `${host}/users/logout`,
        'get',
        undefined,
        localStorage.getItem('token')
    )
    localStorage.clear();
    page.redirect('/');
}

async function getAllRecords() {
    return await sendRequest(
        `${host}/data/memes?sortBy=_createdOn%20desc`,
        'get'
    )
}

async function createRecord(title, description, imageUrl, auth) {
    return await sendRequest(
        `${host}/data/memes`,
        'post',
        { title, description, imageUrl },
        auth
    )
}

async function editRecord(_id, title, description, imageUrl, auth) {
    return await sendRequest(
        `${host}/data/memes/${_id}`,
        'put',
        { title, description, imageUrl },
        auth
    )
}

async function getRecord(_id) {
    return await sendRequest(
        `${host}/data/memes/${_id}`,
        'get'
    )
}

async function deleteRecord(_id, auth) {
    await sendRequest(
        `${host}/data/memes/${_id}`,
        'delete',
        undefined,
        auth
    )
}

async function myRecords(_id) {
    return await sendRequest(
        `${host}/data/memes?where=_ownerId%3D%22${_id}%22&sortBy=_createdOn%20desc`,
        'get'
    )
}

function notify(message) {
    document.querySelector('#errorBox span').textContent = message;
    document.querySelector('.notification').style.display = 'inline-block';
    setTimeout(() => document.querySelector('.notification').style.display = 'none', 3000);
}
