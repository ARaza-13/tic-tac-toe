const Gameboard = (() => {
    let board = [];

    const initializeBoard = () => {
        board = Array(9).fill(null);
    }

    const getBoard = () => {
        return board;
    }

    const getCellValue = (index) => {
        return board[index];
    }

    const updateBoard = (index, symbol) => {
        board[index] = symbol;
    }

    return {
        initializeBoard,
        getBoard,
        getCellValue,
        updateBoard,
    };
})();

const Player = (name, symbol) => {
    return { name, symbol };
};

const Game = (() => {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    const cells = document.querySelectorAll('#game-board td');
    let currentPlayer;
    let gameboard;

    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        for (let combiantion of winningCombinations) {
            const [a, b, c] = combiantion;
            const cellA = gameboard.getCellValue(a);
            const cellB = gameboard.getCellValue(b);
            const cellC = gameboard.getCellValue(c);

            if (cellA && cellA === cellB && cellA === cellC) {
                return cellA; // return winning player's symbol
            }
        }

        return null; // if no winning combination is found
    }

    const checkTie = () => {
        for (let value of gameboard.getBoard()) {
            if (value === null) {
                return false; // Game is not a tie yet
            }
        }

        return true; // Game is a tie
    }

    // instance of Gameboard module
    const initialize = () => {
        gameboard = Gameboard;
        gameboard.initializeBoard();
        currentPlayer = player1;
        renderBoard();
        addCellEventListeners();
    }

    const renderBoard = () => {
        cells.forEach((cell, index) => {
            cell.textContent = gameboard.getCellValue(index) || '';
        });
    }

    const addCellEventListeners = () => {
        cells.forEach((cell) => {
            cell.addEventListener('click', handleCellClick);
        });
    } 

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    // update gameboard based on clicked cell index
    const handleCellClick = (event) => {
        const cellIndex = parseInt(event.target.dataset.index);

        if (gameboard.getBoard()[cellIndex] != null) {
            return; // if cell is already filled, ignore click
        }

        gameboard.updateBoard(cellIndex, currentPlayer.symbol);
        renderBoard();

        if (checkWin()) {
            console.log(`${currentPlayer.symbol} wins!`);
            endGame();
            return;
            // game is won
            // add logic to handle game over, display winner, etc.
        } else if (checkTie()) {
            console.log("It's a tie");
            endGame();
            return;
            // game is tie
            // add logic to handle game over, display tie, etc.
        } else {
            switchPlayer();
        }
        
    }

    const endGame = () => {
        cells.forEach((cell) => {
            cell.removeEventListener("click", handleCellClick);
        });
    }

    return {
        initialize,
    }
})();

const game = Game;
game.initialize();