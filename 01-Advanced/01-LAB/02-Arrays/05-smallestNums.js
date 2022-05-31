function solution(arr){
    let res = '';
    arr.sort((a, b) => a-b)
    res += arr[0] + ' ' + arr[1];
    return res;
}


console.log(solution([30, 15, 50, 5]))