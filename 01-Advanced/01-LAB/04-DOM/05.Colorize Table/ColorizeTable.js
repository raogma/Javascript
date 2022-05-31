function colorize() {
    let rows = Array.from(document.querySelectorAll('tr:nth-child(even)'));
    rows = rows.map(x => x.style.backgroundColor = 'teal');
}