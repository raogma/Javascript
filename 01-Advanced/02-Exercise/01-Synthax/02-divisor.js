function solution(a, b){
    let l = []
    for(let i = 1; i <= Math.max(a, b); i++){
        if(a % i == 0){
            if (b % i == 0){
                l.push(i);
            }        
        } 
    }
    console.log(Math.max(...l)) //list doesnt work with max like in python, it needs several parameters
}

solution(15, 5)
solution(2154, 458)