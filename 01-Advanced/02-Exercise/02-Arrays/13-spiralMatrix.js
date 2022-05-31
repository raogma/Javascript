function solution(height, width) {
    function fillRight(mx, symbol, start, end) {
        for (let i = start; i < end; i++) {
            if (mx[start][i] === '+'){
                mx[start][i] = symbol;
                symbol++;
            }
        }
        return symbol;
    }
    function fillLeft(mx, symbol, start, end) {
        for (let i = end - 1; i > start - 1; i --) {
            if (mx[end - 1 - start][i] === '+'){
                mx[end - 1 - start][i] = symbol;
                symbol++;
            }
        }
        return symbol;
    }
    function fillDown(mx, symbol, start, end) {
        for (let i = start; i < end; i++) {
            if (mx[i][end - 1 - start] === '+'){
                mx[i][end - 1 - start] = symbol;
                symbol++;
            }
        }
        return symbol;
    }
    function fillUp(mx, symbol, start, end) {
        for (let i = end - 1; i > start - 1; i --) {
            if (mx[i][start] === '+'){
                mx[i][start] = symbol;
                symbol++;
            }
        }
        return symbol;
    }

    function constructMx(height, width) {
        let mx = [];
        for (let i = 0; i < height; i++) {
            mx.push([]);
            for (let j = 0; j < width; j++) {
                mx[i].push('+');
            }
        }
        return mx;
    }
    function checkFullMx(mx) {
        for (let i = 0; i < mx.length; i++) {
            for (let j = 0; j < mx[i].length; j++) {
                if (mx[i][j] === '+') {
                    return false;
                }
            }
        }
    }
    let mx = constructMx(height, width);
    let symbol = 1;
    let layer = 0;
    while (checkFullMx(mx) === false) {

        symbol = fillRight(mx, symbol, layer, mx.length);
        symbol = fillDown(mx, symbol, layer, mx.length);
        symbol = fillLeft(mx, symbol, layer, mx.length);
        symbol = fillUp(mx, symbol, layer, mx.length);

        layer++;
    }

    let res = '';
    for (row of mx) {
        res += `${row.join(' ')}\n`;
    }
    return res;
}

console.log(solution(3, 3));