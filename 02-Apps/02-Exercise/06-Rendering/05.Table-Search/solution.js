import { html, render } from '../node_modules/lit-html/lit-html.js'

solution();
let contactsData = {}

async function solution(){
   let data = await sendRequest('http://localhost:3030/jsonstore/advanced/table')
   Object.assign(contactsData, data);
   update();
   document.querySelector('#searchBtn').addEventListener('click', onSearch)
};

function onSearch(){
   Object.values(contactsData).map(o => o['selected'] = false);
   let searchedValue = document.querySelector('#searchField').value;
   Object.values(contactsData).map(c => {
      Object.values(c).map(v => {
         if(typeof v === 'string'){
            if(v.toLowerCase().includes(searchedValue.toLowerCase())){
               c.selected = true;
            }
         }
      })
   })
   update();
}

function update(){
   render(template(Object.values(contactsData)), document.querySelector('table'));
}

function template(contacts){
   return html `
   <tbody>
      ${contacts.map(c => html`
      <tr class=${c.selected ? 'select' : ''}>
         <td>${c.firstName}${c.lastName}</td>
         <td>${c.email}</td>
         <td>${c.course}</td>
      </tr>
      `)}
   </tbody>
   `
}

async function sendRequest(url) {
   try {
       let response = await fetch(url);
       if (response.status !== 200) { throw new Error(response.message) }
       return await response.json();
   } catch (e) {
       alert(e.message);
   }
}