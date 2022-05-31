function solution(...args) {
    let res = '';
    let data = {};

    for (let arg of args){
        if (!Object.keys(data).includes(typeof arg)){
            data[typeof arg] = [];
        }
        data[typeof arg].push(arg);
    }
    //result types
    for (let keyType in data) {
        data[keyType].map(value => res += `${keyType}: ${value}\n`)
    }
    //getting result count
    Object.keys(data).sort((a,b) =>{b.length - a.length}).map(x => res += `${x} = ${data[x].length}\n`)

    return res;
}

console.log(solution('cat', 42, function () { console.log('Hello world!'); }))