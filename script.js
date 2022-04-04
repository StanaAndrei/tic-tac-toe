import getWinner from "./getWinner.js";
import { XSYMBOL, ZEROSYMBOL, n } from "./constants.js";
import ticTacToeAI from "./ai.js";

const pvpBtn = document.querySelector('#pvp');
const pveBtn = document.querySelector('#pve');
const setupDiv = document.querySelector('#setup');
const boardDiv = document.querySelector('#board');
let mode;
let gameOver = false;

const manageSetup = e => {
    e.preventDefault();
    mode = e.target.id;
    setupDiv.style.display = 'none';
    boardDiv.style.display = 'block';
}
pvpBtn.addEventListener('click', manageSetup)
pveBtn.addEventListener('click', manageSetup);

//main game
let board = new Array(n).fill().map(() => new Array(n).fill(''));
function *generator(turnX) {
    while (true) {
        if (turnX) {
            yield XSYMBOL;
        } else {
            yield ZEROSYMBOL;
        }
        turnX ^= 1;
    }
}
const assignChar = generator(true);

const manageGameStatus = () => {
    let winner = getWinner(board.length, board);
    if (winner) {
        gameOver = true;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                boardBtn[i][j].disabled = true;
            }
        }
        document.querySelector('#message').innerText = `${winner} WON`;
    }
}

const handleBoardBtnClick = e => {
    e.preventDefault();
    let btn = e.target;
    let line = btn.id[4];
    let col = btn.id.slice(-1);
    if (board[line][col]) {
        return;
    }
    board[line][col] = boardBtn[line][col].innerText = assignChar.next().value;
    manageGameStatus();
    if (mode === 'pve' && !gameOver) {
        let { i, j } = ticTacToeAI.mkBestMove(board);
        if (i === -1) {
            return;
        }
        //console.log(i, j);
        board[i][j] = boardBtn[i][j].innerText = assignChar.next().value;
        manageGameStatus();
    }
}

let boardBtn = [];
for (let i = 0; i < n; i++) {
    boardBtn[i] = [];
    for (let j = 0; j < n; j++) {
        boardBtn[i][j] = document.querySelector(`#line${i}-col${j}`);
        boardBtn[i][j].addEventListener('click', handleBoardBtnClick);
    }
}
