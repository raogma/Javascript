function catalogue(arr){
    function createSortedObj(arr){
        let data = {};
        for (let element of arr) {
            [product, price] = element.split(' : ');
            let firstLetter = product[0];
            if (!data[firstLetter]){
                data[firstLetter] = [];
            }
            data[firstLetter].push({product, price: Number(price)})
            data[firstLetter].sort((a, b) => (a['product']).localeCompare(b['product']));
        }
        return data;
    }
    function createOutput(data){
        let res = '';
        let finalArr = Object.keys(data);
        finalArr.sort((a, b) => a.localeCompare(b));
        for (let letter of finalArr){
            res += `${letter}\n`  
            for (let obj of data[letter]){
                res += `  ${obj['product']}: ${obj['price']}\n`;                
            }
        }
        return res;
    }
    let obj = createSortedObj(arr);
    let result = createOutput(obj);
    return result;
}

console.log(catalogue(['Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10']))


// {
//     A: [
//       { product: 'Anti-Bug Spray', price: 15 },
//       { product: 'Apple', price: 1.25 },
//       { product: 'Appricot', price: 20.4 }
//     ],
//     F: [ { product: 'Fridge', price: 1500 } ],
//     T: [ { product: 'T-Shirt', price: 10 }, { product: 'TV', price: 1499 } ],
//     D: [ { product: 'Deodorant', price: 10 } ],
//     B: [ { product: 'Boiler', price: 300 } ]
//   }