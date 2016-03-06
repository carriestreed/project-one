console.log('app-canvas.js loaded');

///////////// ATTEMPTING USE OF CANVAS API /////////////////
/*
Canvas Tutorials:
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
http://www.html5canvastutorials.com/
http://html5.litten.com/make-a-maze-game-on-an-html5-canvas/

Maze image generated at
http://www.mazegenerator.net/
*/

/////global variables/////
var canvas;                      //container to 'draw' graphics for maze/markers
var context;                     //assigns context (will be '2D')
var distanceX = 10;              //horizontal distance by pixel
    distanceY = 10;              //vertical distance by pixel
    p1positionX  = 0;            //p1 horizontal position
    p1positionY  = 307;          //p1 vertical position
    p2positionX  = 583;          //p2 horizontal position
    p2positionY  = 276;          //p2 vertical position
    mazeImg      = new Image();  //reads from canvas API - creates new image function for maze.gif
    markerWidth  = 17;           //sets width of player markers
    markerHeight = 17;           //sets height of player markers
    MAZEWIDTH    = 600;          //fixed canvas size for maze
    MAZEHEIGHT   = 600;          //fixed canvas size for maze
/////////////////////////

function startGame(){                               //starts the game, sets everything in place
  canvas      = document.querySelector('#canvas');  //selects canvas
  context     = canvas.getContext('2d');            //canvas api to select Context (which is 2D)
  mazeImg.src = 'img/maze.gif';                     //sets maze image to canvas
  return setInterval(draw, 1);                      //rate of draw refresh (relates to speed which markers are moved). Points to draw()
}

function player1(pX,pY,mW,mH){                      //creates player1 marker -- pulls from draw()
  context.beginPath();                              //starts rectangle drawing for player1
  context.rect(pX, pY, mW, mH);                     //canvas api function for Rectangle shape
  context.fill();                                   //points to context.fillStyle in draw()
}

function player2(pX,pY,mW, mH){                     //creates player2 marker -- pulls from draw()
  context.beginPath();                              //starts rectangle drawing for player2
  context.rect(pX, pY, mW, mH);                     //canvas api function for Rectangle shape
  context.fill();                                   //points to context.fillStyle in draw()
}

function draw(){                                    //magggggiccccc
  clear();                                          //points to reset canvas for 'redrawing'
  context.fillStyle = "MediumVioletRed";            //player 1 marker color
  player1(p1positionX, p1positionY, markerWidth, markerHeight);  //passed in to player1()
  context.fillStyle = "YellowGreen";                //player 2 marker color
  player2(p2positionX, p2positionY, markerWidth, markerHeight);  //passed in to player2()
}

function clear(){                                   //resets canvas for animation/'drawing'
  context.clearRect(0, 0, MAZEWIDTH, MAZEHEIGHT);   //resets marker positions--allows for movement
  context.drawImage(mazeImg, 0, 0);                 //draws canvas image
}

/////checks for boundaries
function checkForWallP1(){
  //getImageData() returns marker's current position on the canvas using its pixel data
  var mazeImageData   = context.getImageData(p1positionX, p1positionY, markerWidth, markerHeight);
  //.data returns an array containing the RGB values of the maze image
  var imgDataArr      = mazeImageData.data;
  //for loop reads through the entire array of returned RGB values
  for (var i = 0; i < imgDataArr.length; i++){
    //if any number in the array reads a 0 [rgb value for black is 0,0,0], there is a wall block
    if (imgDataArr[i] === 0) {
      wallBlocking    = true;
    }
  }
}

function checkForWallP2(){
  //player 2 gets a separate assignment for wall check
  var mazeImageData   = context.getImageData(p2positionX, p2positionY, markerWidth, markerHeight);
  var imgDataArr      = mazeImageData.data;
  for (var i = 0; i < imgDataArr.length; i++){
    if (imgDataArr[i] === 0){
      wallBlocking    = true;
    }
  }
}
//TODO write one function and pass in a parameter for each player
/////////////////////////


function checkForWin(){                             //checks for winner, 1st to exit wins!
  console.log('checking for win');
  if (p1positionX === 580 && p1positionY === 277){  //p1 exit coordinates
    console.log(p1name + ' wins!');
    p1win = true;
    winAlert();
    return;
  }
  if (p2positionX === 3 && p2positionY === 306){    //p2 exit coordinates
    console.log(p2name + ' wins!');
    p2win = true;
    winAlert();
    return;
  }
}


