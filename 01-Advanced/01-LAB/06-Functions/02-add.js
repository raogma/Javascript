function solution(x){
    function add(y){
        return x + y;
    }
    return add;
}

let add5 = solution(5);
console.log(add5(2));
console.log(add5(3));