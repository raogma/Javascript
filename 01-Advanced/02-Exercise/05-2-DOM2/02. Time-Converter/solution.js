function attachEventsListeners() {
    let data = [
            {'days': 24},
            {'hours': 60},
            {'minutes': 60},
            {'seconds': 60},
        ]

    document.querySelector('main').addEventListener('click', ev => {
        if (ev.target.tagName === 'INPUT' && ev.target.value === 'Convert'){
            let div = ev.target.parentElement;
            let inputNumber = Number(div.querySelector('input[type=text]').value);
            let inputNumberCopy = inputNumber;
            let type = div.querySelector('input[type=text]').id;
            let startingPosition = data.indexOf(data.find(x => Object.keys(x)[0] === type));
            
            for (let i = startingPosition + 1; i < data.length; i++) {
                let key = Object.keys(data[i])[0];
                let value = data[i][key];
                inputNumberCopy *= value;
                document.querySelector(`input[id=${key}]`).value = inputNumberCopy;
            }

            for(let i = startingPosition - 1; i > -1; i--) {
                let key = Object.keys(data[i])[0];
                let value = data[i][key];
                inputNumber /= value;
                document.querySelector(`input[id=${key}]`).value = inputNumber;
            }
        }   
    })   
}