

const defaultCell = {
color: '#000',
occupied: false,
value: 0,
}

const board = ({ rows, columns }) => {
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
   
    }

    checkCollision(row, col) {
        const { shape } = this.tetromino
       for (let i = 0; i < shape.length; i++) {
         for (let j = 0; j < shape[i].length; j++) {
            const cellValue = shape[i][j];
            if (cellValue === 1) {
                console.log(j)
                console.log(col)
                console.log(row)
                const boardRow = row + i;
                const boardCol = col + j;
                console.log(boardCol)
                if (boardRow < 0 || boardRow >= this.grid.length || boardCol < 0 ||
                    boardCol >= this.grid[0].length || this.grid[boardRow][boardCol].occupied) {
                        return true;
                    }
            }
         }
       }

       return false
    }

}

