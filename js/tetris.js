import { Board } from "./board.js";
import { Tetromino  } from "./tetrominoes.js";
import { Queue } from "./queue.js";
import { checkCollision } from "./collisions.js";
import { pickRandomTetromino } from "./tetrominoes.js";

export const canvas = document.querySelector('#tetris');
export const context = canvas.getContext('2d');
context.scale(20, 20);
context.fillStyle = '#000';
context.fillRect(canvas.width, canvas.height, 1, 1)

const levelPoints = document.querySelector('#level');
const scorePoints = document.querySelector('#score');
const button = document.querySelector('#play-button');

const tetrisColumns = 10;
const tetrisRows = 20;

const board = new Board(tetrisRows, tetrisColumns, context);
const queue = new Queue(1000);
let tetromino;
let level = 0;
let score = 0;

function renderPoints (score, level) {
    scorePoints.innerHTML = `${score}`;
    levelPoints.innerHTML = `${level}`;
}

function pickCurrentTetromino (queue) {
    return tetromino = queue.dequeue();
};

function draw() {
    const gameOver = document.addEventListener('gameOver', (event) => event);
    if (gameOver) {
        console.log('game is over')
    } else {
    board.drawBoard()
    tetromino.drawTetromino(board.grid);
    }
}

function runGame () {
    setInterval(() => { 
      tetromino.moveTetromino('ArrowDown', board.grid)
      draw();
    }, 1000)
}

function play() {
   
    board.reset();

    while (queue.length < queue.size) {
        tetromino = new Tetromino(context)
        tetromino.pickTeromino();
        let trashmino = tetromino;
        queue.enqueue(trashmino)
        trashmino = null;
    }

    pickCurrentTetromino(queue)
    board.setTetromino(tetromino)
    draw()
    setTimeout(runGame(), 1000)
}



button.addEventListener('click', play);


document.addEventListener('keydown', (event) => {
   
    context.clearRect(canvas.width, canvas.height, 0, 0);
    context.beginPath()
    tetromino.moveTetromino(event.key, board.grid)
    draw()
});

document.addEventListener('hasBeenDropped', () => {
    level++;
    board.cleanRows();
    tetromino = pickCurrentTetromino(queue);
    tetromino.position = { x: 4, y: 0 };
    console.log(level)
    renderPoints(score, level)
})

document.addEventListener('cleaningMeansScores', (e) => {
 console.log(e.detail.score)
 score = score + e.detail.score * 4;
 renderPoints(score, level)
})
