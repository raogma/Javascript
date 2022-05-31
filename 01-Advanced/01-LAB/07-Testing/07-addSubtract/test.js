let createCalculator = require('./file');
let {expect} = require('chai');


describe('Calculator', () => {
    let instance = undefined;
    beforeEach(() => {
        instance = createCalculator();
    })
    it('has all methods', () => {
        expect(instance).to.has.ownProperty('add');
        expect(instance).to.has.ownProperty('subtract');
        expect(instance).to.has.ownProperty('get');
    });

    it('initial value is 0', () => {
        expect(instance.get()).to.equal(0);
    })
    it('add a single number', () => {
        instance.add(1);
        expect(instance.get()).to.equal(1);
    })
    it('add multiple numbers', () => {
        instance.add(1);
        instance.add(2);
        expect(instance.get()).to.equal(3);
    })
    it('subtract a single number', () => {
        instance.subtract(1);
        expect(instance.get()).to.equal(-1);
    })
    it('subtract multiple numbers', () => {
        instance.subtract(1);
        instance.subtract(2);
        expect(instance.get()).to.equal(-3);
    })
    it('add a single number', () => {
        instance.add(1);
        expect(instance.get()).to.equal(1);
    })
    it('add multiple numbers', () => {
        instance.add(1);
        instance.add(2);
        expect(instance.get()).to.equal(3);
    })
    it('subtract a single number', () => {
        instance.subtract(1);
        expect(instance.get()).to.equal(-1);
    })
    it('subtract multiple numbers', () => {
        instance.subtract(1);
        instance.subtract(2);
        expect(instance.get()).to.equal(-3);
    })
    it('add string and number', () => {
        instance.add(1);
        instance.add('1');
        expect(instance.get()).to.equal(2);
    })
    it('subtract string and number', () => {
        instance.subtract(1);
        instance.subtract('1');
        expect(instance.get()).to.equal(-2);
    })
});