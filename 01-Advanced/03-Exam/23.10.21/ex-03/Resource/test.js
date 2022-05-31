let library = require('./library');
let {expect} = require('chai');

describe('Tests', () => {
    describe('calcPrice', () => {
        it('throw error name not string', () => {
            expect(() => library.calcPriceOfBook(1, 1)).to.throw(Error, "Invalid input");
        })
        it('throw error name not string', () => {
            expect(() => library.calcPriceOfBook(undefined, 1)).to.throw(Error, "Invalid input");
        })
        it('throw error year not number', () => {
            expect(() => library.calcPriceOfBook('a', 'a')).to.throw(Error, "Invalid input");
        })
        it('throw error year numberStr', () => {
            expect(() => library.calcPriceOfBook('a', '1')).to.throw(Error, "Invalid input");
        })
        it('throw error year not Int', () => {
            expect(() => library.calcPriceOfBook('a', 1.1)).to.throw(Error, "Invalid input");
        })
        it('year < 1980', () => {
            expect(library.calcPriceOfBook('a', 1979)).to.equal("Price of a is 10.00");
        })
        it('year === 1980', () => {
            expect(library.calcPriceOfBook('a', 1980)).to.equal("Price of a is 10.00");
        })
        it('year > 1980', () => {
            expect(library.calcPriceOfBook('a', 1981)).to.equal("Price of a is 20.00");
        })
    })
    
    describe('findBook', () => {
        it('throw error empty array', () => {
            expect(() => library.findBook([], 'a')).to.throw(Error, "No books currently available");
        })
        it('book found', () => {
            expect(library.findBook(['a', 'b', 'c'], 'a')).to.equal("We found the book you want.");
        })
        it('book not found', () => {
            expect(library.findBook(['a', 'b', 'c'], 'd')).to.equal("The book you are looking for is not here!");
        })
    
        it('wrong arr type 0 length', () => {
            expect(() => library.findBook('', 'a')).to.throw(Error, "No books currently available");
        })
    
        it('wrong arr type', () => {
            expect(() => library.findBook('a', 'a')).to.throw(TypeError, 'booksArr.find is not a function');
        })
    })
    
    describe('arrangeBooks', () => {
        it('throw error negative count', () => {
            expect(() => library.arrangeTheBooks(-1)).to.throw(Error, "Invalid input");
        })
    
        it('throw error count not INT', () => {
            expect(() => library.arrangeTheBooks(1.1)).to.throw(Error, "Invalid input");
        })
    
        it('throw error wrong type count', () => {
            expect(() => library.arrangeTheBooks('1')).to.throw(Error, "Invalid input");
        })
        
        it('throw error wrong type count', () => {
            expect(() => library.arrangeTheBooks('a')).to.throw(Error, "Invalid input");
        })
    
        it('throw error wrong type count', () => {
            expect(() => library.arrangeTheBooks(undefined)).to.throw(Error, "Invalid input");
        })
    
        it('arrange books equal to space available', () => {
            expect(library.arrangeTheBooks(40)).to.equal("Great job, the books are arranged.");
        })
    
        it('arrange books less than space available', () => {
            expect(library.arrangeTheBooks(39)).to.equal("Great job, the books are arranged.");
        })
    
        it('arrange books more than space available', () => {
            expect(library.arrangeTheBooks(41)).to.equal("Insufficient space, more shelves need to be purchased.");
        })
    
        it('arrange books 0', () => {
            expect(library.arrangeTheBooks(0)).to.equal("Great job, the books are arranged.");
        })
    })
})