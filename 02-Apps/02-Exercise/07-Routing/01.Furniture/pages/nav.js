import { html, onLogout } from "../lib.js";

export function navTemplate(isLogged, path) {
    return html`
<h1><a href="/">Furniture Store</a></h1>
<nav>
    <a id="catalogLink" href="/" class=${path === '/dashboard' || path === '/' ? 'active' : undefined}>Dashboard</a>
    ${isLogged 
        ? html`
    <div id="user">
        <a id="createLink" href="/create" class=${path === '/create'? 'active' : undefined}>Create Furniture</a>
        <a id="profileLink" href="/my-furniture" class=${path === '/my-furniture'? 'active' : undefined}>My Publications</a>
        <a @click=${onLogout} id="logoutBtn" href="javascript:void(0)">Logout</a>
    </div>`
        : html`
    <div id="guest">
        <a id="loginLink" href="/login" class=${path === '/login'? 'active' : undefined}>Login</a>
        <a id="registerLink" href="/register" class=${path === '/register'? 'active' : undefined}>Register</a>
    </div>`}
</nav>`
}

