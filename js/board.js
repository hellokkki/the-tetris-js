
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

    cleanRows() {
     let score = 0; 
      this.grid.forEach((row, rowIndex) => {
      if (row.every(cell => cell.occupied === true)) {
        for (let i = rowIndex; i > 0; i--) {
            this.grid[i] = this.grid[i - 1];
        }
        this.grid[row] = Array(this.columns).fill(defaultCell);

        score++;
        const cleaning = new CustomEvent('cleaningMeansScores', { detail: { score: score } } );
        document.dispatchEvent(cleaning);
      }

      for (let row = this.height - 2; row >= 0; row--) {
        for (let col = 0; col < this.width; col++) {
          const cell = this.grid[row][col]
          if (cell.occupied && !this.grid[row + 1][col].occupied) {
            // Move the tetromino block down
            this.grid[row + 1][col] = cell
            this.grid[row][col] = defaultCell
          }
        }
      }
      })
    }

}

