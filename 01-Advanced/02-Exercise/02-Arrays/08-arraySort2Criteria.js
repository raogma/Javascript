function solution(arr) {
    return arr
        .sort((a, b) => {
            if (a.length === b.length) {
                return a.localeCompare(b);
            }
            return a.length - b.length;
        })
        .join('\n')
}

console.log(solution(['Isacc',
    'Theodor',
    'Jack',
    'Harrison',
    'George']))