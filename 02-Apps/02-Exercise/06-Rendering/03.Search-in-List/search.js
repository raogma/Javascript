import {towns} from './towns.js';
import {html, render} from '../node_modules/lit-html/lit-html.js';

let townsData = [ 
   // {
   //    name: burgas,
   //    active: true
   // }
] 

towns.map(t => {
   townsData.push({
      'name': t,
      'active': false
   }) 
})

update();
document.querySelector('button').addEventListener('click', onClick);

function onClick(ev){
   let matches = 0;
   let inputValue = document.querySelector('input').value;
   townsData.map(t => {
      if(t.name.toLowerCase().includes(inputValue.toLowerCase())){
         t.active = true;
         matches ++;
      } else {
         t.active = false;
      }
   })
   document.querySelector('#result').textContent =`${matches} matches found`;
   update();
   document.querySelector('input').value = '';
}

function update(){
   render(template(townsData), document.querySelector('#towns'));
}

function template(townsData){
   return html`
   <ul>
      ${townsData.map(t => html`<li class=${t.active ? 'active': ''}>${t.name}</li>`)}
   </ul>`
}