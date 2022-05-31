function diagonals(mx){
    let mainDiag = 0;
    let secDiag = 0;

    for (let i = 0; i < mx.length; i++){
        mainDiag += mx[i][i];
        secDiag += mx[i][mx.length - i - 1];
    }
    return `${mainDiag} ${secDiag}`
}   

console.log(diagonals([[3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]]))