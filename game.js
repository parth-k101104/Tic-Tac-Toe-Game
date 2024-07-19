document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll(".box");
    const overlay = document.querySelector(".overlay");
    const msgContainer = document.querySelector(".msg-container");
    const playAgain = document.querySelector("#new-btn");
    const resetButton = document.querySelector("#reset-btn");
    let turnO = true;
    let count = 0;

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true;
            count++;

            const isWinner = checkWinner();

            if (count === 9 && !isWinner) {
                gameDraw();
            }
        });
    });

    const gameDraw = () => {
        enableBoxes();
    };

    const resetGame = () => {
        turnO = true;
        count = 0; // Reset the count variable
        overlay.style.display = "none"; // Hide the overlay
        enableBoxes();
        msgContainer.classList.add("hide");
    };

    const disableBoxes = () => {
        boxes.forEach(box => {
            box.disabled = true;
        });
    };

    const enableBoxes = () => {
        boxes.forEach(box => {
            box.disabled = false; // Enable the boxes
            box.innerText = "";
            box.classList.remove("winner"); // Remove the winner class when resetting
        });
    };

    const showWinner = () => {
        msgContainer.classList.remove("hide");
    };

    const checkWinner = () => {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            const value1 = boxes[a].innerText;
            const value2 = boxes[b].innerText;
            const value3 = boxes[c].innerText;

            if (value1 && value1 === value2 && value1 === value3) {
                disableBoxes();
                showWinner();
                boxes[a].classList.add("winner");
                boxes[b].classList.add("winner");
                boxes[c].classList.add("winner");
                overlay.style.display = "flex"; // Show the overlay
                return true;
            }
        }
        return false; // Return false if no winner is found
    };

    resetButton.addEventListener("click", resetGame);
    playAgain.addEventListener("click", resetGame);
});
