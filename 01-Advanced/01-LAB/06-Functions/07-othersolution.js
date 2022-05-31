function solution(input) {
    let data = {}

    let fns = {
        create: (n, inherits, n2) =>
            (data[n] = inherits ? Object.create(data[n2]) : {}),
        set: (n, k, v) => (data[n][k] = v),
        print: n => {
            let entry = []
            for (let key in data[n]) {
                entry.push(`${key}:${data[n][key]}`)
            }
            console.log(entry.join(","))
        },
    }

    for (let element of input){
        [action, carName, key, value] = element.split(' ');
        fns[action](carName, key, value);
    }
}

solution(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']);