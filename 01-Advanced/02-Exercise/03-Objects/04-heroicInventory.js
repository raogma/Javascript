function heroes(arr){
    for (let i = 0; i < arr.length; i++) {
        [name, level, items] = arr[i].split(' / ');
        level = Number(level);
        items !== undefined ? items = items.split(', ') : items = [];  
        arr[i] = {name, level, items};
    }
    return JSON.stringify(arr);
}

// function heroes(arr){
//     let res = [];

//     while (arr.length){
//         let element = arr.shift();
//         [name, level, items] = element.split(' / ');
//         level = Number(level);
//         items !== undefined ?  items = items.split(', ') : items = [];
//         res.push({name, level, items});
//     }

//     return JSON.stringify(res);
// }

console.log(heroes(['Isacc / 25 ',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara']))