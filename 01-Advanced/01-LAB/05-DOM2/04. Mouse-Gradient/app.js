function attachGradientEvents() {
    function move(e){
        res.textContent = `${Math.floor(e.offsetX / e.target.clientWidth * 100)}%`;
    }
    let box = document.getElementById("gradient");
    let res = document.getElementById('result');
    box.addEventListener('mousemove', move);
} 