function deleteByEmail() {
    let input = document.querySelector('input[name="email"]').value;
    let rows = Array.from(document.querySelectorAll('table#customers tr'));
    let result = document.getElementById('result');

    let rowToDelete = rows.filter(x => x.children[1].textContent === input)[0];
    if (rowToDelete !== undefined) {
        rowToDelete.remove();
        result.textContent = 'Deleted.';
    } else {
        result.textContent = 'Not found.'
    }
}