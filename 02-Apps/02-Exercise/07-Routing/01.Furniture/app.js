import { page, render, isLogged } from './lib.js';
import { homePage} from './pages/homePage.js';
import { createPage } from './pages/createPage.js';
import { registerPage } from './pages/registerPage.js';
import { loginPage } from './pages/loginPage.js';
import { editPage } from './pages/editPage.js';
import { detailsPage } from './pages/detailsPage.js';
import { myPage } from './pages/myPage.js';
import { navTemplate } from './pages/nav.js';

page(loadContextData);

page('/', homePage);
page('/index.html', '/');
page('/register', registerPage);
page('/login', loginPage);
page('/create', createPage);
page('/my-furniture', myPage);
page('/details/:id', detailsPage);
page('/details/edit/:id', editPage);
page.start();

function loadContextData(ctx, next) {
    render(navTemplate(isLogged(), ctx.path), document.querySelector('header'));
    ctx.renderView = (template) => render(template, document.querySelector('.container'));
    next();
}


