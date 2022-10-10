const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText')
document.querySelector('#restartBtn').addEventListener('click',restartGame)
let currentPlayer = 'X';
let boardIsFull = false;

cells.forEach(cell => cell.addEventListener('click',cellClicked))

function cellClicked(e){
  if(e.target.innerText === 'X' || e.target.innerText === 'O'){
    return;
   }
 if(currentPlayer === 'X' && !boardIsFull){
  e.target.innerText = currentPlayer 
  currentPlayer = 'O'
  }else if(currentPlayer === 'O' && !boardIsFull){
    e.target.innerText = currentPlayer 
  currentPlayer = 'X'
 } 
 let phrases =[
  `your turn, ${currentPlayer}`, 
  `come on, ${currentPlayer}`,
  `dont give up ${currentPlayer}`,
] 
 statusText.innerText = phrases[Math.floor(Math.random() * phrases.length)]
 
 let game = [
  [cells[0].innerText,cells[1].innerText,cells[2].innerText],
  [cells[3].innerText,cells[4].innerText,cells[5].innerText],
  [cells[6].innerText,cells[7].innerText,cells[8].innerText],
 ]
  checkForWin(game)
 
}
function checkForWin(game){
 
  for(let i = 0 ; i < game.length ; i++){
    let oWins = (game[0][i]=== 'O' && game[1][i] === 'O' && game[2][i]=== 'O') || //vertical win
     (game[i][0]=== 'O' && game[i][1] === 'O' && game[i][2]=== 'O') || //horizontal win
     (game[0][0]=== 'O' && game[1][1] === 'O' && game[2][2]=== 'O') || //diagonal wins
     (game[0][2]=== 'O' && game[1][1] === 'O' && game[2][0]=== 'O')

     let xWins = (game[0][i]=== 'X' && game[1][i] === 'X' && game[2][i]=== 'X') || //vertical win
     (game[i][0]=== 'X' && game[i][1] === 'X' && game[i][2]=== 'X') || //horizontal win
     (game[0][0]=== 'X' && game[1][1] === 'X' && game[2][2]=== 'X') || //diagonal wins
     (game[0][2]=== 'X' && game[1][1] === 'X' && game[2][0]=== 'X')
    if(oWins){
      boardIsFull = true
      statusText.innerText = 'player O wins'
      lightUp()
    } if (xWins){
      boardIsFull = true
      statusText.innerText =  'player X wins'
      lightUp()
    }
  }
}

function restartGame(){
  cells.forEach((cell)=>{
    cell.style.background = 'transparent'
    cell.innerText = ''
})
boardIsFull= false
currentPlayer = 'X'
}

function lightUp(){
  cells.forEach(cell => cell.style.background = 'gold')
}
