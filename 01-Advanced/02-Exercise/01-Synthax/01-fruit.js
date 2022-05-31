function solution(type, grams, price){
    console.log(`I need $${(grams / 1000 * price).toFixed(2)} to buy ${ (grams / 1000).toFixed(2)} kilograms ${type}.`);
}

solution('orange', 2500, 1.80)