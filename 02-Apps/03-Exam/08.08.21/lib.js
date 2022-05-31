import { html, render } from './node_modules/lit-html/lit-html.js';
import page from './node_modules/page/page.mjs';
import { navTemplate } from './src/nav.js';

export {
    html, render, page,
    login, register, logout,
    getAllData, getCurrentData, updateCurrentData, deleteCurrentData, createCurrentData, getMyData,
    validateEmptyInputs, loadCtxData, isLogged, like, getTotalLikes, isLiked
};

let host = 'https://parseapi.back4app.com';
let endpoints = {
    books: '/classes/Books',
    likes: '/classes/Likes'
}

function loadCtxData(ctx, next) {
    render(navTemplate(isLogged()), document.querySelector('header'));
    ctx.renderView = (template) => render(template, document.querySelector('main'));
    next();
}


function isLogged() {
    if (localStorage.getItem('token') === null) {
        return false;
    }
    return true;
}

function validateEmptyInputs(inputs) {
    inputs.map(x => {
        if (x === '') throw new Error('All fields are required!');
    })
}

async function sendRequest(url, method, bodyData, auth) {
    let options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-Parse-Application-Id': 'eXxYdvrlJLJhSnoisqp2vbvEDqeRBduUednb294g',
            'X-Parse-REST-API-Key': 'vVylRdKhfQXEU8q6hPl1Gkts4keSHxTxYoJmB73O'
        }
    };

    if (bodyData) {
        options['body'] = JSON.stringify(bodyData);
    }

    if (auth) {
        options.headers['X-Parse-Session-Token'] = auth;
    }

    try {
        let response = await fetch(url, options);
        if (response.ok === false) { throw new Error(response.message) }
        if (response.status === 204) { throw new Error('Logout successful!') };
        return response.json();
    } catch (e) {
        alert(e.message);
    }
}

async function login(username, password) {
    return await sendRequest(`${host}/login`, 'post', { username, password });
}

async function register(email, username, password) {
    return await sendRequest(`${host}/users`, 'post', { email, username, password });
}

async function logout() {
    await sendRequest(
        `${host}/logout`,
        'post',
        undefined,
        localStorage.getItem('token'));
    localStorage.clear();
    page.redirect('/');
}

async function deleteCurrentData(ctx) {
    await sendRequest(
        `${host}${endpoints.books}/${ctx.params.id}`,
        'delete',
        undefined,
        localStorage.getItem('token')
    );
    page.redirect('/');
}


async function getAllData() {
    return await sendRequest(`${host}${endpoints.books}`, 'get');
}

async function getMyData(_id) {
    return await sendRequest(
        `${host}${endpoints.data}?where=_ownerId%3D%22${_id}%22&sortBy=_createdOn%20desc`,
        'get'
    );
}

async function getCurrentData(_id) {
    return await sendRequest(`${host}${endpoints.books}/${_id}`, 'get');
}

async function updateCurrentData(_id, title, description, imageUrl, type, likes) {
    return await sendRequest(
        `${host}${endpoints.books}/${_id}`,
        'put',
        {
            title,
            description,
            imageUrl,
            type,
            likes,
            ownerId: { "__type": "Pointer", "className": "_User", "objectId": localStorage.getItem('owner') }
        },
        localStorage.getItem('token')
    );
}

async function createCurrentData(title, description, imageUrl, type) {
    return await sendRequest(
        `${host}${endpoints.books}`,
        'post',
        {
            title,
            description,
            imageUrl,
            type,
            ownerId: { "__type": "Pointer", "className": "_User", "objectId": localStorage.getItem('owner') }
        },
        localStorage.getItem('token')
    );
}

async function like(ctx) {
    let bookId = ctx.params.id;
    await sendRequest(
        `${host}${endpoints.likes}`,
        'post',
        {
            bookId: { "__type": "Pointer", "className": "Books", "objectId": bookId },
            ownerId: { "__type": "Pointer", "className": "_User", "objectId": localStorage.getItem('owner') }
        },
        localStorage.getItem('token')
    )
    ctx.page.redirect(`/details/${bookId}`);
}

async function getTotalLikes(bookId) {
    return await sendRequest(                         
        `${host}${endpoints.likes}?where={"bookId":{"__type":"Pointer","className":"Books","objectId":"${bookId}"}}&count=1`,
        'get'
    )
}

async function isLiked(bookId, userId) {
    return await sendRequest(`${host}${endpoints.likes}?where={"bookId":{"__type":"Pointer","className":"Books","objectId":"${bookId}"},"ownerId":{"__type":"Pointer","className":"_User","objectId":"${userId}"}}&count=1`)
}