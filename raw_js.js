/*
==============================
Decleration of variables
==============================
*/

const winningPatterns = [
  [1, 2, 3],
  [1, 5, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9],
];

const menu = document.querySelector('[data-id = "menu"]');
const menuItems = document.querySelector('[data-id = "menu-items"]');
const resetBtn = document.querySelector('[data-id = "reset-btn"]');
const newRoundBtn = document.querySelector('[data-id = "new-round-btn"]');
const squares = document.querySelectorAll('[data-id = "square"]');
const modal = document.querySelector('[data-id = "modal"]');
const modalText = document.querySelector('[data-id = "modal-text"]');
const modalBtn = document.querySelector('[data-id = "modal-btn"]');
const turn = document.querySelector('[data-id = "turn"]');

let moves = [];

/*
=======================
toggle menu buttons
=======================
*/

menu.addEventListener("click", () => {
  menuItems.classList.toggle("hidden");
});

/*
=====================================
Function to check Game Status
=====================================
*/

let p1Moves = [];
let p2Moves = [];

function getGameStatus(moves) {
  p1Moves = moves
    .filter((move) => move.playerId === 1)
    .map((move) => +move.squareId);

  p2Moves = moves
    .filter((move) => move.playerId === 2)
    .map((move) => +move.squareId);

  let winner = null;

  winningPatterns.forEach((pattern) => {
    const p1Wins = pattern.every((v) => p1Moves.includes(v));
    const p2Wins = pattern.every((v) => p2Moves.includes(v));

    if (p1Wins) winner = 1;
    if (p2Wins) winner = 2;
  });

  return {
    status: moves.length === 9 || winner != null ? "complete" : "in-progress",
    winner,
  };
}

/*
=======================
Game Board Function
=======================
*/

// Function to get the opposite player

squares.forEach((square) => {
  square.addEventListener("click", (event) => {
    //To check whether the square is already filled
    const isFilled = (squareId) => {
      const existingMove = moves.find((move) => move.squareId === squareId);
      return existingMove !== undefined;
    };

    if (isFilled(+square.id)) {
      return;
    }

    const lastMove = moves.at(-1);
    // console.log(lastMove);

    const getOtherPlayer = (playerId) => (playerId === 1 ? 2 : 1);

    const currentPlayer =
      moves.length === 0 ? 1 : getOtherPlayer(lastMove.playerId);

    const nextPlayer = getOtherPlayer(currentPlayer);

    // console.log(currentPlayer);

    const squareIcon = document.createElement("i");
    const turnIcon = document.createElement("i");
    const turnLabel = document.createElement("p");
    turnLabel.innerText = `Player ${nextPlayer}, you're up`;

    if (currentPlayer === 1) {
      squareIcon.classList.add("fa-solid", "fa-x", "yellow");
      turnIcon.classList.add("fa-solid", "fa-o", "turquoise");
      turnLabel.classList = "turquoise";
    } else {
      squareIcon.classList.add("fa-solid", "fa-o", "turquoise");
      turnIcon.classList.add("fa-solid", "fa-x", "yellow");
      turnLabel.classList = "yellow";
    }

    turn.replaceChildren(turnIcon, turnLabel);

    moves.push({
      squareId: +square.id,
      playerId: currentPlayer,
    });

    // console.log(moves);

    square.replaceChildren(squareIcon);

    const result = getGameStatus(moves);

    if (result.status === "complete") {
      modal.classList.toggle("hidden");

      let message = "";

      if (result.winner) {
        message = `Player ${result.winner} wins!`;
      } else {
        message = `Game ends in a tie`;
      }

      modalText.textContent = message;
    }

    getGameStatus(moves);
  });
});

/*
=======================
Play Again Button
=======================
*/

modalBtn.addEventListener("click", (event) => {
  moves = [];
  squares.forEach((square) => square.replaceChildren());
  modal.classList.add("hidden");
});
