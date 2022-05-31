function solution(name, population, treasury){
    let city = {
        'name': name,
        'population': population,
        'treasury': treasury,
    }
    return city;
}

console.log(solution('Tortuga',
7000,
15000))