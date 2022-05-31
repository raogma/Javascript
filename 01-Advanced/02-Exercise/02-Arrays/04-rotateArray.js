function solution(arr, count) {
    for (let i = 0; i < count; i++) {
        arr.unshift(arr.pop());
    }
    return arr.join(' ');
}

console.log(solution(['1', 
'2', 
'3', 
'4'], 
2))