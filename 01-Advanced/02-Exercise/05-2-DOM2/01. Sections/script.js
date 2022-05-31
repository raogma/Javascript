function create(words) {
   let content = document.querySelector('#content');

   for(let word of words) {
      let p = document.createElement('p');
      p.textContent = word;
      p.style.display = 'none';
      
      let div = document.createElement('div');
      div.appendChild(p);
      content.appendChild(div);
   }

   content.addEventListener('click', (ev) => {
      if (ev.target.tagName === 'DIV'){
         ev.target.querySelector('p').style.display = 'block';
      }
   });
}