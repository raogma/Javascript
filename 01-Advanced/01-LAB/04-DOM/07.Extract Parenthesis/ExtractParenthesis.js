function extract(content) {
    let elements = []; 
    let text = document.getElementById(content).textContent;

    for (let i = 0; i < text.length; i++) {
        let ch = text[i];
        if (ch === '('){
            i++;
            let word = '';
            while (text[i] !== ')') {
                word += text[i];
                i ++;
            }
            elements.push(word); 
        }
    }
    return elements.join('; ');
}