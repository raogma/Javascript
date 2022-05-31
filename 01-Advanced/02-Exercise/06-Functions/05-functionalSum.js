function add(x) {
    function inner(y) {
        x += y;
        return inner;
    }
    inner.toString = () => x;
    return inner;
}

console.log(add(1)(6)(-3).toString());