function solution() {
    let ingredients = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    };
    let recipes = {
        apple: {carbohydrate: 1, flavour: 2},
        lemonade: {carbohydrate: 10, flavour: 20},
        burger: {carbohydrate: 5, fat: 7, flavour: 3},
        eggs: {protein: 5, fat: 1, flavour: 1},
        turkey: {protein: 10, carbohydrate: 10, fat: 10, flavour: 10}
    }
    function manager(command) {
        function process(){
            return {
                restock: (ingredient, quantity) => {
                    if (!Object.keys(ingredients).includes(ingredient)){
                        ingredients[ingredient] = 0;
                    }
                    ingredients[ingredient] += quantity;
                    return 'Success';
                },
                prepare: (recipe, count) => {
                    let ingredientsBackup = {};
                    ingredientsBackup = Object.assign(ingredientsBackup, ingredients);
                    for(let i = 0; i < count; i++){
                        for(let key in recipes[recipe]){
                            let neededQuantity = recipes[recipe][key];
                            if (neededQuantity > ingredients[key]){
                                ingredients = ingredientsBackup;
                                return `Error: not enough ${key} in stock`;
                            } else {
                                ingredients[key] -= neededQuantity;
                            }
                        }
                    }
                    return 'Success';
                },
                report: () => {
                    return `protein=${ingredients['protein']} carbohydrate=${ingredients['carbohydrate']} fat=${ingredients['fat']} flavour=${ingredients['flavour']}`;
                }
            }
        }
        let [action, ingredient, quantity] = command.split(' ');
        return process()[action](ingredient, Number(quantity));
    }
    return manager;
}


let manager = solution();
// console.log(manager("restock flavour 50")); // Success 
// console.log(manager("prepare lemonade 4")); // Error: not enough carbohydrate in stock 
// console.log(manager('restock carbohydrate 10'));
// console.log(manager('restock flavour 10'));
// console.log(manager('prepare apple 1'));
// console.log(manager('restock fat 10'));
// console.log(manager('prepare burger 1'));
// console.log(manager('report'));
 
console.log(manager('prepare turkey 1'));
console.log(manager('restock protein 10'));
console.log(manager('prepare turkey 1'));
console.log(manager('restock carbohydrate 10'));
console.log(manager('prepare turkey 1'));
console.log(manager('restock fat 10'));
console.log(manager('prepare turkey 1'));
console.log(manager('restock flavour 10'));
console.log(manager('prepare turkey 1'));
console.log(manager('report'));