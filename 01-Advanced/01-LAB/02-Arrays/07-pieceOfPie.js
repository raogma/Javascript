function pie(arr, flavor1, flavor2) {
    let i1 = arr.indexOf(flavor1);
    let i2 = arr.indexOf(flavor2);
    return arr.slice(i1, i2 + 1);
}

console.log(pie(['Pumpkin Pie',
'Key Lime Pie',
'Cherry Pie',
'Lemon Meringue Pie',
'Sugar Cream Pie'],
'Key Lime Pie',
'Lemon Meringue Pie'))