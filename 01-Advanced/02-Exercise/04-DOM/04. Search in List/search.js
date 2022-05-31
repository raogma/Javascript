function search() {
   let searchBox = document.getElementById('searchText');
   let listElements = document.querySelectorAll('#towns li');
   let matches = 0;
   let result = document.getElementById('result');

   for (let element of listElements) {
      if(element.textContent.indexOf(searchBox.value) > -1) {
         element.style.fontWeight = 'bold';
         element.style.textDecoration = 'underline';
         matches ++;
      }
   }
   result.textContent = `${matches} matches found`;
}
