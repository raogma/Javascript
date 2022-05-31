function sol(face, suit) {
    let colors = {
        'S': '\u2660', 
        'H': '\u2665',
        'D': '\u2666',
        'C': '\u2663'
    }
    if (!['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'].includes(face)){
        throw new Error('Invalid face');
    }
    if (!Object.keys(colors).includes(suit)){
        throw new Error('Invalid color');
    }
    return {
        face,
        suit,
        toString() {
            return face + colors[suit];
        } 
    };
}

sol('10', 'H').toString();