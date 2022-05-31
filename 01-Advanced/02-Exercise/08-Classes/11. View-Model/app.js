class Textbox {
    constructor(selector, regex){
        this._invalidSymbols = regex;
        this._elements = document.querySelectorAll(selector);
        Array.from(this.elements).map(x => x.addEventListener('change', (ev) => {
            this.value = ev.value;
        }))
        this._value = '';
    }

    get value(){
        return this._value;
    }

    set value(val){
        this._value = val;
        Array.from(this.elements).map(x => x.value = val);
    }

    get elements(){
        return this._elements;
    }

    isValid(){
        for (let el of this.elements){
            if(this._invalidSymbols.test(el.value)){
                return false;
            }
            return true;
        }
    }
}

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = document.getElementsByClassName('.textbox');

inputs.addEventListener('click',function(){console.log(textbox.value);});
