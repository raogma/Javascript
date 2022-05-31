function solve() {
    document.querySelector('button').onclick = function () {
        let num = Number(document.getElementById('input').value);
        let selectedOption = menuTo.value;
        
        selectedOption === 'hexadecimal'
        ? num = num.toString(16).toUpperCase() : num = num.toString(2);

        document.getElementById('result').value = num;
    };
    let menuTo = document.getElementById('selectMenuTo');
    menuTo.innerHTML = '<option selected value="binary">Binary</option><option value="hexadecimal">Hexadecimal</option>';
}