const { expect } = require('chai');
const isSymmetric = require('./file');
console.log(expect())

describe('', () => {
    it('return false wrong type', () => {
        expect(isSymmetric('a')).to.be.false;
    });
    it('return true if symmetric', () => {
        expect(isSymmetric([1, 1])).to.be.true;
    });
    it('return false if non symmetric', () => {
        expect(isSymmetric([1, 2])).to.be.false;
    });
    it('return true if odd-symmetric', () => {
        expect(isSymmetric([1, 1, 1])).to.be.true;
    });
    it('return false if mixed-symmetric', () => {
        expect(isSymmetric([1, '1'])).to.be.false;
    })
});