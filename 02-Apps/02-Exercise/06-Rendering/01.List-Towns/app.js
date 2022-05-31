import { render, html } from '../node_modules/lit-html/lit-html.js';


(function getTowns() {
    document.querySelector('form').addEventListener('submit', ev => {
        ev.preventDefault();
        let townsArr = document.querySelector('#towns').value.split(',').map(t => t.trim());
        
        function template(townsArr){
            return html`
            <ul>
                ${townsArr.map(t =>html`<li>${t}</li>`)}
            </ul>`
        }
        render(template(townsArr), document.querySelector('#root'));
    })
})()