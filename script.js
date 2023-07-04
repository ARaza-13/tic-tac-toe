const Gameboard = (() => {
    let board = [];

    const initializeBoard = () => {
        board = Array(9).fill(null);
    }

    const getCellValue = (index) => {
        return board[index];
    }

    const updateCell = (index, symbol) => {
        board[index] = symbol;
    }

    // additional methods for checking win/draw conditions

    return {
        initializeBoard,
        getCellValue,
        updateCell,
    };
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {
        getName,
        getSymbol,
    };
};

const Game = (() => {
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    let currentPlayer;
    let gameboard;

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
    

    // update gameboard based on clicked cell index
    const handleCellClick = (index) => {
        console.log(index);
        console.log(gameboard.getCellValue(index))
        if (gameboard.getCellValue(index) === null) {
            gameboard.updateCell(index, currentPlayer.getSymbol());
            renderBoard();
        }
    }

    return {
        initialize,
    }
})();

Game.initialize();