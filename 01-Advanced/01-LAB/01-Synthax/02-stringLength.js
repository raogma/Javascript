function solution(a, b, c) {
    let sum = 0;
    sum = a.length + b.length + c.length;
    console.log(sum);
    console.log(Math.floor(sum / 3));
};

solution('chocolate', 'ice cream', 'cake');