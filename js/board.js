
export const defaultCell = {
color: '#000',
occupied: false,
value: 0,
}

export class Board {
    constructor(rows, columns, context) {
        this.tetromino = null;
        this.rows = rows;
        this.columns = columns;
        this.grid = Array.from({ length: rows }, 
            () => Array.from({ length: columns }, () => 
             ({...defaultCell}) 
             ));
        this.context = context
    }

    drawBoard() {
      this.grid.forEach(( row, rowIndex ) => 
      row.forEach(( cell, columnIndex ) => {
      if (!cell.occupied) {
          this.context.fillStyle = cell.color;
          this.context.fillRect(columnIndex, rowIndex, 1, 1);
      }
      })
      );
    }

    getEmptyBoard() {
        return Array.from(
            { length: this.rows }, () => Array(this.columns).fill(defaultCell)
        );
    }

    reset() {
        this.grid = this.getEmptyBoard();
    }

    setTetromino(tetromino) {
        this.tetromino = tetromino;
    }


    updateBoard() {
    //  const { shape, position } = this.tetromino;
  
    //  mergeShapeWithBoard(shape, this.grid, position.y, position.x)
    }

}

