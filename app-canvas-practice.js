console.log('app-TEST.js loaded');

///////////// ATTEMPTING USE OF CANVAS API /////////////////
/*

Canvas Tutorials:
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
http://html5.litten.com/moving-shapes-on-the-html5-canvas-with-the-keyboard/

*/


/////global variables/////
var canvas;
var ctx;
var dx = 5;
var dy = 5;
var p1positionX = 10;
var p1positionY = 305;
var p2positionX = 580;
var p2positionY = 275;
var WIDTH = 600;
var HEIGHT = 600;
/////////////////////////

function player1(p1positionX, p1positionY, r) {  //creates player1 marker
ctx.beginPath();
ctx.arc(p1positionX, p1positionY, r, 0, Math.PI*2, true);
ctx.fill();
}

function player2(p2positionX, p2positionY, r) {  //creates player2 marker
ctx.beginPath();
ctx.arc(p2positionX, p2positionY, r, 0, Math.PI*2, true);
ctx.fill();
}


function rect(p1positionX,p1positionY, w, h) {  //maze for player1
ctx.beginPath();
ctx.rect(p1positionX, p1positionY, w, h);
ctx.closePath();
ctx.fill();
ctx.stroke();
}

function clear() { //rectangle container for maze
ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() { //reference to canvas to allow draw
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
return setInterval(draw, 10);
}


//moving player 1 marker
function doKeyDown(p1){
  if (p1.keyCode === 68){
    console.log('moving p1 right');
    p1positionX += dx;
  }
  if (p1.keyCode === 65){
    console.log('moving p1 left');
    p1positionX -= dx;
  }
  if (p1.keyCode === 87){
    console.log('moving p1 up');
    p1positionY -= dy;
  }
  if (p1.keyCode === 83){
    console.log('moving p1 down');
    p1positionY += dy;
  }
}

function draw() {
  clear();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  rect(0,0,WIDTH,HEIGHT);                 //rect is maze rectangle container
  ctx.fillStyle = 'MediumVioletRed';      //player 1 marker color
  player1(p1positionX, p1positionY, 10);  //player 1 marker position
  ctx.fillStyle = 'YellowGreen';          //player 2 marker color
  player1(590, 275, 10);                  //player 2 marker position
}

init();
window.addEventListener('keydown',doKeyDown,true);




// //create player1
// function player1() {
//   ctx.fillStyle = 'deepPink';
//   ctx.arc(p1positionX, p1positionY, 10, 0, Math.PI*2, true)
// }
//
// function p1marker(x,y,w,h) {
//   ctx.beginPath();
//   ctx.arc(p1positionX, p1positionY, 10, 0, Math.PI*2, true);
//   ctx.closePath();
//   ctx.fill();
// }



// //create player2  (does not appear if function is positioned down????)
// var player2 = function(){
//   console.log('creating player2');
//   ctx.fillStyle = 'yellowGreen';
//   ctx.beginPath();
//   ctx.arc(p2positionX, p2positionY, 10, 0, Math.PI*2, true);
//   ctx.closePath();
//   ctx.fill();
// }
// player2();



/// PLAYER 1: D (RIGHT) A (LEFT) W (UP) S (DOWN)
/* from Ascii table: http://www.ascii-code.com/
D = 68, (right)
A = 65, (left)
W = 87, (up)
S = 83  (down)
*/
//
// window.addEventListener('keydown', movePlayer1, true);
//
// function movePlayer1(p1){
//   if (p1.keyCode === 68){
//     console.log('moving p1 right');
//     clearCanvas();
//     p1positionX +=5;
//   }
//   if (p1.keyCode === 65){
//     console.log('moving p1 left');
//   }
//   if (p1.keyCode === 87){
//     console.log('moving p1 up');
//   }
//   if (p1.keyCode === 83){
//     console.log('moving p1 down');
//   }
// }
//
// function clearCanvas() {
//   canvas.style.backgroundPositionX = p1positionX;
// }



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
