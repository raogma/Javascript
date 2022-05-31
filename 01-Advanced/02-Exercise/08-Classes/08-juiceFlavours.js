function sol(arr){
    function appendToDict(target, k, v){
        if(!Object.keys(target).includes(k)){
            target[k] = 0;
        }
        target[k] += Number(v);
    }

    let data = {
        bottles: {}
    };
    for(let x of arr) {
        let [flavour, quantity] = x.split(' => ');
        appendToDict(data, flavour, quantity)

        quantity = data[flavour]
        if (quantity >= 1000){
            let count = Math.floor(quantity / 1000);
            data[flavour] -= count * 1000;
            appendToDict(data['bottles'], flavour, count)
        }
    }

    let res = '';
    for(let flavour in data['bottles']){
        res += `${flavour} => ${data['bottles'][flavour]}\n`;
    }
    return res;
}


console.log(sol(['Orange => 2000',
'Peach => 1432',
'Banana => 450',
'Peach => 600',
'Strawberry => 549']))