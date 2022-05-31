function solution(text){
    let words = text.split(/\W+/g);
    let res = [];
    for (const word of words) {
        if (word !== '') {
            res.push(word);
        }
    }
    return res.join('\, ').toUpperCase();
}

console.log(solution('Hi, how are you?'))
console.log(solution('Functions in JS can be nested, i.e. hold other functions')) //incorrect