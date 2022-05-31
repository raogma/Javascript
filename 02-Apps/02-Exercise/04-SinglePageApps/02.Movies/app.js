import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { addPage } from './views/add.js';
import { editPage } from './views/edit.js';
import { nav } from './views/nav.js';

(function prepareViews() {
    homePage.initialize(document.querySelector('[id="home-page"]'));
    loginPage.initialize(document.querySelector('[id="form-login"]'));
    registerPage.initialize(document.querySelector('[id="form-sign-up"]'));
    addPage.initialize(document.querySelector('[id="add-movie"]'));
    editPage.initialize(document.querySelector('[id="edit-movie"]'));
    nav.initialize(document.querySelector('nav'));

    homePage.getView();
})();


