import { XSYMBOL, ZEROSYMBOL, NOBODY, n } from "./constants.js";
import getWinner from "./getWinner.js";

let scores = new Map([
    [ZEROSYMBOL, 10],
    [XSYMBOL, -10],
    [NOBODY, 0],
]);

const mkBestMove = (board) => {
    let bestScore = Number.NEGATIVE_INFINITY;
    let bestMove = {
        i: -1,
        j: -1,
    };
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] == '') {
                board[i][j] = ZEROSYMBOL;
                let score = minimax(board, false);
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = {
                        i: i,
                        j: j,
                    };
                }
                board[i][j] = '';
            }
        }
    }
    return bestMove;
};

const minimax = (board, isMax) => {
    let result = getWinner(n, board);
    if (result !== '') {
        return scores.get(result);
    }
    let bestScore = isMax ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === '') {
                board[i][j] = isMax ? ZEROSYMBOL : XSYMBOL;
                let score = minimax(board, !isMax);
                board[i][j] = '';
                bestScore = isMax ? Math.max(score, bestScore) : Math.min(score, bestScore);
            }
        }
    }
    return bestScore;
};

export default mkBestMove;