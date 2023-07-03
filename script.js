const Gameboard = (() => {
    let gameBoard = [];

    const initializeBoard = () => {
        gameBoard = Array(9).fill(null);
    }

    const updateCell = (index, symbol) => {
        gameBoard[index] = symbol;
    }

    // additional methods for checking win/draw conditions

    return {
        initializeBoard,
        updateCell,
        // Expose other necessary methods
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