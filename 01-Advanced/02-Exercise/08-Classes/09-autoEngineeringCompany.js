function sol(arr) {
    let data = {};

    for (let el of arr) {
        [brand, model, quantity] = el.split(' | ');
        if (!Object.keys(data).includes(brand)) {
            data[brand] = {};
        }
        if (!Object.keys(data[brand]).includes(model)) {
            data[brand][model] = 0;
        }
        data[brand][model] += Number(quantity);
    }

    let res = '';
    for (let brand in data) {
        res += brand + '\n';
        for (let model in data[brand]){
            res += `###${model} -> ${data[brand][model]}\n`;
        }
    }
    return res;
}

// data = {
//     brand1: {
//         model1: quant1,
//         model2: quant2,
//     },
//     brand2: {
//         model1: quant1,
//         model2: quant2,
//     }
// };

console.log(sol(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']))