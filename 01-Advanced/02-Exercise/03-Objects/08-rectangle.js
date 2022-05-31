function rectangle(width, height, color) {
    color = color[0].toUpperCase() + color.slice(1); // capitalize method slice == [1:]
    let data = {width, height, color};
    data['calcArea'] = () => data.width * data.height;
    return data;
}


let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());