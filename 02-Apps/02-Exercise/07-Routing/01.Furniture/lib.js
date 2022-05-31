import { html, render } from 'https://unpkg.com/lit-html?module';
import page from "https://unpkg.com/page/page.mjs";

export {
    html, render, page, sendRequest, isLogged, onLogout
}

async function sendRequest(url, method, bodyData, auth) {
    let options = {
        method,
        headers: { 'content-type': 'application/json' },
    };

    if(bodyData !== undefined) {
        options['body'] = JSON.stringify(bodyData);
    }

    if (auth !== undefined) {
        options['headers']['X-Authorization'] = auth;
    }

    try {
        let response = await fetch(url, options);
        if (response.status === 204) {
            alert('Logout Successful!');
            return;
        }
        if (response.status !== 200) { throw new Error(response.message) }
        return await response.json();
    } catch (e) {
        alert(e.message);
    }
}

function isLogged() {
    if (localStorage.getItem('token') !== null) {
        return true;
    }
    return false
}

async function onLogout(ev) {
    await sendRequest(
        'http://localhost:3030/users/logout',
        'get',
        undefined,
        localStorage.getItem('token')
    );
    localStorage.clear();
    page.redirect('/');
}



