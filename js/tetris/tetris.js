import { Board } from "../board.js";
import { Tetromino  } from "./tetrominoes.js";
import { Queue } from "../queue.js";
import { isObjectEmpty } from "../utils/objectsUtils.js";

export const canvas = document.querySelector('#tetris');
export const context = canvas.getContext('2d');
context.scale(20, 20);
context.fillStyle = '#000';
context.fillRect(canvas.width, canvas.height, 1, 1)

const levelPoints = document.querySelector('#level');
const scorePoints = document.querySelector('#score');
const button = document.querySelector('#play-button');
const gameOverPopup = document.querySelector('#game-over');

const tetrisColumns = 10;
const tetrisRows = 20;

const board = new Board(tetrisRows, tetrisColumns, context);
const queue = new Queue(1000);
let tetromino;
let level = 0;
let score = 0;
let gameInterval;

function renderPoints (score, level) {
    scorePoints.innerHTML = `score: ${score}`;
    levelPoints.innerHTML = `level: ${level}`;
}

function pickCurrentTetromino (queue) {
    return tetromino = queue.dequeue();
};


function moveDown (tetromino) {
    if (!isObjectEmpty(tetromino)) {
        tetromino.moveTetromino('ArrowDown', board)
    }
}

function draw() {
    board.drawBoard()
    tetromino.drawTetromino(board.grid)
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
    
    gameInterval = setInterval(() => { 
        console.log(tetromino)
        tetromino.moveTetromino('ArrowDown', board.grid)
        draw();
      }, 1000)

    setTimeout(gameInterval, 1000)
}


const dropTetromino = () => {
    level++;
    board.cleanRows();
    tetromino = pickCurrentTetromino(queue);
    tetromino.position = { x: 4, y: 0 };
    renderPoints(score, level)
}

const cleaning = (event) => {
    score = score + event.detail.score * 4;
    renderPoints(score, level)
}

button.addEventListener('click', play);


document.addEventListener('keydown', (e) => {
    context.clearRect(canvas.width, canvas.height, 0, 0);
    context.beginPath()
    tetromino.moveTetromino(e.key, board.grid)
    draw()
});

document.addEventListener('hasBeenDropped', dropTetromino)

document.addEventListener('cleaningMeansScores', cleaning)

document.addEventListener('gameOver', () => {
   gameOverPopup.classList.remove('hidden');
   clearInterval(gameInterval);

   document.removeEventListener('hasBeenDropped', dropTetromino);
   document.removeEventListener('cleaningMeansScores', cleaning);
})