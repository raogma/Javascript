let rgbToHexColor = require('./file');
let { expect } = require('chai');

describe('Invalid args', () => {
    it('red is not integer', () => {
        expect(rgbToHexColor('a', 0, 0)).to.be.undefined;
    });
    it('green is not integer', () => {
        expect(rgbToHexColor(0, 'a', 0)).to.be.undefined;
    });
    it('blue is not integer', () => {
        expect(rgbToHexColor(0, 0, 'a')).to.be.undefined;
    });
    it('red is lower than range', () => {
        expect(rgbToHexColor(-1, 255, 255)).to.be.undefined;
    });
    it('green is lower than range', () => {
        expect(rgbToHexColor(255, -1, 255)).to.be.undefined;
    });
    it('blue is lower than range', () => {
        expect(rgbToHexColor(255, 255, -1)).to.be.undefined;
    });
    it('red is higher than range', () => {
        expect(rgbToHexColor(256, 255, 255)).to.be.undefined;
    });
    it('green is higher than range', () => {
        expect(rgbToHexColor(255, 256, 255)).to.be.undefined;
    });
    it('blue is higher than range', () => {
        expect(rgbToHexColor(255, 255, 256)).to.be.undefined;
    });
});

describe('Successful conversion', () => {
    it('white conversion', () => {
        expect(rgbToHexColor(255, 255, 255)).to.equal('#FFFFFF');
    });
    it('red conversion', () => {
        expect(rgbToHexColor(255, 0, 0)).to.equal('#FF0000');
    });
    it('green conversion', () => {
        expect(rgbToHexColor(0, 255, 0)).to.equal('#00FF00');
    });
    it('blue conversion', () => {
        expect(rgbToHexColor(0, 0, 255)).to.equal('#0000FF');
    });
})