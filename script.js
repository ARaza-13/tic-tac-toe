const Gameboard = (() => {
    let gameboard = [];

    const initializeBoard = () => {
        gameboard = Array(9).fill(null);
    }

    const updateCell = (index, symbol) => {
        gameboard[index] = symbol;
    }

    // additional methods for checking win/draw conditions

    return {
        initializeBoard,
        updateCell,
        // Expose other necessary methods
    }
})();