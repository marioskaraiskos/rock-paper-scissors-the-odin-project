document.addEventListener("DOMContentLoaded", () => {
    const playerImages = document.querySelectorAll('.left-elements .img');
    const computerImages = document.querySelectorAll('.right-elements .img');

    const playerScoreEl = document.querySelector('.player-score');
    const computerScoreEl = document.querySelector('.computer-score');
    const resultEl = document.querySelector('.result');
    const messageEl = document.querySelector('.text h4');
    const restartBtn = document.getElementById('restart-btn');

    let playerScore = 0;
    let computerScore = 0;
    let gameOver = false;

    function resetBorders() {
        playerImages.forEach(img => img.classList.remove('selected'));
        computerImages.forEach(img => img.classList.remove('selected'));
    }

    function getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * computerImages.length);
        return computerImages[randomIndex];
    }

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) return "draw";
        if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "scissors" && computerChoice === "paper") ||
            (playerChoice === "paper" && computerChoice === "rock")
        ) return "player";
        return "computer";
    }

    function updateColors(winner) {
        if (winner === "player") {
            resultEl.style.color = "blue";
            messageEl.style.color = "blue";
        } else if (winner === "computer") {
            resultEl.style.color = "red";
            messageEl.style.color = "red";
        } else {
            resultEl.style.color = "grey";
            messageEl.style.color = "grey";
        }
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        gameOver = false;
        playerScoreEl.textContent = playerScore;
        computerScoreEl.textContent = computerScore;
        resultEl.textContent = "Draw";
        messageEl.textContent = "";
        resultEl.style.color = "black";
        messageEl.style.color = "black";
        restartBtn.style.display = "inline-block";
        resetBorders();
    }

    function endGame(winner) {
        gameOver = true;
        messageEl.style.fontSize = "36px";
        messageEl.style.fontWeight = "bold";
        messageEl.textContent = `${winner.toUpperCase()} WINS THE GAME! 🎉`;
        messageEl.style.color = winner === "Player" ? "blue" : "red";
        resultEl.style.color = messageEl.style.color;
        restartBtn.textContent = "Play Again";
        restartBtn.style.display = "inline-block";
    }

    restartBtn.addEventListener('click', resetGame);

    resetGame(); // initialize

    playerImages.forEach(img => {
        img.addEventListener('click', () => {
            if (gameOver) return;

            resetBorders();
            img.classList.add('selected');

            const playerChoice = img.dataset.choice;
            const computerImg = getComputerChoice();
            computerImg.classList.add('selected');
            const computerChoice = computerImg.dataset.choice;

            const winner = determineWinner(playerChoice, computerChoice);

            if (winner === "player") {
                playerScore++;
                resultEl.textContent = "Player Wins";
                messageEl.textContent = `You win this round! ${playerChoice} beats ${computerChoice}.`;
            } else if (winner === "computer") {
                computerScore++;
                resultEl.textContent = "Computer Wins";
                messageEl.textContent = `Computer wins this round! ${computerChoice} beats ${playerChoice}.`;
            } else {
                resultEl.textContent = "Draw";
                messageEl.textContent = `It's a draw! You both chose ${playerChoice}.`;
            }

            updateColors(winner);
            playerScoreEl.textContent = playerScore;
            computerScoreEl.textContent = computerScore;

            if (playerScore >= 10) endGame("Player");
            else if (computerScore >= 10) endGame("Computer");
        });
    });
});
