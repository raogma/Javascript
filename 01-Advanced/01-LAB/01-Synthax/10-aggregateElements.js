function solution(elements){
    let total = 0;
    let totalInversed = 0;
    let concat = '';
    for(i=0; i < elements.length; i++){
        total += elements[i];
        totalInversed += 1/elements[i];
        concat += String(elements[i]);
    }
    console.log(total);
    console.log(totalInversed);
    console.log(concat);
}

solution([1, 2, 3])