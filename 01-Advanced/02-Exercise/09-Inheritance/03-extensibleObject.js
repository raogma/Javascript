function extensibleObject() {
    return {
        extend: function(template){
            let proto = Object.getPrototypeOf(this);

            for(let [k, v] of Object.entries(template)){
                if(typeof(v) == "function"){
                    proto[k] = v;
                } else {
                    this[k] = v;
                }
            }
        }
    }
}

const myObj = extensibleObject(); 

const template = { 
      extensionMethod: function () {}, 
      extensionProperty: 'someString' 
    } 
myObj.extend(template); 