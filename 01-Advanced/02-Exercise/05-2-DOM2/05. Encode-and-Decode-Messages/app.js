function encodeAndDecodeMessages() {
    document.querySelector('#main').addEventListener('click', ev => {
        let msg = Array.from(ev.target.parentElement.querySelector('textarea').value);
        if (ev.target.textContent === 'Encode and send it') {
            msg = msg.map(x => String.fromCharCode(x.charCodeAt(0) + 1));
            document.querySelectorAll('textarea')[1].value = msg.join('');
            document.querySelectorAll('textarea')[0].value = ''; 
            
        } else if (ev.target.textContent === 'Decode and read it') {
            msg = msg.map(x => String.fromCharCode(x.charCodeAt(0) - 1));
            document.querySelectorAll('textarea')[1].value = msg.join(''); 
        }
    })
}