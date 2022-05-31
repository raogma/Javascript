function sol(arr, start, end) {
    if (!Array.isArray(arr)) {
        return NaN;
    }
    if (start < 0) {
        start = 0;
    }
    if (end > arr.length) {
        end = arr.length - 1;
    }
    return arr.slice(start, end + 1).reduce((x, y) => x + Number(y), 0);
}

console.log(sol([10, 20, 30, 40, 50, 60], 3, 300));
console.log(sol([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1));
// console.log(sol([10, 'twenty', 30, 40], 0, 2))
console.log(sol([], 1, 2))