function solution(arr){
    let resArr = [];
    let res = '';
    for (num of arr){
        if (num < 0){
           resArr.unshift(num); 
        } else {
            resArr.push(num);
        }
    }
    for (num of resArr){
        res += num + '\n';
    }
    return res;
}

console.log(solution([7, -2, 8, 9]))