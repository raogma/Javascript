let { expect } = require('chai');
let getSum = require('./file');

describe('', () => {
    it('sums multiple numbers', () => {
        expect(getSum([1, 2, 3])).to.equal(6);
    });
});

