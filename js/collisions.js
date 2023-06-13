import { mergeShapeWithBoard } from "./tetrominoes.js";

function checkCollision(shape, board, row, col) {
    console.log(board)
   for (let i = 0; i < shape.length; i++) {
     for (let j = 0; j < shape[i].length; j++) {
        console.log(shape[i].length)
        const cellValue = shape[i][j];
        if (cellValue === 1) {
            const boardRow = row + i;
            const boardCol = col + j;
            console.log(boardCol)
            if (boardRow < 0 || boardRow >= board.length || boardCol < 0 ||
                boardCol >= board[0].length || board[boardRow][boardCol].occupied) {
                    return true;
                }
        }
     }
    }

    return false
}

export const canMoveDown = (shape, board, row, col) => {
    if (checkCollision(shape, board, row + 1, col)) {
        mergeShapeWithBoard(shape, board, row, col);
    } else {
        return !checkCollision(shape, board, row, col)
    }
};
export const canMoveLeft = (shape, board, row, col) => !checkCollision(shape, board, row, col - 1);
export const canMoveRight = (shape, board, row, col) => !checkCollision(shape, board, row, col + 1);