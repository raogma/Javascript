import { navigation } from './views/nav.js';
import { createPage } from './views/create.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { dashPage } from './views/dash.js';
import { detailPage } from './views/detail.js';

(function initialize() {
    homePage.setter(document.querySelector('#homePage'));
    loginPage.setter(document.querySelector('#loginPage'));
    registerPage.setter(document.querySelector('#registerPage'));
    dashPage.setter(document.querySelector('[id="dashboard-holder"]'));
    createPage.setter(document.querySelector('#createPage'));
    navigation.setter(document.querySelector('nav'));
    detailPage.setter(document.querySelector('#example'));

    document.querySelector('main').replaceChildren();

    homePage.getView();
})()

export async function sendRequest(url, method, bodyData, auth) {
    let options = {};
    let headers = { 'Content-Type': 'application/json' };

    if(auth !== undefined) {
        headers['X-Authorization'] = auth;
    }

    if( url.split('/').at(-1) === 'logout'){
        options = {
            method,
            headers
        };
    }
    if (method !== 'get') {
        options = {
            method,
            headers,
            body: JSON.stringify(bodyData)
        };
    }

    try{
        let response = await fetch(url, options);
        if (![200, 204].includes(response.status)) {throw new Error(response.message);}
        if (response.status !== 204){
            return await response.json();
        }

    } catch(e){
        alert(e.message);
    }
}