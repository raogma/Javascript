function solution(arr) {
    function parseMatrix(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split(' ').map(x => Number(x));
        }
        return arr;
    }
    function getDiagSums(mx) {
        let mainSum = 0;
        let secSum = 0;
        for (let i = 0; i < mx.length; i++) {
            mainSum += mx[i][i];
            secSum += mx[i][mx.length - 1 - i];
        }
        return mainSum === secSum ? mainSum : false;
    }

    let mx = parseMatrix(arr);
    if (getDiagSums(mx) != false) {
        for (let i = 0; i < mx.length; i++) {
            for (let j = 0; j < mx[0].length; j++) {
                if (i != j) {
                    if (j != mx.length - 1 - i) {
                        mx[i][j] = getDiagSums(mx);
                    }
                }
            }
        }
    }
    let res = '';
    for (row of mx) {
        res += `${row.join(' ')}\n`
    }
    return res;
}

console.log(solution(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1']));