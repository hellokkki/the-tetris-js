import { mergeShapeWithBoard } from "./tetris/tetrominoes.js";

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
              console.log(shape, row, col)
              console.log(board[i][j].occupied)
          return true
        }
      }
    }
  }

    return false
}

function checkDownCollision (board, shape, shapeRow, shapeCol) {

  //  const tetrominoCells = shape.map(({ row, col }) => {
  //   row: row + shapeRow;
  //   col: col + shapeCol;
  //  })


   for (let i = 0; i < shape.length; i++) {
    const { row, col } = shape[i];
    if (row === board.rows - 1 || board[row + 1][col].occupied) {
      return true
    } 
   }

   return false
}

export const canMoveDown = (shape, color, board, row, col) => {
    if (checkCollision(shape, board, row + 1, col)) {
      mergeShapeWithBoard(shape, color, board, row, col);
      const dropEvent = new CustomEvent('hasBeenDropped');
      document.dispatchEvent(dropEvent);
    } 
    return !checkCollision(shape, board, row, col)
};
export const canMoveLeft = (shape, board, row, col) => !checkCollision(shape, board, row, col - 1);
export const canMoveRight = (shape, board, row, col) => !checkCollision(shape, board, row, col + 1);