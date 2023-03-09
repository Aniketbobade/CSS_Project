const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".heading");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

let fillCount=0;

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

function initGame() {
   
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    // intialize the css property all boxes
    box.classList = `box box${index+1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `current player- ${currentPlayer}`;
}
initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `current player- ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
  winningPositions.forEach((position) => {
    //    main logic
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] == gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }
      //disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //now we know X/O is a winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  // if we have winner
  if (answer !== "") {
    gameInfo.innerText = `Winner Player ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }
  // if we don't have a winner, check for tie
//   let fillCount = 0;
//   gameGrid.forEach((index) => {
//     if (gameGrid[index] === "X" || gameGrid[index]=="0") fillCount++;
//   });

  //board is Filled, game is TIE
  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}

function clickHandle(index) {
  if (gameGrid[index] === "") {
    fillCount++;
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    // change the player to play turn
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    clickHandle(index);
  });
});

newGameBtn.addEventListener("click", initGame);
