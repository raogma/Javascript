function solution(r){
    let type = typeof r;
    if (type != 'number'){
        console.log(`We can not calculate the circle area, because we receive a ${type}.`);
    } 
    else{
        console.log((Math.PI * r ** 2).toFixed(2));
    }
}

solution(5)
solution('name')
