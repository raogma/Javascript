import { page, render, isLogged, logoutUser } from './lib.js';
import { navTemplate } from './views/nav.js';
import { getHomePage } from './views/home.js';
import { getLoginPage } from './views/login.js';
import { getRegisterPage } from './views/register.js';
import { getCreatePage } from './views/create.js';
import { getDetailsPage } from './views/details.js';
import { getEditPage } from './views/edit.js';
import { getAllPage } from './views/all.js';
import { getSearchPage } from './views/search.js';

page(loadContextData);

page('/', getHomePage);
page('/index.html', '/');
page('/all', getAllPage);
page('/login', getLoginPage);
page('/register', getRegisterPage);
page('/search', getSearchPage);
page('/create', getCreatePage);
page('/details/:id', getDetailsPage);
page('/edit/:id', getEditPage);
page('/logout', logoutUser);

page.start()

function loadContextData(ctx, next) {
    render(navTemplate(isLogged()), document.querySelector('nav'));
    ctx.renderView = (template) => render(template, document.querySelector('main'));
    next();
}


