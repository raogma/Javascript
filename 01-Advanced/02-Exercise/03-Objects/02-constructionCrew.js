function crew(worker){
    let requiredWater = 0.1 * worker['weight'] * worker['experience'];

    if (worker['dizziness'] === true){
        worker['levelOfHydrated'] += requiredWater;
        worker['dizziness'] = false;        
    }

    return worker;
}

console.log(crew({ weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true }));