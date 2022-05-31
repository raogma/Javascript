function neighbors(mx){
    let pairs = 0;
    for (let i = 0; i < mx.length; i++) {
        for (let j = 0; j < mx[0].length; j++){
            let element = mx[i][j];
            if (j + 1 < mx[0].length) {
                if (mx[i][j + 1] == element){
                    pairs += 1;
                }
            }
            if (i + 1 < mx.length) {
                if (mx[i + 1][j] == element){
                    pairs += 1;
                }
            }
        }
    }
    return pairs;
}


console.log(neighbors([['2', '3', '4', '7', '0'],
['4', '0', '5', '3', '4'],
['2', '3', '5', '4', '2'],
['9', '8', '7', '5', '4']])) 

console.log(neighbors([['test', 'yes', 'yo', 'ho'],
['well', 'done', 'yo', '6'],
['not', 'done', 'yet', '5']]))
