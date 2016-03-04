console.log('app-TEST.js loaded');

///////////// ATTEMPTING USE OF CANVAS API /////////////////
/*

Canvas Tutorials:
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
http://html5.litten.com/moving-shapes-on-the-html5-canvas-with-the-keyboard/

*/


/////global variables/////
var canvas;
var context;
var dx = 10;                    //horizontal speed
    dy = 10;                    //vertical speed
    p1positionX = 0;           //p1 horizontal position
    p1positionY = 308;          //p1 vertical position
    p2positionX = 585;          //p2 horizontal position
    p2positionY = 277;          //p2 vertical position
    mazeImg     = new Image();  //TODO canvas new image function for maze.gif *read up on canvas image api
    WIDTH       = 600;          //fixed canvas size
    HEIGHT      = 600;          //fixed canvas size
/////////////////////////



function player1(x,y,w,h) {  //creates player1 marker
  context.beginPath(); //canvas api function
  context.rect(p1positionX, p1positionY, w, h); //canvas api function for Circle shape
  context.closePath();
  context.fill(); //points to contextt.fillStyle
}

function player2(x,y,w,h) {  //creates player2 marker
  context.beginPath(); //canvas api function
  context.rect(p2positionX, p2positionY, w, h); //canvas api function for Circle shape
  context.closePath();
  context.fill(); //points to contextt.fillStyle
}

//magggiccc???
function draw() {
clear();
context.fillStyle = "MediumVioletRed";
player1(p1positionX, p1positionY, 15,15);

context.fillStyle = "YellowGreen";
player2(p2positionX, p2positionY, 15,15);
}

function clear() {  //sets up canvas for movement
  context.clearRect(0, 0, WIDTH, HEIGHT);    //clears canvas area (rectangle)
  context.drawImage(mazeImg, 0, 0);          //draws canvas image
}

function init() {   //starts the game, sets everything in place
  canvas      = document.querySelector('#canvas'); //selects canvas
  context     = canvas.getContext('2d'); //canvas api
  mazeImg.src = 'img/maze.gif';   //sets maze image to canvas
  return setInterval(draw, 1);    //rate of draw refresh (relates to speed which markers are moved)
}


function checkForWallP1() {  //checks for clear path for Player 1
  var mazeImageData = context.getImageData(p1positionX, p1positionY, 15, 15);
  var imgDataArr = mazeImageData.data;
  for (var i = 0; n = imgDataArr.length, i < n; i += 4) {
    if (imgDataArr[i] === 0) {
      wallBlocking = true;
    }
  }
}

function checkForWallP2() {  //checks for clear path for Player 1
  var mazeImageData = context.getImageData(p2positionX, p2positionY, 15, 15);
  var imgDataArr = mazeImageData.data;
  for (var i = 0; n = imgDataArr.length, i < n; i += 4) {
    if (imgDataArr[i] === 0) {
      wallBlocking = true;
    }
  }
}

//moving player 1 marker
/* from Ascii table: http://www.ascii-code.com/
KEY D = 68, (right)
    A = 65, (left)
    W = 87, (up)
    S = 83  (down)
*/
function moveP1(p1){
  if (p1.keyCode === 68){
    if (p1positionX + dx < WIDTH){
      console.log('moving p1 right');
      p1positionX += dx;
      clear();
      checkForWallP1();
      if (wallBlocking){
        console.log('wall block');
        p1positionX -= dx;
        wallBlocking = false;
      }
    }
  }
  if (p1.keyCode === 65){
    if (p1positionX + dx > 0){
      console.log('moving p1 left');
      p1positionX -= dy;
      clear();
      checkForWallP1();
      if (wallBlocking){
        console.log('wall block');
        p1positionX += dx;
        wallBlocking = false;
      }
    }
  }
  if (p1.keyCode === 87){
    if (p1positionY + dy > 0){
      console.log('moving p1 up');
      p1positionY -= dy;
      clear();
      checkForWallP1();
      if (wallBlocking){
        console.log('wall block');
        p1positionY += dy;
        wallBlocking = false;
      }
    }
  }
  if (p1.keyCode === 83){
    if (p1positionY + dy < HEIGHT){
      console.log('moving p1 down');
      p1positionY += dy;
      clear();
      checkForWallP1();
      if (wallBlocking){
        console.log('wall block');
        p1positionY -= dy;
        wallBlocking = false;
      }
    }
  }
  console.log(context.getImageData(p1positionX,p1positionY,1,1).data);
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
    if (p2positionX + dx < WIDTH){
      console.log('moving p2 right');
      p2positionX += dx;
      clear();
      checkForWallP2();
      if (wallBlocking){
        console.log('wall block');
        p2positionX -= dx;
        wallBlocking = false;
      }
    }
  }
  if (p2.keyCode === 37){
    if (p2positionX + dx > 0){
      console.log('moving p2 left');
      p2positionX -= dx;
      clear();
      checkForWallP2();
      if (wallBlocking){
        console.log('wall block');
        p2positionX += dx;
        wallBlocking = false;
      }
    }
  }
  if (p2.keyCode === 38){
    if (p2positionY + dy > 0){
      console.log('moving p2 up');
      p2positionY -= dy;
      clear();
      checkForWallP2();
      if (wallBlocking){
        console.log('wall block');
        p2positionY += dy;
        wallBlocking = false;
      }
    }
  }
  if (p2.keyCode === 40){
    if (p2positionY + dy < HEIGHT){
      console.log('moving p2 down');
      p2positionY += dy;
      clear();
      checkForWallP2();
      if (wallBlocking){
        console.log('wall block');
        p2positionY -= dy;
        wallBlocking = false;
      }
    }
  }
  console.log(context.getImageData(p1positionX,p1positionY,1,1).data);
}

init();

window.addEventListener('keydown', moveP1, true); //listens for p1 keydown
window.addEventListener('keydown', moveP2, true); //listens for p2 keydown
/* currently, only 1 player at a time can hold down the key
for continuous movement. Unless both players are constantly
keying down, the game is technically broken
----solution could be a while loop??? */

/* TODO
Resize canvas maze image instead of just resizing the image diretly
*/
