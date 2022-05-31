import { navigation } from './views/nav.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { dashPage } from './views/dash.js';
import { createPage } from './views/create.js';

(function initialize() {
    navigation.setter(document.querySelector('nav'));
    homePage.setter(document.querySelector('#homeContainer'));
    loginPage.setter(document.querySelector('#logContainer'));
    registerPage.setter(document.querySelector('#regContainer'));
    dashPage.setter(document.querySelector('[id="dashboard-holder"]'));
    createPage.setter(document.querySelector('#createContainer'));

    homePage.getView();
})()