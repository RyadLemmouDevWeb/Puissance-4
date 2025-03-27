class Puissance4 {
   constructor() {
       this.rows = 6; 
       this.cols = 7; 
       this.players = [
           { id: 1, color: '#ff4444' }, 
           { id: 2, color: '#ffd700' }  
       ];
       this.currentPlayer = this.players[0];
       this.board = this.createBoard();
       this.gameOver = false;
       this.scores = { 1: 0, 2: 0 };
       this.init();
   }

   createBoard() {
       return Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
   }

   init() {
       this.setupConfigForm();
   }

   setupConfigForm() {
       const startButton = document.getElementById('start-game');
       startButton.addEventListener('click', () => {
           this.rows = parseInt(document.getElementById('rows').value);
           this.cols = parseInt(document.getElementById('cols').value);
           this.players[0].color = document.getElementById('player1-color').value;
           this.players[1].color = document.getElementById('player2-color').value;

           document.getElementById('config').style.display = 'none';

           this.startGame();
       });

       const resetSettingsButton = document.getElementById('reset-settings');
       resetSettingsButton.addEventListener('click', () => this.resetSettings());
   }

   resetSettings() {
       document.getElementById('config').style.display = 'block';
       document.getElementById('game').innerHTML = '';
       document.getElementById('turn-indicator').textContent = '';
       document.getElementById('victory-message').textContent = '';
   }

   startGame() {
       this.board = this.createBoard();
       this.currentPlayer = this.players[0];
       this.gameOver = false;
       this.renderBoard();
       this.updateTurnIndicator();
       this.setupEventListeners();
   }

   renderBoard() {
       const gameElement = document.getElementById('game');
       gameElement.innerHTML = '';
       gameElement.style.gridTemplateColumns = `repeat(${this.cols}, 70px)`;
       gameElement.style.gridTemplateRows = `repeat(${this.rows}, 70px)`;

       for (let row = 0; row < this.rows; row++) {
           for (let col = 0; col < this.cols; col++) {
               const cell = document.createElement('div');
               cell.classList.add('cell');
               cell.dataset.row = row;
               cell.dataset.col = col;
               cell.addEventListener('click', () => this.handleCellClick(col));

               if (this.board[row][col] !== 0) {
                   cell.style.backgroundColor = this.players[this.board[row][col] - 1].color;
               }

               gameElement.appendChild(cell);
           }
       }
   }

   handleCellClick(col) {
       if (this.gameOver) return;

       const row = this.getLowestEmptyRow(col);
       if (row === -1) return;

       this.animateDirectFall(col, row, () => {
           this.board[row][col] = this.currentPlayer.id;
           this.renderBoard();

           if (this.checkWin(row, col)) {
               this.gameOver = true;
               this.scores[this.currentPlayer.id]++;
               this.showVictoryMessage();
               return;
           }

           this.switchPlayer();
       });
   }

   animateDirectFall(col, row, callback) {
       const gameElement = document.getElementById('game');
       const targetCell = gameElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
       const gridRect = gameElement.getBoundingClientRect();
       const cellRect = targetCell.getBoundingClientRect();
       const tempPion = document.createElement('div');
       tempPion.style.width = '70px';
       tempPion.style.height = '70px';
       tempPion.style.backgroundColor = this.currentPlayer.color;
       tempPion.style.borderRadius = '50%';
       tempPion.style.position = 'fixed'; 
       tempPion.style.top = `${gridRect.top}px`; 
       tempPion.style.left = `${cellRect.left}px`; 
       tempPion.style.transition = 'top 0.3s ease-in-out'; 
       document.body.appendChild(tempPion);

       setTimeout(() => {
           tempPion.style.top = `${cellRect.top}px`; 
       }, 10);

       setTimeout(() => {
           document.body.removeChild(tempPion);
           callback();
       }, 310); 
   }

   getLowestEmptyRow(col) {
       for (let row = this.rows - 1; row >= 0; row--) {
           if (this.board[row][col] === 0) {
               return row;
           }
       }
       return -1;
   }

   checkWin(row, col) {
       const directions = [
           [1, 0], 
           [0, 1],
           [1, 1],
           [1, -1] 
       ];

       for (const [dx, dy] of directions) {
           let count = 1;
           count += this.countDirection(row, col, dx, dy);
           count += this.countDirection(row, col, -dx, -dy);
           if (count >= 4) {
               return true;
           }
       }
       return false;
   }

   countDirection(row, col, dx, dy) {
       let count = 0;
       let x = row + dx;
       let y = col + dy;

       while (x >= 0 && x < this.rows && y >= 0 && y < this.cols && this.board[x][y] === this.currentPlayer.id) {
           count++;
           x += dx;
           y += dy;
       }
       return count;
   }

   switchPlayer() {
       this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
       this.updateTurnIndicator();
   }

   updateTurnIndicator() {
       const turnIndicator = document.getElementById('turn-indicator');
       turnIndicator.textContent = `Tour du joueur ${this.currentPlayer.id} - Scores: J1: ${this.scores[1]}, J2: ${this.scores[2]}`;
   }

   showVictoryMessage() {
       const victoryMessage = document.getElementById('victory-message');
       victoryMessage.textContent = `Le joueur ${this.currentPlayer.id} a gagné !`;
       this.updateTurnIndicator();
   }

   resetGame() {
       this.board = this.createBoard();
       this.currentPlayer = this.players[0];
       this.gameOver = false;
       this.renderBoard();
       this.updateTurnIndicator();
       const victoryMessage = document.getElementById('victory-message');
       victoryMessage.textContent = '';
   }

   resetScore() {
       this.scores = { 1: 0, 2: 0 };
       this.updateTurnIndicator();
   }

   setupEventListeners() {
       document.getElementById('reset-game').addEventListener('click', () => this.resetGame());
       document.getElementById('reset-score').addEventListener('click', () => this.resetScore());
   }
}

const game = new Puissance4();