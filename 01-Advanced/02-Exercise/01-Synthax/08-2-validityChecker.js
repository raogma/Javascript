function solution(x1, y1, x2, y2){
    function validityChecker(a1, b1, a2, b2){
        let x = Math.abs(a1 - a2);
        let y = Math.abs(b1 - b2);
        let z = Math.sqrt(x ** 2 + y ** 2);
        if (Number.isInteger(z)){
            return 'valid'
        } else {
            return 'invalid'
        } 
    }
    return `{${x1}, ${y1}} to {0, 0} is ${validityChecker(x1, y1, 0, 0)}
{${x2}, ${y2}} to {0, 0} is ${validityChecker(x2, y2, 0, 0)}
{${x1}, ${y1}} to {${x2}, ${y2}} is ${validityChecker(x1, y1, x2, y2,)}`
}

console.log(solution(3, 0, 0, 4))
console.log(solution(2, 1, 1, 1))