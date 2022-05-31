function solution (year, month, day) {
    const date = new Date(year, month, day);
 
    console.log("first", date.getFullYear(), date.getMonth(), date.getDate());
    const millisecs = 1000 * 60 * 60 * 24;
    date.setDate(date.getDate() - 1);
    console.log("result", date.getFullYear() +  "-" + date.getMonth() + "-" + date.getDate());
}


solution(2016, 9, 30)
solution(2016, 10, 1)
