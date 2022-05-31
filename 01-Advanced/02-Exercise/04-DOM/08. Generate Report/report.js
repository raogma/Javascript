function generateReport() {
    function getRowContent(row){
        return Array.from(row.children);
    }
    let rows = Array.from(document.getElementsByTagName('tr'));
    let data = [];

    for(let row of rows.slice(1)) {
        row = getRowContent(row).map(x => x.textContent);
        let objToPush = {};
        for (let j=0; j<row.length; j++) {
            let checkbox = getRowContent(rows[0])[j].children[0];
            if (checkbox.checked === true) {
                let cell = row[j];
                objToPush[checkbox.name] = cell;
            }
        }
        data.push(objToPush);
    }
    document.getElementById('output').value = JSON.stringify(data);
}