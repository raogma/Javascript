function solve() {
    let [nameInput, hallInput, priceInput, buttonOnScreen] = Array.from(document.querySelector('#container').children);
    buttonOnScreen.addEventListener('click', addMovieListener);
    
    function addMovieListener(ev) {
        ev.preventDefault(); 
        let name = nameInput.value;
        let hall = hallInput.value;
        let price = priceInput.value;

        if (name !== '' && hall !== '' && price !== '') {
            if (!isNaN(Number(price))){
                let li = document.createElement('li');
                li.innerHTML = `
                <span>${name}</span>
                <strong>Hall: ${hall}</strong>
                <div>
                    <strong>${Number(price).toFixed(2)}</strong>
                    <input placeholder="Tickets Sold">
                    <button>Archive</button>
                </div>
                `
                document.querySelector('#movies ul').appendChild(li);
                li.querySelector('div button').addEventListener('click', archiveListener);
                nameInput.value = '';
                hallInput.value = '';
                priceInput.value = '';
            }
        }
    }

    function archiveListener(ev){
        let div = ev.target.parentElement;
        let moviePrice = div.querySelector('strong').textContent;
        let count = div.querySelector('input').value;
        let movieName = div.parentElement.querySelector('span').textContent;
        let li2 = document.createElement('li');

        if (!isNaN(Number(count)) && count !== '') {
            li2.innerHTML = `
                <span>${movieName}</span>
                <strong>Total amount: ${(count * moviePrice).toFixed(2)}</strong>
                <button>Delete</button>
            `;
            document.querySelector('#archive ul').appendChild(li2);

            ev.target.parentElement.parentElement.remove();

            li2.querySelector('button').addEventListener('click', ev => ev.target.parentElement.remove())
        }
    }

    document.querySelector('#archive button').addEventListener('click',
        ev => Array.from(ev.target.parentElement.querySelector('ul').children).map(x => x.remove()));
}
