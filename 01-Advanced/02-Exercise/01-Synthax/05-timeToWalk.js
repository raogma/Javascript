function solution(steps, footprint, speed) {
    speed = speed *  1000 / 3600;
    let S = steps * footprint;
    let resting = parseInt(S / 500); 
    let t = S / speed;
    t += resting * 60;
    let hours = parseInt(t / 3600); 
    let minutes = parseInt((t - hours * 3600) / 60); // NB!
    let seconds = Math.round(t - hours * 3600 - minutes * 60);
    return (`${String(hours).padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
}

console.log(solution(4000, 0.60, 5));
console.log(solution(2564, 0.70, 5.5));
