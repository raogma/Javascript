function solution (year, month, day) {
                            // mdn - monthIndex                                         
    let date = new Date(year, month - 1, day);
    date.setDate(date.getDate() - 1);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

console.log(solution(2016, 9, 30))
console.log(solution(2016, 10, 1))
