function addItem() {
    let li = document.createElement('li');

    if (document.getElementById('newItemText').value !== ''){
        li.textContent = document.getElementById('newItemText').value;

        let list = document.getElementById('items');
        list.appendChild(li);
    
        document.getElementById('newItemText').value = '';
    }
}