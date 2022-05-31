import { html } from "../lib.js";

function template() {
    return html`
        <section id="welcomePage">
            <div id="welcome-message">
                <h1>Welcome to</h1>
                <h1>My Music Application!</h1>
            </div>
        
            <div class="music-img">
                <img src="/images/musicIcons.webp">
            </div>
        </section>`
}


export function getHomePage(ctx) {
    ctx.renderView(template());
}