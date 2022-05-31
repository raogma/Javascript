function getFibonator() {
    let nums = [0, 1];
    function sub(){
        let sum = nums
                    .slice(nums.length-2)
                    .reduce((x, y) => x + y);
        nums.push(sum);
        return nums[nums.length - 2];
    }
    return sub;
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13