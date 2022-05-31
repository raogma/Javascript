let { expect } = require('chai');
let isOddOrEven = require('./file');

describe('Testing', () => {
    it('wrong type input should return undefined', () => {
        expect(isOddOrEven([])).to.be.undefined;
    });
    it('input should return odd', () => {
        expect(isOddOrEven('a')).to.equal('odd');
    });
    it('input should return even', () => {
        expect(isOddOrEven('ab')).to.equal('even');
    });
})