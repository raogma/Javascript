function solution(arr){
    let nums = [];
    let data = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '/': (a, b) => a / b,
        '*': (a, b) => a * b,
    }
    for (let i=0; i<arr.length; i++){
        if (typeof arr[i] === 'number'){
            nums.push(arr[i]);
        } else {
            let operator = arr[i];
            if (nums.length < 2){
                return "Error: not enough operands!";
            }
            let a = nums.pop();
            let b = nums.pop();
            let res = data[operator](b, a);
            nums.push(res);
        }
    }
    return nums.length > 1 ? 'Error: too many operands!' : nums[0]; 
}

console.log(solution([5,
    3,
    4,
    '*',
    '-']))

console.log(solution([3,
    4,
    '+']))

console.log(solution([15,
    '/']))

console.log(solution([7,
    33,
    8,
    '-']))