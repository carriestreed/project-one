console.log('app.js loaded');

///////////// ATTEMPTING USE OF CANVAS API /////////////////
/*
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
*/

//global variables
var canvas        = document.querySelector('#canvas');
    ctx           = canvas.getContext('2d');
    p1positionX   = 10;
    p1positionY   = 315;
    p2positionX   = 590;
    p2positionY   = 285;


//initialize game
function init(){

}

//create player2  (does not appear if function is positioned down????)
var player2 = function(){
  console.log('creating player2');
  ctx.fillStyle = 'yellowGreen';
  ctx.beginPath();
  ctx.arc(p2positionX, p2positionY, 10, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}
player2();

//create player1
function player1(){
  console.log('creating player1');
  ctx.fillStyle = 'deepPink';
  ctx.beginPath();
  ctx.arc(p1positionX, p1positionY, 10, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}
player1();



/// PLAYER 1: D (RIGHT) A (LEFT) W (UP) S (DOWN)
/* from Ascii table: http://www.ascii-code.com/
D = 68, (right)
A = 65, (left)
W = 87, (up)
S = 83  (down)
*/

window.addEventListener('keydown', movePlayer1, true);

function movePlayer1(p1){
  if (p1.keyCode === 68){
    console.log('moving p1 right');
    clearCanvas;
    p1positionX +=5;
  }
  if (p1.keyCode === 65){
    console.log('moving p1 left');
  }
  if (p1.keyCode === 87){
    console.log('moving p1 up');
  }
  if (p1.keyCode === 83){
    console.log('moving p1 down');
  }
}

function clearCanvas() {

canvas.width = canvas.width;

}



//check for boundaries
// function checkCanMove(){
//   console.log('checking if player can move');
// }










////////////// PREVIOUS CODE (before canvas) ////////////////////

//////// WELCOME WINDOW BOX
/// GIVE SHORT GAME INSTRUCTIONS
/// PROMPT USERS TO SELECT MARKER
/// PLAYERS PRESS START
/// WINDOW BOX CLOSES
/// PLAYERS BEGIN GAME


//////// SET GAME MARKERS' FUNCTIONALITY
/// KEYSTROKES DETERMINE MOVEMENT OF MARKERS



/*
document.onkeydown = movePlayer1;

function movePlayer1(marker){
    if (marker.keyCode === 68){ //moves marker Right
      checkCanMove();
      player1start +=5;
      player1.style.left = player1start + 'px';
    }
    if (marker.keyCode === 65){ //moves marker Left
      player1start -=5;
      player1.style.left = player1start + 'px';
    }
    if (marker.keyCode === 87) { //moves marker Up
      player1start -=5;
      player1.style.top = player1start + 'px';
    }
    if (marker.keyCode === 83) { //moves marker Down
      player1start +=5;
      player1.style.top = player1start + 'px';
    }
}

// todo: set player initit position in javascript, not css




/// PLAYER 2: ARROW LEFT, RIGHT, UP, DOWN
/* from Ascii table: http://www.ascii-code.com/
ARROW LEFT  = 37,
      RIGHT = 39,
      UP    = 38,
      DOWN  = 40
*/



/////// SET WALL BOUNDARIES
/// MARKERS CAN NOT PASS THROUGH BLACK WALLS


/////// SET WIN
/// FIRST PLAYER TO REACH OPPOSITE END WINS
/// (SET PLAYER 1 WIN LOCATION / PLAYER 2 WIN LOCATION)
/// WINDOW BOX ALERTS WHO IS THE WINNER
/// PROMPT TO PLAY AGAIN
