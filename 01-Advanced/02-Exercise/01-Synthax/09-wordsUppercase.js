function solution(text){
    // return text.toUpperCase(); 
    let separators = ["\.", "\,", "\!", '\?', '\-', '\_', '\;'];
    let res = text.toUpperCase();
    for (let separator of separators){
        res = res.split(separator);
        res = res.join('')
    }
    res = res.split(' ');
    res = res.join('\, ')
    return res
}

console.log(solution('Hi, how are you?'))
console.log(solution('Functions in JS can be nested, i.e. hold other functions')) //incorrect