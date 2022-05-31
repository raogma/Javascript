function solution(arr){
    function createObject(arr){
        let data = {};
        for (const element of arr) {
            [city, product, price] = element.split(' | ');
            price = Number(price);
            if (Object.keys(data).includes(product) === false) {
                data[product] = {};
            }
            data[product][city] = price;
        }
        return data;
    }
    
    function getLowestPrice(data){
        let res = '';
        for (let product in data){
            let lowestPrice = Number.MAX_SAFE_INTEGER;
            let currCity = '';
            for (let city in data[product]){
                let currPrice = data[product][city];
                if (currPrice < lowestPrice) {
                    lowestPrice = currPrice;
                    currCity = city;
                }
            }
            res += `${product} -> ${lowestPrice} (${currCity})\n`;
        }
        return res;
    }
    let data = createObject(arr);
    return getLowestPrice(data);
}


// {
//     'Sample Product': { 'Sample Town': 1000, 'New York': 1000.1 },
//     Orange: { 'Sample Town': 2, Sofia: 3 },
//     Peach: { 'Sample Town': 1, Sofia: 2 },
//     Burger: { 'New York': 10 }
//   }


console.log(solution(['Sample Town | Sample Product | 1000',
'Sample Town | Orange | 2',
'Sample Town | Peach | 1',
'Sofia | Orange | 3',
'Sofia | Peach | 2',
'New York | Sample Product | 1000.1',
'New York | Burger | 10']))