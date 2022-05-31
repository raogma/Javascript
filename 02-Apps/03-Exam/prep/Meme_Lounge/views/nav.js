import { html } from '../lib.js';


let user = localStorage.getItem('username');

export function navTemplate(isLogged) {
    return html`
        <!-- Navigation -->
        <a href="/all">All Memes</a>
        <!-- Logged users -->
        ${isLogged 
        ? html`
        <div class="user">
            <a href="/create">Create Meme</a>
            <div class="profile">
                ${user ? html`<span>Welcome, ${user}</span>`: null}
                <a href="/my-profile">My Profile</a>
                <a href="/logout">Logout</a>
            </div>
        </div>` 
        : html`
        <!-- Guest users -->
        <div class="guest">
            <div class="profile">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
            <a class="active" href="/">Home Page</a>
        </div>`}`
}