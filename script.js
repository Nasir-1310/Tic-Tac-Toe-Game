document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusMessage = document.getElementById("statusMessage");
    const playButton = document.getElementById("playButton");
    const newGameButton = document.getElementById("newGameButton");
    const gameBoard = document.getElementById("gameBoard");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = false;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function checkWinner() {
        for (const condition of winningCombinations) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                highlightWinningCells([a, b, c]);
                statusMessage.textContent = `${currentPlayer} Wins! 🎉`;
                newGameButton.style.display = "inline-block";
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            statusMessage.textContent = "Draw! 🤝";
            newGameButton.style.display = "inline-block";
        }
    }

    function highlightWinningCells(cellsIndexes) {
        cellsIndexes.forEach(index => {
            cells[index].classList.add("winner");
        });
    }

    function handleClick(event) {
        const index = event.target.getAttribute("data-index");

        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        checkWinner();

        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusMessage.textContent = `Turn: ${currentPlayer}`;
        }
    }

    function startGame() {
        board.fill("");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winner");
        });
        currentPlayer = "X";
        gameActive = true;
        statusMessage.textContent = "Turn: X";
        newGameButton.style.display = "none";

        // Show the game board
        gameBoard.classList.remove("hidden");

        // Hide Play button after starting
        playButton.style.display = "none";
    }

    playButton.addEventListener("click", startGame);
    newGameButton.addEventListener("click", startGame);
    cells.forEach(cell => cell.addEventListener("click", handleClick));
});
