function sumTable() {
    let total = 0;
    let rows = Array.from(document.getElementsByTagName('tr')).slice(1, -1);

    for (let row of rows) {
            let cols = row.children;
            let lastCol = cols[cols.length - 1].textContent;
            total += Number(lastCol);
    }

    document.getElementById('sum').textContent = total;
}