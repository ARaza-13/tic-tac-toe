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

    const updateCell = (index, symbol) => {
        board[index] = symbol;
    }

    return {
        initializeBoard,
        getBoard,
        getCellValue,
        updateCell,
    };
})();

const Player = (name, symbol) => {
    return { name, symbol };
};

const Game = (() => {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
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
        const cells = document.querySelectorAll('#game-board td');

        cells.forEach((cell, index) => {
            cell.textContent = gameboard.getCellValue(index) || '';
        });
    }

    const addCellEventListeners = () => {
        const cells = document.querySelectorAll('#game-board td');
        
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                handleCellClick(index);
            });
        });
    } 

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    // update gameboard based on clicked cell index
    const handleCellClick = (index) => {
        if (gameboard.getCellValue(index) === null) {
            gameboard.updateCell(index, currentPlayer.symbol);
            renderBoard();

            if (checkWin()) {
                console.log(`${currentPlayer.symbol} wins!`)
                // game is won
                // add logic to handle game over, display winner, etc.
            } else if (checkTie()) {
                console.log("It's a tie")
                // game is tie
                // add logic to handle game over, display tie, etc.
            } else {
                switchPlayer();
            }
        }
    }

    return {
        initialize,
    }
})();

Game.initialize();