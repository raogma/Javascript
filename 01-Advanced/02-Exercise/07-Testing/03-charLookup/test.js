let lookupChar = require('./file');
let { expect } = require('chai');

describe('', () => {
    it('first arg is not a string undefined', () => {
        expect(lookupChar(1, 1)).to.be.undefined;
    });
    it('second arg is not a number undefined', () => {
        expect(lookupChar('a', 'a')).to.be.undefined;
    });
    it('second arg is not a number undefined', () => {
        expect(lookupChar('a', '1')).to.be.undefined;
    });
    it('second arg is not an integer undefined', () => {
        expect(lookupChar('a', 1.5)).to.be.undefined;
    });
    it('index higher than string length', () => {
        expect(lookupChar('a', 1)).to.equal("Incorrect index");
    });
    it('index lower than string length', () => {
        expect(lookupChar('a', -1)).to.equal("Incorrect index");
    });
    it('correct args lead to successful output', () => {
        expect(lookupChar('car', 1)).to.equal("a");
    });
})