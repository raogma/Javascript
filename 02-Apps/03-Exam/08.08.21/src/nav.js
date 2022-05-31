import { html } from '../lib.js';

export function navTemplate(isLogged) {
    return html`
            <!-- Navigation -->
            <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/">Dashboard</a>
                    ${isLogged 
                    ? html`<!-- Logged-in users -->
                        <div id="user">
                            <span>Welcome, ${localStorage.getItem('email')}</span>
                            <a class="button" href="/my/${localStorage.getItem('owner')}">My Books</a>
                            <a class="button" href="/create">Add Book</a>
                            <a class="button" href="/logout">Logout</a>
                        </div>`
                    : html`<!-- Guest users -->
                        <div id="guest">
                            <a class="button" href="/login">Login</a>
                            <a class="button" href="/register">Register</a>
                        </div>`
                    }
                </section>
            </nav>`
}