function solution(area, vol, input){
    let arr = JSON.parse(input);
    let res = [];
    for (element of arr) {
        res.push({
            area: area.apply(element),
            volume: vol.apply(element)
        });
    }
    return res;
}

function area() {
        return Math.abs(this.x * this.y);
    };


function vol() {
        return Math.abs(this.x * this.y * this.z);
    };

console.log(solution(area, vol, `[
    {"x":"1","y":"2","z":"10"},
    {"x":"7","y":"7","z":"10"},
    {"x":"5","y":"2","z":"10"}
    ]`));