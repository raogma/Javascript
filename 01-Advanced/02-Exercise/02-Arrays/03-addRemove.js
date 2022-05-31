function solution(commands){
    let res = [];
    let initialNum = 1;
    for (let i = 0; i < commands.length; i++){
        commands[i] == 'add' ? res.push(initialNum) : res.pop();
        initialNum++;
    }
    return res.length > 0 ? res.join('\n') : 'Empty';
}

console.log(solution(['add', 
'add', 
'add', 
'add']))

console.log(solution(['add', 
'add', 
'remove', 
'add', 
'add']))

console.log(solution(['remove', 
'remove', 
'remove']))