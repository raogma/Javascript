function solution(month, year){
                //zero days returns the previous month
    let date = new Date(year, month, 0);
    return date.getDate();
}

console.log(solution(1, 2012));