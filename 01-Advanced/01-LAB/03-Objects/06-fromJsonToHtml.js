function solution(json){
    function escapeHTML(element){
        let data = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        };
        return element
                .toString()
                .replace(/[&<>"']/g, (x) => data[x]);
    }
    function makeRow(arr, action){
        let res = ' <tr>';
        if (action == 'heading'){
            for (let element of arr){
                res += `<th>${escapeHTML(element)}</th>`
            } 
        } else if (action == 'row') {
            for (let element of arr){
                res += `<td>${escapeHTML(element)}</td>`
            }
        }
        return res + '</tr>\n';
    }
    let arr = JSON.parse(json);
    let res = '<table>\n';
    res += makeRow(Object.keys(arr[0]), 'heading');

    for (let obj of arr){
        res += makeRow(Object.values(obj), 'row');
    }
    return res + '</table>';
}   

// console.log(solution(`[{"Name":"Stamat",
// "Score":5.5},
// {"Name":"Rumen",
// "Score":6}]`));

console.log(solution(`[{"Name":"Pesho",
"Score":4,
" Grade":8},
{"Name":"Gosho",
"Score":5,
" Grade":8},
{"Name":"Angel",
"Score":5.50,
" Grade":10}]`))