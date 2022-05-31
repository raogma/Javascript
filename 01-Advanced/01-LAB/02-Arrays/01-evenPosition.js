function solution(arr){
    let res = '';
    for (let i = 0; i < arr.length; i += 2){
        res += arr[i] + ' ';
    }   
    return res;
}

console.log(solution(['20', '30', '40', '50', '60']))