function catalogue(arr){
    let data = {};
    let res = '';
    for (let element of arr) {
        [product, price] = element.split(' : ');
        data[product] = Number(price);
    }
    let sortedKeys = Object.keys(data);
    sortedKeys.sort((a,b) => a.localeCompare(b));
    let letters = new Set(sortedKeys.map(x => x[0]));
    for (let letter of letters) {
        res += `${letter}\n`
        for (let key of sortedKeys) {
            if (key[0] === letter){
                res += `  ${key}: ${data[key]}\n`;
            }
        }
    }
    return res;
}


console.log(catalogue(['Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10']))
