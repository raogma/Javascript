function carFactory(car){
    function makeEngine(car){
        let powerInput = car['power'];
        if (powerInput <= 90) {
            car['engine'] = { power: 90, volume: 1800 };
        } else if(powerInput <= 120){
            car['engine'] = { power: 120, volume: 2400 };
        } else {
            car['engine'] = { power: 200, volume: 3500 };
        }
        delete car['power'];
    }
    function makeCarriage(car){
        car['carriage'] = {'type': car['carriage'], 'color': car['color']};
        delete car['color'];
    }
    function makeWheels(car){
        let wheelSize = car['wheelsize'];
        if (wheelSize % 2 === 0){
            wheelSize = Math.floor(wheelSize - 1)
        }
        car['wheels'] = Array(4).fill(wheelSize);
        delete car['wheelsize'];
    }
    makeEngine(car);
    makeCarriage(car);
    makeWheels(car);

    return car;
}

console.log(carFactory({ model: 'Opel Vectra',
power: 110,
color: 'grey',
carriage: 'coupe',
wheelsize: 17 }))