import { deleteCurrentData, loadCtxData, logout, page, like} from './lib.js';
import { loadDash } from './src/dash.js';
import { loadLogin } from './src/login.js';
import { loadRegister } from './src/register.js';
import { loadCreate } from './src/create.js';
import { loadEdit } from './src/edit.js';
import { loadDetails } from './src/details.js';
import { loadMy } from './src/my.js';

page(loadCtxData);
page('/', loadDash);
page('/index.html', '/');
page('/login', loadLogin);
page('/logout', logout);
page('/delete/:id', deleteCurrentData);
page('/register', loadRegister);
page('/create', loadCreate);
page('/like/:id', like);
page('/edit/:id', loadEdit);
page('/my/:id', loadMy);
page('/details/:id', loadDetails);

page.start()
