function solution(arr){
    res = '';               
    arr = arr.sort((a,b) => a.localeCompare(b));
    return arr
            .map((x, i) => `${i + 1}.${x}`)
            .join('\n')
}

console.log(solution(["John", "Bob", "Christina", "Ema"]))