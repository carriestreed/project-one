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

/////global variables//////
var canvas;               //container to 'draw' graphics for maze/markers
var context;              //assigns context (will be '2D')
var MAZEWIDTH  = 600;     //fixed canvas size for maze
var MAZEHEIGHT = 600;     //fixed canvas size for maze
//////////////////////////

var players = [
  {
    name: 'player1',
    positionX: 1,         //p1 horizontal position
    positionY: 307,       //p1 vertical position
    markerColor: 'mediumVioletRed',
    distanceX: 10,        //horizontal distance by pixel
    distanceY: 10,        //vertical distance by pixel
    width: 17,            //sets width of player marker
    height: 17,           //sets height of player marker
    right: 68,            //key D
    left: 65,             //key A
    up: 87,               //key W
    down: 83              //key S
  },
  {
    name: 'player2',
    positionX: 583,       //p2 horizontal position
    positionY: 276,       //p2 vertical position
    markerColor: 'yellowGreen',
    distanceX: 10,        //horizontal distance by pixel
    distanceY: 10,        //vertical distance by pixel
    width: 17,            //sets width of player marker
    height: 17,           //sets height of player marker
    right: 39,            //arrow right
    left: 37,             //arrow left
    up: 38,               //arrow up
    down: 40              //arrow down
  }
]

var maze = [
  {

  }
]

function startGame(){                               //starts the game, sets everything in place
  canvas      = document.querySelector('#canvas');  //selects canvas
  context     = canvas.getContext('2d');            //canvas api to assign Context (which is 2D)
  mazeImg     = new Image();                        //reads from canvas API - creates new image function for maze.gif
  mazeImg.src = 'img/maze.gif';                     //sets maze image to canvas
  return setInterval(draw, 1);                      //rate of draw refresh (relates to speed which markers are moved). Points to draw()
}

function draw(){                                    //magggggiccccc
  clear();                                          //points to clear() which resets canvas for 'redrawing'
  for (var i = 0; i < players.length; i++){         //setting up players
      context.fillStyle = players[i].markerColor;
      var positionX = players[i].positionX;
      var positionY = players[i].positionY;
      var markerWidth = players[i].width;
      var markerHeight = players[i].height;
      createMarkers(positionX, positionY, markerWidth, markerHeight);
  }
}

function createMarkers(pX, pY, mW, mH){
  context.beginPath();                              //starts rectangle drawing for players
  context.rect(pX, pY, mW, mH);                     //canvas api function for Rectangle shape
  context.fill();                                   //points to context.fillStyle in draw()
}

function clear(){                                   //resets canvas for animation/'drawing'
  context.clearRect(0, 0, MAZEWIDTH, MAZEHEIGHT);   //resets marker positions--allows for movement
  context.drawImage(mazeImg, 0, 0);                 //draws canvas image
}


//TODO write one function and pass in a parameter for each player

function checkForWall(){
  console.log('checking for wall');
  // for(var i = 0; i < players.length; i++){
  //   var mazeImageData   = context.getImageData(x,y,w,h);
  //   var imgDataArr      = mazeImageData.data;
  //   for (var i = 0; i < imgDataArr.length; i++){
  //     if (imgDataArr[i] === 0){
  //       wallBlocking    = true;
  //     }
  //   }
  // }
}


//TODO rework to point at object
function checkForWin(){                             //checks for winner, 1st to exit wins!
  if (p1positionX === 580 && p1positionY === 277){  //p1 exit coordinates
    p1win = true;
    winAlert();
    return;
  }
  if (p2positionX === 3 && p2positionY === 306){    //p2 exit coordinates
    p2win = true;
    winAlert();
    return;
  }
}


function movePlayers(mark){
  console.log(mark.keyCode);
  console.log('in movePlayers function');
  for (var i = 0; i < players.length; i++){
    checkForWall();
    if (mark.keyCode === players[i].right){
      clear();
      console.log('moving ' + players[i].name + ' right');
      players[i].positionX += players[i].distanceX;
    }
    if (mark.keyCode === players[i].left){
      console.log('moving ' + players[i].name + ' left');
      players[i].positionX -= players[i].distanceX;
    }
    if (mark.keyCode === players[i].up){
      console.log('moving ' + players[i].name + ' up');
      players[i].positionY -= players[i].distanceY;
    }
    if (mark.keyCode === players[i].down){
      console.log('moving ' + players[i].name + ' down');
      players[i].positionY += players[i].distanceY;
    }
  }
}

startGame();

document.addEventListener('keydown', movePlayers);     //listens for players' keydown


/* TODO
Resize canvas maze image instead of just resizing the image diretly

currently, only 1 player at a time can hold down the key for continuous
movement. Unless both players are constantly keying down, the game is
technically broken----solution could be a while loop???
*/
