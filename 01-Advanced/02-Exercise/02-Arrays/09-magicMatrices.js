function solution(mx){
    let size = mx.length;
    let sums = new Set(); //N.B.
    for (let i = 0; i < size; i++) {
        let totalSumRows = 0;
        let totalSumColumns = 0;
        for (let j = 0; j < size; j++) {
            totalSumRows += mx[i][j];
            totalSumColumns += mx[j][i];
        }   //N.B.
        sums.add(totalSumRows);
        sums.add(totalSumColumns);
    }       
    return sums.size > 1 ? false : true; 
}           //N.B.


console.log(solution(
    [[9,   3,  22 , 16 , 15],
        [2 , 21,  20 , 14 ,  8],
       [25 , 19 , 13 ,  7  , 1],
       [18 , 12 ,  6,   5 , 24],
       [11 , 10 ,  4 , 23 , 17],
 ]))

// console.log(solution(
//    [[4, 5, 6],
//     [6, 5, 4],
//     [5, 5, 5]
// ]))

// console.log(solution([[11, 32, 45],
//     [21, 0, 1],
//     [21, 1, 1]]))

// console.log(solution([[1, 0, 0],
//     [0, 0, 1],
//     [0, 1, 0]]))
