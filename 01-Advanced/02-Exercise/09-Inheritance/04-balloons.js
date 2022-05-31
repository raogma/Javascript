function solution(){
    class Balloon {
        constructor(color, hasWeight) {
            this.color = color;
            this.hasWeight = hasWeight;
        }
    }
    
    class PartyBalloon extends Balloon {
        constructor(color, hasWeight, ribbonColor, ribbonLenght) {
            super(color, hasWeight);
            this.ribbonColor = ribbonColor;
            this.ribbonLenght = ribbonLenght;
        }
    
        get ribbon() {
            return {
                color: this.ribbonColor,
                length: this.ribbonLenght
            }
        }
    }
    
    class BirthdayBalloon extends PartyBalloon{
        constructor(color, hasWeight, ribbonColor, ribbonLenght, text){
            super(color, hasWeight, ribbonColor, ribbonLenght);
            this._text = text;
        }
    
        get text() {
            return this._text;
        }
    }
    return {
        Balloon,
        PartyBalloon,
        BirthdayBalloon
    }
}