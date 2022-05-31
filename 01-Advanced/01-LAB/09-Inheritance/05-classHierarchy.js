function solution(){
    class Figure{
        constructor(unit = 'cm'){
            this.unit = unit;
        }
    
        get area(){
            return
        }
    
        changeUnits(value){
            this.unit = value;
        }
    
        toString(){
            return `Figures units: ${this.unit}`
        }
    }
    
    class Circle extends Figure {
        constructor(radius, unit){
            super(unit);
            this.radius = radius;
        }
    
        get area() {
            let data = {
                m: 100,
                cm: 1,
                mm: 0.1
            }
            return Math.PI * (this.radius * data[this.unit]) ** 2;  
        }
        
        toString(){
            return `Figures units: ${this.unit} Area: ${this.area} - radius: ${this.radius}`
        }
    }
    
    class Rectangle extends Figure {
        constructor(width, height, unit){
            super(unit);
            this.width = width;
            this.height = height;
        }
    
        get area() {
            let data = {
                m: 0.01,
                cm: 1,
                mm: 10
            }
            return this.height * data[this.unit] * this.width * data[this.unit];  
        }
        
        toString(){
            return `Figures units: ${this.unit} Area: ${this.area} - width: ${this.width}, height: ${this.height}`
        }
    }
    return {
        Figure,
        Circle,
        Rectangle,
    }
}

// let c = new Circle(5);
// console.log(c.area); // 78.53981633974483
// console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

let r = new Rectangle(3, 4, 'mm');
console.log(r.area); // 1200 
console.log(r.toString()); //Figures units: mm Area: 1200 - width: 30, height: 40

r.changeUnits('cm');
console.log(r.area); // 12
console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

// c.changeUnits('mm');
// console.log(c.area); // 7853.981633974483
// console.log(c.toString())
