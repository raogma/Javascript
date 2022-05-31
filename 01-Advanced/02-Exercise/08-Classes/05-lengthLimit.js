class Stringer{
    constructor(string, length){
        this.innerString = string;
        this.innerLength = length;
    }

    increase(length){
        this.innerLength += length;
    }

    decrease(length){
        this.innerLength - length < 0 ? this.innerLength = 0 : this.innerLength -= length;
    }

    toString(){
        let copyString = this.innerString;
        if (copyString.length > this.innerLength)  {
            copyString = Array.from(copyString);
            copyString.splice(this.innerLength, copyString.length, '...');
            copyString = copyString.join('')
            return copyString;
        } else {
            return this.innerString;
        }
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4); 
console.log(test.toString()); // Test