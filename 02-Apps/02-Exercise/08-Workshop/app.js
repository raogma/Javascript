import { page, loadCTXData, onLogout, create} from './lib.js';
import {renderHome} from './src/home.js';
import {renderBrowse} from './src/browse.js';
import { renderLogin } from './src/login.js';
import { renderRegister } from './src/register.js';
import { renderEditor } from './src/editor/editor.js';
import { renderDetails } from './src/details.js';
import { renderProfile } from './src/profile.js';
import { renderStart } from './src/quiz.js';
import { renderResults } from './src/results.js';

page(loadCTXData);
page('/', renderHome);
page('/index.html', '/');
page('/browse', renderBrowse);
page('/login', renderLogin);
page('/register', renderRegister);
page('/logout', onLogout);
page('/profile', renderProfile);
page('/details/:id', renderDetails);
page('/start/:id', renderStart);
page('/results/:quizId/:quizSessionId', renderResults);
page('/create', renderEditor);
page('/edit/:id', renderEditor);

page.start();


window.createA = (endpoint, body)=> create(endpoint, body)