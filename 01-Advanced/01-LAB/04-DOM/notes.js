// cannot use variable with regexp because
let searchedWord = 'Pesho';
let sentence = '.........';

sentence.replace(/searchedWord/g, 'Gosho'); // not working

let regex = new RegExp(searchedWord, 'g');
                                            // the correct way
sentence.replace(regex, 'Gosho');

//-----------------------------------------------------------------
