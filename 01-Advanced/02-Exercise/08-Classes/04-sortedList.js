class List {
    constructor() {
        this.nums = [];
        this.size = 0;
    }

    add(element) {
        this.nums.push(element);
        this.size ++;
        this.nums.sort((a, b) => a - b);
    }

    remove(index) {
        if (index >= 0 && index < this.nums.length) {
            this.nums.splice(index, 1);
            this.size --;
        }
    }

    get(index) {
        if (index >= 0 && index < this.nums.length) {
            return this.nums[index];
        }
    }
}

// let list = new List();
// list.add(5);
// list.add(6);
// list.add(7);
// console.log(list.get(1)); 
// list.remove(0);
// console.log(list.get(1));
