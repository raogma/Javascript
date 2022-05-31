function solution(n, k){
    let res = [];
    res.length = k - 1;
    res.fill(0);
    res.push(1);
    for (let i = 0; i < n - 1; i++){
        let total = 0;
        for(let j = i; j < i+k; j++){
            total += res[j];
        }
        res.push(total);
    }
    let l = res.length
    for (let i=0; i < l; i++){
        num = res.shift();
        if (num !== 0) {
            res.push(num);
        }
    }
    return res;
}

console.log(solution(6, 3))