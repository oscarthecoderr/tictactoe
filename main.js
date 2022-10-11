const cells = document.querySelectorAll(".cell"); // .querySelectorAll creates an array that we'll loop through. theres multiple .cell classes.
const statusText = document.querySelector("#statusText"); //id statusText will be reassigned to statusText for convenience
const X = '<img src="ceviche.png">'
const O = '<img src="incakola.png">'
document.querySelector("#restartBtn").addEventListener("click", restartGame);
let currentPlayer = "X";
let gameIsOver = false;
let moves = 0;
let phrases = [
  `your turn, ${currentPlayer}`,
  `come on, ${currentPlayer}`,
  `dont give up ${currentPlayer}`,
];

cells.forEach((cell) => cell.addEventListener("click", cellClicked)); // => = function(){}..  .forEachMethod on the cells array -- each parameter

function cellClicked(e) { 
  if (e.target.classList.value === '') {// the classList disappears on the second click so it shouldnt override it on the second click. 
    return; // if the cell has already have a X or O inside , dont override it.
  }
  if (currentPlayer === "X" && !gameIsOver) {
    e.target.innerHTML = X;
    e.target.style.background = "red";
    currentPlayer = "O"; // if board not full, continue playing. currentPlayer = x switches to currentPlayer = O
  } else {
    e.target.style.background = "green";
    e.target.innerHTML = O;
    currentPlayer = "X";
  }
  statusText.innerText = phrases[Math.floor(Math.random() * phrases.length)];
  moves++;
  let game = [
    [cells[0].innerHTML, cells[1].innerHTML, cells[2].innerHTML],
    [cells[3].innerHTML, cells[4].innerHTML, cells[5].innerHTML],
    [cells[6].innerHTML, cells[7].innerHTML, cells[8].innerHTML],
  ]; // creating an array of arrays to loop through.
  checkForWin(game);
}
function checkForWin(game) {
  for (let i = 0; i < game.length; i++) {
    let oWins =
      (game[0][i] === O && game[1][i] === O && game[2][i] === O) || //vertical win
      (game[i][0] === O && game[i][1] === O && game[i][2] === O) || //horizontal win
      (game[0][0] === O && game[1][1] === O && game[2][2] === O) || //diagonal wins
      (game[0][2] === O && game[1][1] === O && game[2][0] === O);

    let xWins =
      (game[0][i] === X && game[1][i] === X && game[2][i] === X) || //vertical win
      (game[i][0] === X && game[i][1] === X && game[i][2] === X) || //horizontal win
      (game[0][0] === X && game[1][1] === X && game[2][2] === X) || //diagonal wins
      (game[0][2] === X && game[1][1] === X && game[2][0] === X);

    if (oWins) {
      gameIsOver = true;
      statusText.innerText = "player O wins";
      lightUp();
    }
    if (xWins) {
      gameIsOver = true;
      statusText.innerText = "player X wins";
      lightUp();
    }
    if (moves === 9) {
      statusText.innerText = "its a tie";
    }
  }
}

function restartGame() {
  cells.forEach((cell) => {
    cell.style.background = "transparent"; // clear the style color background.
    cell.innerText = ""; // clear the board
  });
  gameIsOver = false;
  currentPlayer = "X";
  statusText.innerText = "";
  moves = 0; //REACT
}

function lightUp() {
  cells.forEach((cell) => (cell.style.background = "gold"));
}
