function solution(arr){
    let res = []; 
    let maxNum = Number.MIN_SAFE_INTEGER;
    for (num of arr) {
        if (num >= maxNum) {
            res.push(num);
            maxNum = num;
        }
    }
    return res;
}

console.log(solution([1, 
    3, 
    8, 
    4, 
    10, 
    12, 
    3, 
    2, 
    24]))