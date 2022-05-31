function sol(arr) {
    let data = {};
    let process = {
        'create': (carName) => {
            data[carName] = [];
        },
        'inherit': (childName, parentName) => {
            data[childName] = Object.create(data[parentName]);
        },
        'set': (carName, key, value) => {
            let dictToPush = {};
            dictToPush[key] = value;
            data[carName].push(dictToPush);
        },
        'print': (carName) => console.log(data[carName])
    }

    for (let command of arr) {
        command = command.split(' ');
        if (command.includes('inherit')) {
            let [childName, parentName] = [command[1], command[3]];
            process.inherit(childName, parentName);
        } else if (command.includes('set')) {
            let [carName, key, value] = [command[1], command[2], command[3]];
            process.set(carName, key, value);
        } else if (command.includes('print')) {
            let carName = command[1];
            process.print(carName);
        } else {
            let carName = command[1];
            process.create(carName);
        }
    }
}

sol(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']);