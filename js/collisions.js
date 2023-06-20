import { mergeShapeWithBoard } from "./tetrominoes.js";

export function checkCollision(shape, board, row, col) {
  const numRows = shape.length
  const numCols = shape[0].length

   for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cellValue = shape[i][j]
      if (cellValue === 1) {
        const boardRow = row + i
        const boardCol = col + j
        if (boardRow < 0 || boardRow >= board.length || boardCol < 0 ||
            boardCol >= board[0].length || board[boardRow][boardCol].occupied) {
          return true
        }
      }
    }
  }

    return false
}

export const canMoveDown = (shape, color, board, row, col) => {
    if (checkCollision(shape, board, row + 1, col)) {
        mergeShapeWithBoard(shape, color, board, row, col);
        const dropEvent = new CustomEvent('hasBeenDropped');
        document.dispatchEvent(dropEvent);
    } else {
        return !checkCollision(shape, board, row, col)
    }
};
export const canMoveLeft = (shape, board, row, col) => !checkCollision(shape, board, row, col - 1);
export const canMoveRight = (shape, board, row, col) => !checkCollision(shape, board, row, col + 1);