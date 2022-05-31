function getDeck(cards) {
    function createCard(face, suit) {
        let colors = {
            'S': '\u2660',
            'H': '\u2665',
            'D': '\u2666',
            'C': '\u2663'
        }
        if (!['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'].includes(face) ||
            !Object.keys(colors).includes(suit)){
            return;
        }
        return {
            face,
            suit,
            toString() {
                return face + colors[suit];
            }
        };
    }
    let res = [];
    for (let card of cards) {
        let cardEls = Array.from(card);
        if (cardEls.length === 3){
            if (createCard(cardEls[0] + cardEls[1], cardEls[2]) === undefined){
                console.log(`Invalid card: ${cardEls[0] + cardEls[1] + cardEls[2]}`);
                return;
            } else {
                res.push(createCard(cardEls[0] + cardEls[1], cardEls[2]).toString());
            }
        } else {
            if (createCard(cardEls[0], cardEls[1]) === undefined){
                console.log(`Invalid card: ${cardEls[0] + cardEls[1]}`);
                return;
            } else {
                res.push(createCard(cardEls[0], cardEls[1]).toString());
            }
        }
    }
    console.log(res.join(' '));
}
// getDeck(['AS', 'KH', '2C', '10D']);
getDeck(['5S', '3D', 'QD', '1C']);