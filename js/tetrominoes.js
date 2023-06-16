import { context } from "./tetris.js";
import { canvas } from "./tetris.js";
import { canMoveDown, canMoveLeft, canMoveRight } from "./collisions.js";
import { defaultCell } from "./board.js";

const random = new Math.seedrandom('1');

export const startPosition = { x: 4, y: 0 };

export const TETROMINOES = {
    I: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        color: '#12EDE2',
        position: startPosition
    },
    J: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ],
        color: '#ED9512',
        position: startPosition
    },
    L: {
        shape: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        color: '#2112ED',
        position: startPosition
    },
    O: {
        shape: [
           [1, 1],
           [1, 1],
           [0, 0]
        ],
        color: '#EDE012',
        position: startPosition
    },
    S: {
        shape: [
           [0, 1, 1],
           [1, 1, 0],
           [0, 0, 0]
        ],
        color: '#EE1C08',
        position: startPosition
    },
     Z: {
        shape: [
            [0, 0, 0],
            [1, 1, 0]
            [0, 1, 1]
        ],
        color: '#ED1212',
        position: startPosition
     },
     T: {
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: '#9412ED',
        position: startPosition
     }
}

export const pickRandomTetromino = () => {
    const keys = Object.keys(TETROMINOES);
    const index = Math.floor(random() * keys.length);
    console.log(index)
    const key = keys[index];
    return TETROMINOES[key];
};

export const mergeShapeWithBoard = (shape, color, board, row, col) => {
    const mergeEvent = new CustomEvent('hasBeenMerged');

    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
          const cellValue = shape[i][j];
          if (cellValue === 1) {
            // Set the corresponding cell on the board to the tetromino color
            // board[row + i][col + j].occupied = true;
            // board[row + i][col + j].value = 1;
            board[row + i][col + j] = {
                color: color,
                occupied: true,
                value: 1
            };
            document.dispatchEvent(mergeEvent);
          }
        }
      }
    }  
  


  export class Tetromino {
    constructor(context) {
        this.context = context;
        this.color = null;
        this.shape = null;
        this.position = null;
    }

    pickTeromino() {
        const { color, shape, position } = pickRandomTetromino();
        this.color = color;
        this.shape = shape;
        this.position = position
    }

    drawTetromino() {
        this.context.clearRect(0, 0, canvas.widht, canvas.height);
        this.context.fillStyle = this.color;
        this.shape.forEach((rows, y) => 
        rows.forEach((value, x) => {
            if (value > 0) {
                this.context.fillRect(this.position.x + x, this.position.y + y, 1, 1)
            }
        })
        )
    }

    moveTetromino(route, board) {
        switch (route) {
        case 'ArrowUp':
        
        break;
        case 'ArrowDown':
        if (canMoveDown(this.shape, this.color, board, this.position.y, this.position.x))
        this.position.y++
        break;
        case 'ArrowLeft':
        if (canMoveLeft(this.shape, board, this.position.y, this.position.x))
        this.position.x--
        console.log(this.position)
        break;
        case 'ArrowRight':
        if (canMoveRight(this.shape, board, this.position.y, this.position.x))
        this.position.x++
        break;
        }
    }
  }
