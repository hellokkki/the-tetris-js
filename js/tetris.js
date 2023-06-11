import { Board } from "./board.js";
import { Tetromino  } from "./tetrominoes.js";

export const canvas = document.querySelector('#tetris');
export const context = canvas.getContext('2d');
context.scale(20, 20);
context.fillStyle = '#000';
context.fillRect(canvas.width, canvas.height, 1, 1)
const button = document.querySelector('#play-button');

const tetrisColumns = 10;
const tetrisRows = 20;

let board = new Board(tetrisRows, tetrisColumns, context);

function play() {
    console.log('play')
    board.reset();
    board.drawBoard();
    let tetromino = new Tetromino(context)
    tetromino.pickTeromino()
    tetromino.drawTetromino();
    console.log(tetromino)
    
    board.setTetromino(tetromino)
}

button.addEventListener('click', play)