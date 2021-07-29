import { NOBODY } from "./constants.js";

const getWinner = (n, board) => {
    //for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) console.log(board[i][j])
    //lines
    for (let i = 0; i < n; i++) {
        if (!board[i][0]) {
            continue;
        }
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }
    //cols
    for (let j = 0; j < n; j++) {
        if (!board[0][j]) {
            continue;
        }
        if (board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            return board[0][j];
        }
    }
    //main diag
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }
    //sec diag
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[1][1];
    }
    //tie
    let isTie = true;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            isTie = isTie && Boolean(board[i][j] !== '');
        }
    }
    if (isTie) {
        return NOBODY;
    }
    //default
    return '';
}

export default getWinner;