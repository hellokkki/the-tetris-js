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
let tetromino;

function draw() {
    console.log(tetromino)
    console.log(board)
    board.drawBoard()
    tetromino.drawTetromino(board.grid);
  
}

function play() {
    board.reset();
    tetromino = new Tetromino(context)
    tetromino.pickTeromino()
    board.setTetromino(tetromino)

    draw();
}

button.addEventListener('click', play);


document.addEventListener('keydown', (event) => {
    const nextRow = tetromino.position.y + 1;
    board.checkCollision(nextRow, tetromino.position.x) ? null : tetromino.moveTetromino(event.key)

    context.clearRect(canvas.width, canvas.height, 0, 0);
    context.beginPath()
    board.updateBoard()
    draw()
});