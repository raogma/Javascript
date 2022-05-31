class Rectangle {
    constructor(width, height, color) {
        Object.assign(this, {width, height, color});
    }

    calcArea() {return this.width * this.height}
}