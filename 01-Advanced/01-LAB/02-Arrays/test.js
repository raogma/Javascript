function sol(mx){
    let element = mx.find(x => x == '4');
    return element;
}

console.log(sol(['1', '4', '2', '3', '4', ' 4']))

// console.log(sol([['2', '3', '4', '7', '0'],
// ['4', '0', '5', '3', '4'],
// ['2', '3', '5', '4', '2'],
// ['9', '8', '7', '5', '4']]));