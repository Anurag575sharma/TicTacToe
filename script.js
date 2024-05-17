const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//initialising the game

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  newGameBtn.classList.remove("active");
  gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

initGame();
// newGameBtn.classList.add("active");

boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleClick(index));
});

function handleClick(index) {
  if (gameGrid[index] === "") {
    gameGrid[index] = currentPlayer;
    boxes[index].textContent = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    if (currentPlayer === "") return;
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
    let check = checkForWin();
    if (check) {
      newGameBtn.classList.add("active");
      if (currentPlayer === "X") {
        currentPlayer = "0";
      } else if (currentPlayer === "O") {
        currentPlayer = "X";
      }

      gameInfo.textContent = `Hari Bol ! ${currentPlayer} has won`;
      currentPlayer = "";
      return;
    } else {
      let tieCheck = true;
      gameGrid.forEach((box) => {
        if (box === "") {
          tieCheck = false;
        }
      });
      if (tieCheck) {
        gameInfo.textContent = `It's a tie`;
        newGameBtn.classList.add("active");
        currentPlayer = "";
        return;
      }
    }
  }
}
function checkForWin() {
  let win = false;
  winningPositions.forEach((position) => {
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      win = true;
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  return win;
}

newGameBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("win");
    box.style.pointerEvents = "auto";
  });
  initGame();
});
