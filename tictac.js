var origBoard;
var diff = "1";
//var lvl;
var huPlayer;
var aiPlayer;
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
const box = document.querySelectorAll('.score');
startGame();

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
  var x = document.getElementById("r1").checked;
  if(x==true){
     huPlayer = 'O';
     aiPlayer = 'X';
  }
  else{
     huPlayer = 'X';
     aiPlayer = 'O';
  }
  setLevel();
}

function setLevel(lvl){
  if(lvl=="3") diff=3;
  else if(lvl=="2") diff=2;
  else if(lvl=="1") diff=1;
  else if (localStorage.level) {
      diff = window.localStorage.getItem("level");
  } 
  else {
  console.log("SELECT A LEVEL");
  }
  window.localStorage.setItem("level", diff);
	document.getElementById("btn1").style.backgroundColor = "#4CAF50";
document.getElementById("btn2").style.backgroundColor = "#4CAF50";
document.getElementById("btn3").style.backgroundColor = "#4CAF50";
if(diff == 1)document.getElementById("btn1").style.backgroundColor = "grey";
else if(diff == 2)document.getElementById("btn2").style.backgroundColor = "grey";
else if(diff == 3)document.getElementById("btn3").style.backgroundColor = "grey";

  //document.getElementsByClick("btn").style.removeProperty('background-color');
}
function resetScore(){
  for (var i = 0; i < box.length; i++) {
		box[i].innerText = 0;
	}
}
function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer)&&!checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
  for (var i = 0; i < cells.length; i++) {
		cells[i].style.removeProperty('background-color');
	}
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}
function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}
function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "LightGreen" : "DarkTurquoise";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
  declareWinner(gameWon.player == huPlayer ? "Congratulations!\n You WON" : "Oops!\n Try Again");
  if(gameWon.player == huPlayer) box[0].innerText++;
  else
    box[1].innerText++;
}
function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}
function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	if(diff==1)
    return emptySquares()[0];
  else if(diff==3)
    return minimax(origBoard, aiPlayer).index;
  else
    return mini(origBoard, aiPlayer).index;
}

function checkTie() {
  if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "beige";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("TIE!")
		return true;
	}
	return false;
}
function minimax(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
function hint(){
  if(diff==3){
  var h = minimax(origBoard, huPlayer).index;
  //origBoard[squareid] = huPlayer;
	//document.getElementById(squareid).innerText = huPlayer;
  cells[h].style.backgroundColor = "pink";
  }
}

function mini(newBoard, player) {
	var availSpots = emptySquares();

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = mini(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = mini(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}
  //var bestMove;
	var bestMove = generateRandomNumber(0, moves.length);
	if(player == aiPlayer) {
		var bestScore = 10;
    //var flag=0;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score == bestScore) {
				//bestScore = moves[i].score;
				bestMove = i;
        break;
			}
      }
      /*else {
        bestMove = generateRandomNumber(0, moves.length);
      }*/
	} else {
		var bestScore = -10;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score == bestScore) {
				//bestScore = moves[i].score;
				bestMove = i;
        break;
			}
      /*else if (moves[i].score == 0) {
        bestMove = i;
      }*/
		}
	}

	return moves[bestMove];
}
const generateRandomNumber = (min, max) =>  {
return Math.floor(Math.random() * (max - min) + min);
  };
