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
var distanceX = 10;              //horizontal distance by pixel
    distanceY = 10;              //vertical distance by pixel
    p1positionX  = 0;            //p1 horizontal position
    p1positionY  = 307;          //p1 vertical position
    p2positionX  = 583;          //p2 horizontal position
    p2positionY  = 277;          //p2 vertical position
    mazeImg      = new Image();  //TODO canvas new image function for maze.gif *read up on canvas image api
    markerWidth  = 17;           //sets width of player markers
    markerHeight = 17;           //sets height of player markers
    MAZEWIDTH    = 600;          //fixed canvas size for maze
    MAZEHEIGHT   = 600;          //fixed canvas size for maze
/////////////////////////



function player1(x,y,w,h){                 //creates player1 marker
  context.beginPath();                     //TODO
  context.rect(p1positionX, p1positionY, markerWidth, markerHeight); //canvas api function for Rectangle shape
  context.closePath();                     //TODO
  context.fill();                          //points to context.fillStyle in draw()
}

function player2(x,y,w,h){                 //creates player2 marker
  context.beginPath();                     //TODO
  context.rect(p2positionX, p2positionY, markerWidth, markerHeight); //canvas api function for Rectangle shape
  context.closePath();                     //TODO
  context.fill();                          //points to context.fillStyle in draw()
}

//magggiccc
function draw(){
  clear();                                  //sets/resets canvas for animation
  context.fillStyle = "MediumVioletRed";    //player 1 marker color
  player1(p1positionX, p1positionY, markerWidth, markerHeight);
  context.fillStyle = "YellowGreen";        //player 2 marker color
  player2(p2positionX, p2positionY, markerWidth, markerHeight);
}

function clear(){                                   //resets canvas for animation/draw
  context.clearRect(0, 0, MAZEWIDTH, MAZEHEIGHT);   //resets marker position
  context.drawImage(mazeImg, 0, 0);                 //draws canvas image
}

function startGame(){                               //starts the game, sets everything in place
  canvas      = document.querySelector('#canvas');  //selects canvas
  context     = canvas.getContext('2d');            //canvas api
  mazeImg.src = 'img/maze.gif';                     //sets maze image to canvas
  return setInterval(draw, 1);                      //rate of draw refresh (relates to speed which markers are moved)
}


function checkForWallP1(){   //checks for clear path for Player 1
  var mazeImageData   = context.getImageData(p1positionX, p1positionY, markerWidth, markerHeight);
  var imgDataArr      = mazeImageData.data;
  for (var i = 0; i < imgDataArr.length; i++){
    if (imgDataArr[i] === 0) {
      wallBlocking    = true;
    }
  }
}

function checkForWallP2(){   //checks for clear path for Player 1
  var mazeImageData   = context.getImageData(p2positionX, p2positionY, markerWidth, markerHeight);
  var imgDataArr      = mazeImageData.data;
  for (var i = 0; n   = imgDataArr.length, i < n; i += 4){
    if (imgDataArr[i] === 0){
      wallBlocking = true;
    }
  }
}

function checkForWin(){
  console.log('checking for win');
  if (p1positionX === 580 && p1positionY === 277 ||
      p2positionX === 3 && p2positionY === 307){ //p1 exit coordinates
    playerWins = true;
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
    if (p1positionX + distanceX < MAZEWIDTH){
      console.log('moving p1 right');
      p1positionX += distanceX;
      clear();
      checkForWallP1();
      if (wallBlocking){
        console.log('wall block');
        p1positionX -= distanceX;
        wallBlocking = false;
      }
      checkForWin();
      if (playerWins){
        alert('Player 1 Wins!');
      }
    }
  }
  if (p1.keyCode === 65){
    if (p1positionX + distanceX > 0){
      console.log('moving p1 left');
      p1positionX -= distanceY;
      clear();
      checkForWallP1();
      if (wallBlocking){
        console.log('wall block');
        p1positionX += distanceX;
        wallBlocking = false;
      }
    }
  }
  if (p1.keyCode === 87){
    if (p1positionY + distanceY > 0){
      console.log('moving p1 up');
      p1positionY -= distanceY;
      clear();
      checkForWallP1();
      if (wallBlocking){
        console.log('wall block');
        p1positionY += distanceY;
        wallBlocking = false;
      }
    }
  }
  if (p1.keyCode === 83){
    if (p1positionY + distanceY < MAZEHEIGHT){
      console.log('moving p1 down');
      p1positionY += distanceY;
      clear();
      checkForWallP1();
      if (wallBlocking){
        console.log('wall block');
        p1positionY -= distanceY;
        wallBlocking = false;
      }
    }
  }
  console.log(context.getImageData(p1positionX, p1positionY, markerWidth, markerHeight).data);
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
    if (p2positionX + distanceX < MAZEWIDTH){
      console.log('moving p2 right');
      p2positionX += distanceX;
      clear();
      checkForWallP2();
      if (wallBlocking){
        console.log('wall block');
        p2positionX -= distanceX;
        wallBlocking = false;
      }
    }
  }
  if (p2.keyCode === 37){
    if (p2positionX + distanceX > 0){
      console.log('moving p2 left');
      p2positionX -= distanceX;
      clear();
      checkForWallP2();
      if (wallBlocking){
        console.log('wall block');
        p2positionX += distanceX;
        wallBlocking = false;
      }
      checkForWin();
      if (playerWins){
        alert('Player 2 Wins!');
      }
    }
  }
  if (p2.keyCode === 38){
    if (p2positionY + distanceY > 0){
      console.log('moving p2 up');
      p2positionY -= distanceY;
      clear();
      checkForWallP2();
      if (wallBlocking){
        console.log('wall block');
        p2positionY += distanceY;
        wallBlocking = false;
      }
    }
  }
  if (p2.keyCode === 40){
    if (p2positionY + distanceY < MAZEHEIGHT){
      console.log('moving p2 down');
      p2positionY += distanceY;
      clear();
      checkForWallP2();
      if (wallBlocking){
        console.log('wall block');
        p2positionY -= distanceY;
        wallBlocking = false;
      }
    }
  }
  console.log(context.getImageData(p2positionX, p2positionY, markerWidth, markerHeight).data);
}

startGame();

window.addEventListener('keydown', moveP1, true); //listens for p1 keydown
window.addEventListener('keydown', moveP2, true); //listens for p2 keydown
/* currently, only 1 player at a time can hold down the key
for continuous movement. Unless both players are constantly
keying down, the game is technically broken
----solution could be a while loop??? */

/* TODO
Resize canvas maze image instead of just resizing the image diretly
*/
