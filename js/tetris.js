import { Board } from "./board.js";
import { Tetromino  } from "./tetrominoes.js";
import { Queue } from "./queue.js";
import { checkCollision } from "./collisions.js";

export const canvas = document.querySelector('#tetris');
export const context = canvas.getContext('2d');
context.scale(20, 20);
context.fillStyle = '#000';
context.fillRect(canvas.width, canvas.height, 1, 1)
const button = document.querySelector('#play-button');

const tetrisColumns = 10;
const tetrisRows = 20;

const board = new Board(tetrisRows, tetrisColumns, context);
const queue = new Queue(1000);
let tetromino;

function checkDrawCollisiom(tetromino, board, row, col) {
    if (!checkCollision(tetromino, board, row, col)) {
        console.log('draw')
        draw()
       } else {
           tetromino = pickCurrentTetromino(queue);
           tetromino.position = { x: 4, y: 0 }
           checkDrawCollisiom(tetromino, board, row, col)
           console.log(board)
       }
}

function pickCurrentTetromino (queue) {
    return tetromino = queue.dequeue();
};

function draw() {
    board.drawBoard()
    tetromino.drawTetromino();
  
}

function play() {
    board.reset();

    while (queue.length < queue.size) {
        tetromino = new Tetromino(context)
        tetromino.pickTeromino();
        let trashmino = tetromino;
        queue.enqueue(trashmino)
        trashmino = null;
        // tetromino = null;
    }
    // console.log(queue)
    pickCurrentTetromino(queue)
    console.log(queue)
    board.setTetromino(tetromino)

    draw();
}

button.addEventListener('click', play);


document.addEventListener('keydown', (event) => {
   

    context.clearRect(canvas.width, canvas.height, 0, 0);
    context.beginPath()
    board.updateBoard()
    tetromino.moveTetromino(event.key, board.grid)
    draw()
});

document.addEventListener('hasBeenDropped', () => {
    tetromino = pickCurrentTetromino(queue)
    tetromino.position = { x: 4, y: 0 }
    checkDrawCollisiom(tetromino.shape, board.grid, tetromino.position.y, tetromino.position.x)
})