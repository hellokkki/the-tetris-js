

const defaultCell = {
color: '#000',
occupied: false,
}

export const board = ({ rows, columns }) => {
    const buildRows = Array.from({ length: rows }, 
                      () => Array.from({ length: columns }, () => 
                       ({...defaultCell}) 
                       ));

    return buildRows
};

export class Board {
    constructor(rows, columns, context) {
        this.tetromino = null;
        this.rows = rows;
        this.columns = columns;
        this.grid = board({ rows, columns });
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

    setTetromino(value) {
        this.tetromino = value;
    }
}

