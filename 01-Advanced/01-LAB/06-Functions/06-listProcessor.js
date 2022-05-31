// function solution(arr){
//     res = [];
//     for (let element of arr){
//         let [operation, string] = element.split(' ');
//         switch(operation){
//             case 'add': res.push(string);break;
//             case 'remove': res = res.filter(x => x !== string);break;
//             case 'print': console.log(res.join(','));break;
//         }
//     }
// }


function solution(arr) {
    function process(){
        return {
            'add': (string) => res.push(string),
            'remove': (string) => res = res.filter(x => x !== string),
            'print': () => console.log(res.join(','))
        }
    }
    let res = [];
// for (let element of arr){
//     let [operation, string] = element.split(' ');
//     process()[operation](string);
// }
    arr.map(x => process()[x.split(' ')[0]](x.split(' ')[1]));
}


solution(['add hello', 'add again', 'remove hello', 'add again', 'print'])