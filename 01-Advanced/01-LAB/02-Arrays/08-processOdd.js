function odd(arr) { 
    return arr
        .filter((x, i) => i % 2 != 0)
        .map(x => x * 2)
        .reverse()
        .join(' ');
}

console.log(odd([10, 15, 20, 25]));
console.log(odd([3, 0, 10, 4, 7, 3]));