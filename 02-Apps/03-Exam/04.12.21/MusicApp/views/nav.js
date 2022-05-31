import { html } from '../lib.js';

export function navTemplate(isLogged) {
    return html`
        <img src="/images/headphones.png">
        <a href="/">Home</a>
        <ul>
            <li><a href="/all">Catalog</a></li>
            <li><a href="/search">Search</a></li>
            ${isLogged
            ? html`
            <li><a href="/create">Create Album</a></li>
            <li><a href="/logout">Logout</a></li>`
            : html`
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>`
            }
        </ul>`
}