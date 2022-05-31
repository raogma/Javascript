let PaymentPackage = require('./app');
let { expect } = require('chai');

describe('constructor', () => {
    it('should instantiate', () => {
        let pp = new PaymentPackage('a', 1);
        expect(pp.name).to.equal('a');
        expect(pp.value).to.equal(1);
        expect(pp.VAT).to.equal(20);
        expect(pp.active).to.equal(true);
    })
})

describe('setters errors', () => {
    it('active is not boolean error', () => {
        let pp = new PaymentPackage('a', 1);
        expect(() => pp.active = 'b').to.throw(Error, 'Active status must be a boolean');
    })
    it('VAT is not number error', () => {
        let pp = new PaymentPackage('a', 1);
        expect(() => pp.VAT = 'b').to.throw(Error, 'VAT must be a non-negative number');
    })
    it('VAT is negative error', () => {
        let pp = new PaymentPackage('a', 1);
        expect(() => pp.VAT = -1).to.throw(Error, 'VAT must be a non-negative number');
    })
    it('value is not number error', () => {
        let pp = new PaymentPackage('a', 1);
        expect(() => pp.value = 'b').to.throw(Error, 'Value must be a non-negative number');
    })
    it('value is negative error', () => {
        let pp = new PaymentPackage('a', 1);
        expect(() => pp.value = -1).to.throw(Error, 'Value must be a non-negative number');
    })
    it('name is not string error', () => {
        let pp = new PaymentPackage('a', 1);
        expect(() => pp.name = 2).to.throw(Error,'Name must be a non-empty string');
    })
    it('name is empty error', () => {
        let pp = new PaymentPackage('a', 1);
        expect(() => pp.name = '').to.throw(Error, 'Name must be a non-empty string');
    })
})

describe('setters', () => {
    it('can be instantiated when active', () => {
        expect(new PaymentPackage('a', 1).toString()).to.equal(
`Package: a
- Value (excl. VAT): 1
- Value (VAT 20%): 1.2`);
    })
    it('can be instantiated when unactive', () => {
        let pp = new PaymentPackage('a', 1);
        pp.active = false;
        expect(pp.toString()).to.equal(
`Package: a (inactive)
- Value (excl. VAT): 1
- Value (VAT 20%): 1.2`);
    })
    it('VAT', () => {
        let pp = new PaymentPackage('a', 1);
        pp.VAT = 1;
        expect(pp.toString()).to.equal(
`Package: a
- Value (excl. VAT): 1
- Value (VAT 1%): 1.01`
        );
    })
    it('value', () => {
        let pp = new PaymentPackage('a', 1);
        pp.value = 2;
        expect(pp.toString()).to.equal(
`Package: a
- Value (excl. VAT): 2
- Value (VAT 20%): 2.4`
        );
    })
    it('value', () => {
        let pp = new PaymentPackage('a', 1);
        pp.value = 0;
        expect(pp.toString()).to.equal(
`Package: a
- Value (excl. VAT): 0
- Value (VAT 20%): 0`
        );
    })
    it('name is not string error', () => {
        let pp = new PaymentPackage('a', 1);
        pp.name = 'b'
        expect(pp.toString()).to.equal(
`Package: b
- Value (excl. VAT): 1
- Value (VAT 20%): 1.2`
        );
    })
})