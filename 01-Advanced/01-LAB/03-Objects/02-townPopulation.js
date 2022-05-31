function solution(arr){
    let records = {};
    let res = '';
    for (element of arr) {
        let [town, population] = element.split(' <-> ');
        population = Number(population);
        if (Object.keys(records).includes(town)){
            population += records[town];
        }
        records[town] = population;
    }
    for (key in records) {
        res += `${key} : ${records[key]}\n`;
    }
    return res;
}   

console.log(solution(['Istanbul <-> 100000',
'Honk Kong <-> 2100004',
'Jerusalem <-> 2352344',
'Mexico City <-> 23401925',
'Istanbul <-> 1000']));             