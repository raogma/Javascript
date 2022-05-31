function solution(arr){
    let res = {};
    
    for (let i=0; i<arr.length - 1; i+=2){
        let key = arr[i];
        let value = Number(arr[i + 1]);
        res[key] = value;
    }
    return res;
}

console.log(solution(
    ['Yoghurt', '48', 'Rise', '138', 'Apple', '52']))