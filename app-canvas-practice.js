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
var dx = 5;             //horizontal speed
var dy = 5;             //vertical speed
var circRadius  = 10;   //radius of circle
var p1positionX = 10;   //p1 horizontal position
var p1positionY = 305;  //p1 vertical position
var p2positionX = 590;  //p2 horizontal position
var p2positionY = 275;  //p2 vertical position
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


function rect(x, y, w, h) {  //maze canvas for p1
ctx.beginPath();
ctx.rect(x, y, w, h);
ctx.closePath();
ctx.fill();
ctx.stroke();
}


// function rect(p2positionX,p2positionY, w, h) {  //maze canvas for p2
// ctx.beginPath();
// ctx.rect(p2positionX, p2positionY, w, h);
// ctx.closePath();
// ctx.fill();
// ctx.stroke();
// }

function clear() { //allows to clear canvas (for movement)
ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() { //reference to canvas to allow draw
canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');
return setInterval(draw, 10);
}


//moving player 1 marker
/* from Ascii table: http://www.ascii-code.com/
D = 68, (right)
A = 65, (left)
W = 87, (up)
S = 83  (down)
*/
function moveP1(p1){
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

//moving player 2 marker
/* from Ascii table: http://www.ascii-code.com/
ARROW RIGHT = 39,
      LEFT  = 37,
      UP    = 38,
      DOWN  = 40
*/
function moveP2(p2){
  if (p2.keyCode === 39){
    console.log('moving p2 right');
    p2positionX += dx;
  }
  if (p2.keyCode === 37){
    console.log('moving p2 left');
    p2positionX -= dx;
  }
  if (p2.keyCode === 38){
    console.log('moving p2 up');
    p2positionY -= dy;
  }
  if (p2.keyCode === 40){
    console.log('moving p2 down');
    p2positionY += dy;
  }
}


//magggiccc???
function draw() {
  clear();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  rect(0,0,WIDTH,HEIGHT);                 //rect is maze rectangle container
  ctx.fillStyle = 'MediumVioletRed';      //player 1 marker color
  player1(p1positionX, p1positionY, circRadius);  //player 1 marker position
  ctx.fillStyle = 'YellowGreen';          //player 2 marker color
  player2(p2positionX, p2positionY, circRadius);  //player 2 marker position
}

init();

window.addEventListener('keydown',moveP1,true); //listens for p1 keydown
window.addEventListener('keydown',moveP2,true); //listens for p2 keydown
