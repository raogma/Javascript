function solve() {
  [input, output] = document.querySelectorAll('#exercise textarea');
  [generateBtn, buyBtn] = document.querySelectorAll('#exercise button');
  let table = document.querySelector('.table tbody');

  generateBtn.addEventListener('click', ev => {
    let arr = JSON.parse(input.value);
    arr.map(x => table.innerHTML += 
    `<tr>
    <td><img src="${x.img}"></td>
    <td><p>${x.name}</p></td>
    <td><p>${x.price}</p></td>
    <td><p>${x.decFactor}</p></td>
    <td><input type="checkbox"></td>
    </tr>`);
  })

  buyBtn.addEventListener('click', ev => {
    let names = [];
    let totalPrice = 0;
    let decFactor = [];

    let selectedRows = Array.from(table.children).filter(x => x.querySelector('input:checked'));
    for (let row of selectedRows) {
      if (row.children[4].children[0].checked === true){
        names.push(row.children[1].textContent);
        totalPrice += Number(row.children[2].textContent);        
        decFactor.push(Number(row.children[3].textContent));  
      }   
    }

    output.value = 
`Bought furniture: ${names.join(', ')}
Total price: ${totalPrice.toFixed(2)}
Average decoration factor: ${(decFactor.reduce((x, y) => x + y)) / decFactor.length}`;
  });
}