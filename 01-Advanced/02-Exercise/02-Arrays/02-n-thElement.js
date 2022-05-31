// function solution(arr, count) {
//     let res = [];
//     for (let i = 0; i < arr.length; i+= count) {
//         res.push(arr[i]);
//     }
//     return res;
// }


function solution(arr, count) { 
    return arr.filter((x, i) => i % count === 0);
}

console.log(solution(['5', 
'20', 
'31', 
'4', 
'20'], 
2))