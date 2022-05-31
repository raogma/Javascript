function notify(message) {
    let div = document.querySelector('#notification')
    div.style.display = 'block';
    div.textContent = message;
    div.addEventListener('click', (ev) => {
      ev.target.style.display = 'none';
    })
}