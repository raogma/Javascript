function solution(arr) {
    function checkToEnd(mx) {
        for (row of mx) {
            if (row.includes('+')) {
                return false;
            }
        }
    }
    function constructMx(a, b) {
        let mx = [];
        for (let i = 0; i < a; i++) {
            mx.push([])
            for (let j = 0; j < b; j++) {
                mx[i].push('+')
            }
        }
        return mx;
    }

    [width, height, x, y] = arr;
    let mx = constructMx(width, height);
    let count = 0;
    while (checkToEnd(mx) === false) {
        for (let i = x - count; i <= x + count; i++) {
            if (0 <= i && i < height) {
                for (let j = y - count; j <= y + count; j++) {
                    if (0 <= i && i < height) {
                        if (mx[i][j] === '+') {
                            mx[i][j] = count + 1;
                        }
                    }
                }
            }
        }
        count++;
    }

    let res = '';
    for (row of mx) {
        res += `${row.join(' ')}\n`;
    }
    return res;
}

// console.log(solution([5, 5, 2, 2]))
console.log(solution([4, 4, 0, 0]))