function solve() {
   let button = document.querySelector('#searchBtn');
   button.addEventListener('click', onClick);
   let rows =  document.querySelectorAll('tbody tr');

   function onClick() {
      let input = document.getElementById('searchField').value.toLowerCase();

      for (let row of rows){
         if (row.textContent.toLowerCase().includes(input)){
            row.setAttribute('class', 'select');
         } else {
            row.removeAttribute('class');
         }
      }
   }
}  