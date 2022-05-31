class Hex {
    constructor(value) {
        this.value = value;
    }

    valueOf() {
        return this.value;
    }

    toString() {
        return `0x${this.value.toString(16).toUpperCase()}`;
    }

    plus(h2) {
        return new Hex(h2.valueOf() + this.value);
    }

    minus(h2) {
        let newValue = this.value - h2.valueOf();
        return new Hex(newValue);
    }

    parse(string) {
        return parseInt(string, 16);
    }
}

let a = new Hex(10);
let b = new Hex(5);
let c = new Hex(155);
let act2 = a.plus(c).toString();
console.log(act2)
let exp2 = "0xA5";

let act3 = a.minus(b).toString();
console.log(act3)
let exp3 = "0x5";
assert.equal(act3,exp3);

// let FF = new Hex(255);
// console.log(FF.toString());
// console.log(FF.valueOf() + 1 == 256);
// let a = new Hex(10);
// let b = new Hex(5);
// console.log(a.plus(b).toString());
// console.log(a.plus(b).toString() === '0xF');
// console.log(FF.parse('AAA'));