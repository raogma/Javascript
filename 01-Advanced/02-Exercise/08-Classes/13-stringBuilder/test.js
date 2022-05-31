let StringBuilder = require('./app');
let {expect} = require('chai');


describe('constructor', () => {
    it('instantiate with undefined', () => {
        expect(new StringBuilder(undefined).toString()).to.equal('');
    })
    it('instantiate not with string', () => {
        expect(() => new StringBuilder(1).toString()).to.throw(TypeError, 'Argument must be a string');
        expect(() => new StringBuilder(null).toString()).to.throw(TypeError, 'Argument must be a string');
    })
    it('instantiate with string', () => {
        expect(new StringBuilder('abc').toString()).to.equal('abc');
    })
})

describe('method append', () => {
    it('append not with string', () => {
        let sb = new StringBuilder('abc');
        expect(() => sb.append(1)).to.throw(TypeError, 'Argument must be a string');
    })
    it('append with string', () => {
        let sb = new StringBuilder('abc');
        sb.append('def');
        expect(sb.toString()).to.equal('abcdef');
    })
})

describe('method prepend', () => {
    it('prepend not with string', () => {
        let sb = new StringBuilder('abc');
        expect(() => sb.prepend(1)).to.throw(TypeError, 'Argument must be a string');
    })
    it('prepend with string', () => {
        let sb = new StringBuilder('abc');
        sb.prepend('def');
        expect(sb.toString()).to.equal('defabc');
    })
})

describe('method insert', () => {
    it('insert not with string', () => {
        let sb = new StringBuilder('abc');
        expect(() => sb.insertAt(1, 1)).to.throw(TypeError, 'Argument must be a string');
    })
    it('insert with string', () => {
        let sb = new StringBuilder('abc');
        sb.insertAt('d', 0);
        expect(sb.toString()).to.equal('dabc');
    })
})

describe('method remove', () => {
    it('remove', () => {
        let sb = new StringBuilder('abc');
        sb.remove(1, 2);
        expect(sb.toString()).to.equal('a');
    })
})

describe('mixed methods', () => {
    it('append+remove', () => {
        let sb = new StringBuilder('abc');
        sb.append('def');
        sb.remove(4, 1)
        expect(sb.toString()).to.equal('abcdf')
    })
    it('prepend+remove', () => {
        let sb = new StringBuilder('abc');
        sb.prepend('def');
        sb.remove(1, 1)
        expect(sb.toString()).to.equal('dfabc')
    })
    it('insert+remove', () => {
        let sb = new StringBuilder('abc');
        sb.insertAt('def', 1); 
        sb.remove(1, 1)
        expect(sb.toString()).to.equal('aefbc')
    })
})