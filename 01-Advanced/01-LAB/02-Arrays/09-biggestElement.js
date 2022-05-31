function biggest(mx){
    let max_num = Math.max(...mx[0]);
    for (let i=0; i<mx.length; i++){
        let currentMax = Math.max(...mx[i]);
        if (currentMax > max_num){
            max_num = currentMax;
        }
    }
    return max_num;
}

console.log(biggest([[20, 50, 10],
    [8, 33, 145]]))