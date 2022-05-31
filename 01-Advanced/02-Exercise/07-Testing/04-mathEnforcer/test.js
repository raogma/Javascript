let mathEnforcer = require('./file');
let {expect} = require('chai');


describe('return undefined if args not numbers', () => {
    it('addFive', () => {
        expect(mathEnforcer.addFive('a')).to.be.undefined;
        expect(mathEnforcer.addFive('1')).to.be.undefined;
    });
    it('subtractTen', () => {
        expect(mathEnforcer.subtractTen('a')).to.be.undefined;
        expect(mathEnforcer.subtractTen('1')).to.be.undefined;
    });
    it('sum', () => {
        expect(mathEnforcer.sum(1, 'a')).to.be.undefined;
        expect(mathEnforcer.sum(1, '1')).to.be.undefined;
        expect(mathEnforcer.sum('a', 1)).to.be.undefined;
        expect(mathEnforcer.sum('1', 1)).to.be.undefined;
    });
});

describe('successful operations', () => {
    it('addFive', () => {
        expect(mathEnforcer.addFive(1)).to.equal(6);
        expect(mathEnforcer.addFive(-1)).to.equal(4);
        expect(mathEnforcer.addFive(1.1)).to.closeTo(6.1, 0.01);
    });
    it('subtractTen', () => {
        expect(mathEnforcer.subtractTen(1)).to.equal(-9);
        expect(mathEnforcer.subtractTen(-1)).to.equal(-11);
        expect(mathEnforcer.subtractTen(1.1)).to.closeTo(-8.9, 0.01);
    });
    it('sum', () => {
        expect(mathEnforcer.sum(1, 2)).to.equal(3);
        expect(mathEnforcer.sum(-1, -2)).to.equal(-3);
        expect(mathEnforcer.sum(1, -2)).to.equal(-1);
        expect(mathEnforcer.sum(1.1, 1)).to.equal(2.1);
        expect(mathEnforcer.sum(1, 1.1)).to.equal(2.1);
    });
});