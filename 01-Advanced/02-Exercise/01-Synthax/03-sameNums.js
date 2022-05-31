function solution(num){
    function check(num){
        for (let i = 0; i < num.length - 1; i ++){
            if (num[i] !== num[i + 1]){
                return false;
            }
        }
        return true;
    }
    function sum(num){
        let total = 0
        for (let i = 0; i < num.length; i ++){
            total += Number(num[i])
        }
        return total
    }
    num = String(num);
    console.log(check(num));
    console.log(sum(num));
}

solution(123);
