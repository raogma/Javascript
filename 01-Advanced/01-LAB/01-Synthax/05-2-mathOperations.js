function solution(a, b, op) {
    switch(op){
        case '+': console.log(a + b);
        break;
        case '-': console.log(a - b);
        break;
        case '*': console.log(a * b);
        break;
        case '/': console.log(a / b);
        break;
        case '%': console.log(a % b);
        break;
        case '**': console.log(a ** b);
        break;
    }
}

solution(3, 5, '+')