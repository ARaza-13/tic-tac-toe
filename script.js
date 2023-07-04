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
    let currentPlayer = player1;

    // instance of Gameboard module
    const gameboard = Gameboard;

    // update gameboard based on clicked cell index
    const handleCellClick = (index) => {
        if (gameboard.getCellValue(index) === null) {
            gameboard.updateCell(index, currentPlayer.getSymbol());
        }
    }

    return {
        handleCellClick,
    }
})();