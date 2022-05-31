function solution(arr, arg) {
    let process = {
        'asc': () => arr = arr.sort((a,b) => a-b),
        'desc': () => arr = arr.sort((a,b) => b-a)
    };
    return process[arg]();
}

console.log(solution([14, 7, 17, 6, 8], 'asc'))