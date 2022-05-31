function solution(moves) {
    function endGame(board) {
        for (row of board) {
            if (row.includes(false)) {
                return false;
            }
        }
    }
    function checkStatus(board) {
        function whoWins(arr) {
            if (arr.every(x => x === 'X')) {
                return 'Player X wins!';
            } else if (arr.every(x => x === 'O')) {
                return 'Player O wins!';
            } else {
                return 'Noone Wins Yet';
            }
        }
        let arrToCheck = [];
        // rows
        for (row of board) {
            if (whoWins(row) !== 'Noone Wins Yet') {
                return whoWins(row);
            }
        }
        //cols
        for (let i = 0; i < board.length; i++) {
            arrToCheck = [];
            for (let j = 0; j < board.length; j++) {
                arrToCheck.push(board[j][i]);
            }
            if (whoWins(arrToCheck) !== 'Noone Wins Yet') {
                return whoWins(arrToCheck);
            }
        }
        //mainDiag
        arrToCheck = [];
        for (let i = 0; i < board.length; i++) {
            arrToCheck.push(board[i][i])
        }
        if (whoWins(arrToCheck) !== 'Noone Wins Yet') {
            return whoWins(arrToCheck);
        }
        //secDiag
        arrToCheck= [];
        for (let i = 0; i < board.length; i++) {
            arrToCheck.push(board[i][board.length - 1 - i])
        }
        if (whoWins(arrToCheck) !== 'Noone Wins Yet') {
            return whoWins(arrToCheck);
        }
    }
    let board = [
        [false, false, false],
        [false, false, false],
        [false, false, false],
    ];
    let isPlayerX = false;
    let hasWinner = false;
    let res = '';

    for (move of moves) {
        isPlayerX = !isPlayerX;
        [row, col] = move.split(' ').map(x => Number(x));
        if (0 <= row < board.length && 0 <= col < board.length) {
            if (board[row][col] === false) {
                isPlayerX === true ? board[row][col] = 'X' : board[row][col] = 'O';
                //all spots are taken no winner
                if (endGame(board) === undefined) {
                    break;
                }
                // checksStatus has found a winner
                if (checkStatus(board) !== undefined) {
                    hasWinner = true;
                    break;
                }
                //trying to take already taken spot
            } else {
                console.log('This place is already taken. Please choose another!')
                isPlayerX = !isPlayerX;
            }
        }
    }
    hasWinner ? res += `${checkStatus(board)}\n`: res += 'The game ended! Nobody wins :(\n';
    for (el of board) {
        res += `${el.join('\t')}\n`
    }
    return res;
}

console.log(solution(["0 1",
"0 0",
"0 2",
"2 0",
"1 0",
"1 2",
"1 1",
"2 1",
"2 2",
"0 0"]))