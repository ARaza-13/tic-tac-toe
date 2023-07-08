const Gameboard = (() => {
    let board = [null, null, null, null, null, null, null, null, null];

    const getBoard = () => {
        return board;
    }

    const updateBoard = (index, symbol) => {
        board[index] = symbol;
    }

    const resetBoard = () => {
        board = [null, null, null, null, null, null, null, null, null];
    }

    return {
        getBoard,
        updateBoard,
        resetBoard,
    };
})();

const Player = (name, symbol) => {
    return { name, symbol };
};

const Game = (() => {
    const gameboard = Gameboard;
    const cells = document.querySelectorAll('#game-board td');
    let player1, player2, currentPlayer;

    // update gameboard based on clicked cell index
    const handleCellClick = (event) => {
        const cellIndex = parseInt(event.target.dataset.index);

        if (gameboard.getBoard()[cellIndex] != null) {
            return; // if cell is already filled, ignore click
        }

        gameboard.updateBoard(cellIndex, currentPlayer.symbol);
        event.target.textContent = currentPlayer.symbol;

        if (checkWin()) {
            console.log(`${currentPlayer.name} wins!`);
            endGame();
            return;
        } else if (checkTie()) {
            console.log("It's a tie");
            endGame();
            return;
        } else {
            switchPlayer();
        }
        
    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const checkWin = () => {
        const board = gameboard.getBoard();

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let combiantion of winningCombinations) {
            const [cellA, cellB, cellC] = combiantion;
            if (board[cellA] != null && 
                board[cellA] === board[cellB] && 
                board[cellA] === board[cellC]) {
                return true; // win detected
            }
        }

        return false; // if no winning combination is found
    }

    const checkTie = () => {
        for (let value of gameboard.getBoard()) {
            if (value === null) {
                return false; // Game is not a tie yet
            }
        }

        return true; // Game is a tie
    }

    const endGame = () => {
        cells.forEach((cell) => {
            cell.removeEventListener("click", handleCellClick);
        });
    }

    const startGame = () => {
        const player1Name = document.getElementById("player1-name").value;
        const player1Symbol = document.getElementById("player1-symbol").value;
        const player2Name = document.getElementById("player2-name").value;
        const player2Symbol = document.getElementById("player2-symbol").value;

        if (validateInputs(player1Name, player1Symbol, player2Name, player2Symbol)) {
            player1 = Player(player1Name, player1Symbol);
            player2 = Player(player2Name, player2Symbol);
            currentPlayer = player1;

            gameboard.resetBoard();
            cells.forEach((cell) => {
                cell.textContent = "";
                cell.addEventListener('click', handleCellClick);
            });
        }
    }

    const validateInputs = (name1, symbol1, name2, symbol2) => {
        if (symbol1 === symbol2) {
            console.log("Player 1 and 2 cannot have the same symbol");
            return false;
        }
        if (name1.trim() === "" || name2.trim() === "") {
            console.log("Please have a name entered for both players");
            return false;
        }
        return true;
    }

    const initialize = () => {
        const startButton = document.getElementById('start-button');
        startButton.addEventListener('click', startGame);
    }

    return {
        initialize,
    }
})();

const game = Game;
game.initialize();