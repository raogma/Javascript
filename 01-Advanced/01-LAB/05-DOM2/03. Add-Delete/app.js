function addItem() {
    function onClick(event){
        event.target.parentElement.remove();
    }
    
    if (document.getElementById('newItemText').value !== ''){
        let li = document.createElement('li');
        li.textContent = document.getElementById('newItemText').value;

        let link = document.createElement('a');
        link.href = '#';
        link.textContent = '[Delete]';
        link.addEventListener('click', onClick);

        li.appendChild(link);

        let list = document.getElementById('items');
        list.appendChild(li);
    
        document.getElementById('newItemText').value = '';
    }
}