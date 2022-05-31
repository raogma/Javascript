function solution(a, b, op){
    if (op == '+'){
        console.log(a + b);
    }
    else if(op == '-'){
        console.log(a - b);
    }

    else if(op == '*'){
        console.log(a * b);
    }

    else if(op == '/'){
        console.log(a / b);
    }

    else if(op == '%'){
        console.log(a % b);
    }

    else if(op == '**'){
        console.log(a ** b);
    }
}

solution(5, 6, '+')
solution(3, 5.5, '*')
