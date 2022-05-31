import { html, render } from './node_modules/lit-html/lit-html.js';
import page from "./node_modules/page/page.mjs";

let host = 'http://localhost:3030'; // for testing its 3000

export {
    page, html, render, isLogged,
    loginUser, registerUser, logoutUser, getRecord,
    createRecord, deleteRecord, editRecord, searchRecord, getAllRecords, myRecords
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
        if (response.status === 200 && auth !== undefined &&  method !== 'DELETE') { return }
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

async function registerUser(email, password) {
    return await sendRequest(
        `${host}/users/register`,
        'post',
        { email, password}
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
        `${host}/data/albums?sortBy=_createdOn%20desc&distinct=name`,
        'get'
    )
}

async function getRecord(_id){
    return await sendRequest(
        `${host}/data/albums/${_id}`,
        'get'
    )
}

async function createRecord(name, imgUrl, price, releaseDate, artist, genre, description, auth) {
    return await sendRequest(
        `${host}/data/albums`,
        'post',
        { name, imgUrl, price, releaseDate, artist, genre, description },
        auth
    )
}

async function editRecord(_id, name, imgUrl, price, releaseDate, artist, genre, description, auth) {
    return await sendRequest(
        `${host}/data/albums/${_id}`,
        'put',
        { name, imgUrl, price, releaseDate, artist, genre, description },
        auth
    )
}

async function searchRecord(query) {
    return await sendRequest(
        `${host}/data/albums?where=name%20LIKE%20%22${query}%22`,
        'get'
    )
}

async function deleteRecord(_id, auth) {
    return await sendRequest(
        `${host}/data/albums/${_id}`,
        'DELETE',
        undefined,
        auth
    )
}

async function myRecords(_id) {
    return await sendRequest(
        `${host}/data/albums?where=_ownerId%3D%22${_id}%22&sortBy=_createdOn%20desc`,
        'get'
    )
}