/////moving player 1 marker
/* from Ascii table: http://www.ascii-code.com/
KEY D = 68, (right)
    A = 65, (left)
    W = 87, (up)
    S = 83  (down) */
function moveP1(p1){
  if (p1.keyCode === 68){                          //KEY D (RIGHT))
    if (p1positionX + distanceX < MAZEWIDTH){      //if distance travelled to the right doesn't exceed the  maze width
      console.log('moving p1 right');
      p1positionX += distanceX;                    //move Right per pixel assigned
      checkForWallP1();                            //check for boundaries
      if (wallBlocking){                           //if there is a wall
        console.log('wall block');
        p1positionX -= distanceX;                  //move marker back (left)
        wallBlocking = false;                      //marker position no longer blocked, yay
      }
      checkForWin();                               //CHECKING FOR WIN
    }
  }
  if (p1.keyCode === 65){
    if (p1positionX + distanceX > 0){
      console.log('moving p1 left');
      p1positionX -= distanceX; //TODO check if working. changed Y to X in distance
      checkForWallP1();
      if (wallBlocking){
        console.log('wall block');
        p1positionX += distanceX;
        wallBlocking = false;
      }
      checkForWin();
    }
  }
  if (p1.keyCode === 87){
    if (p1positionY + distanceY > 0){
      console.log('moving p1 up');
      p1positionY -= distanceY;
      checkForWallP1();
      if (wallBlocking){
        console.log('wall block');
        p1positionY += distanceY;
        wallBlocking = false;
      }
      checkForWin();
    }
  }
  if (p1.keyCode === 83){
    if (p1positionY + distanceY < MAZEHEIGHT){
      console.log('moving p1 down');
      p1positionY += distanceY;
      checkForWallP1();
      if (wallBlocking){
        console.log('wall block');
        p1positionY -= distanceY;
        wallBlocking = false;
      }
      checkForWin();
    }
  }
  console.log(context.getImageData(p1positionX, p1positionY, markerWidth, markerHeight).data);
}


/////moving player 2 marker
/* from Ascii table: http://www.ascii-code.com/
ARROW RIGHT = 39,
      LEFT  = 37,
      UP    = 38,
      DOWN  = 40*/
function moveP2(p2){
  if (p2.keyCode === 39){                        //ARROW RIGHT
    if (p2positionX + distanceX < MAZEWIDTH){    //if distance travelled to the right doesn't exceed the  maze width
      console.log('moving p2 right');
      p2positionX += distanceX;                  //move Right per pixel assigned
      checkForWallP2();                          //check for boundaries
      if (wallBlocking){                         //if there is a wall
        console.log('wall block');
        p2positionX -= distanceX;                //move marker back (left)
        wallBlocking = false;                    //marker position no longer blocked, proceeeeeeed
      }
      checkForWin();                             //CHECKING FOR WIN
    }
  }
  if (p2.keyCode === 37){                        //ARROW LEFT
    if (p2positionX + distanceX > 0){            //if distance travelled to the left doesn't proceed the maze width
      console.log('moving p2 left');
      p2positionX -= distanceX;                  //move Left per pixel assigned
      checkForWallP2();                          //check for boundaries
      if (wallBlocking){                         //if there is a wall
        console.log('wall block');
        p2positionX += distanceX;                //move marker back (right)
        wallBlocking = false;                    //marker position no longer blocked, proceed!!!!!
      }
      checkForWin();
    }
  }
  if (p2.keyCode === 38){
    if (p2positionY + distanceY > 0){
      console.log('moving p2 up');
      p2positionY -= distanceY;
      checkForWallP2();
      if (wallBlocking){
        console.log('wall block');
        p2positionY += distanceY;
        wallBlocking = false;
      }
      checkForWin();
    }
  }
  if (p2.keyCode === 40){
    if (p2positionY + distanceY < MAZEHEIGHT){
      console.log('moving p2 down');
      p2positionY += distanceY;
      checkForWallP2();
      if (wallBlocking){
        console.log('wall block');
        p2positionY -= distanceY;
        wallBlocking = false;
      }
      checkForWin();
    }
  }
  console.log(context.getImageData(p2positionX, p2positionY, markerWidth, markerHeight).data);
}

// startGame();

document.addEventListener('keydown', moveP1);                 //listens for player 1 keydown
document.addEventListener('keydown', moveP2);                 //listens for player 2 keydown


/* TODO
Resize canvas maze image instead of just resizing the image diretly

currently, only 1 player at a time can hold down the key for continuous
movement. Unless both players are constantly keying down, the game is
technically broken----solution could be a while loop???
*/
