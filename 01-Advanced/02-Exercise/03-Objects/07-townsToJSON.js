function solution(arr){
    function splitElements(arr){
        arr = arr.map(x => x.split('|').filter(y => y !== ''))
        for (let i = 0; i < arr.length; i++){
            arr[i] = arr[i].map(x => x.trim()); // == strip()   
        }
        return arr;
    }
    function createObj(arr){
        let data = [];
        let keys = arr[0];
        arr.splice(0, 1);

        while(arr.length > 0){
            let dict = {};
            let townArr = arr.shift();
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let townEl = townArr[i];
                if (!isNaN(Number(townEl))){ // NaN != NaN
                    townEl = Number(townEl).toFixed(2); // converts it to str
                    townEl = Number(townEl);
                }
                dict[key] = townEl;
            }   
            data.push(dict);
        }
        return data; 
    }
    arr = splitElements(arr);
    let data = createObj(arr);
    return JSON.stringify(data);
}

console.log(solution(['| Town | Latitude | Longitude |',
'| Veliko Turnovo | 43.0757 | 25.6172 |',
'| Monatevideo | 34.50 | 56.11 |']))