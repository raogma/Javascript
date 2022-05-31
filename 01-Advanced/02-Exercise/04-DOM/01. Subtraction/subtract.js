function subtract() {
    let res = document.getElementById('result');
    let firstNum = document.getElementById('firstNumber').value;
    let secondNum = document.getElementById('secondNumber').value;
    res.textContent = Number(firstNum) - Number(secondNum);
}