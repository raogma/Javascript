function solution(arr){
    arr.sort((a,b) => a - b);
    let res = [];
    while (arr.length){
        res.push(arr.shift(), arr.pop());
    }
    return res;
}

console.log(solution([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]))
console.log(solution([22,
    9,
    63,
    3,
    2,
    19,
    54,
    11,
    21,
    18,]))