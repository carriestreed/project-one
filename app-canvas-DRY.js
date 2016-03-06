console.log('app-canvas.js loaded');

///////////// ATTEMPTING USE OF CANVAS API /////////////////
/*
Canvas Tutorials:
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
http://www.html5canvastutorials.com/
http://html5.litten.com/make-a-maze-game-on-an-html5-canvas/

Maze Image generated at
http://www.mazegenerator.net/
*/

/////global variables//////
var canvas;               //container to 'draw' graphics for maze/markers
var context;              //assigns context (will be '2D')
var mazeImg;
var MAZEWIDTH  = 600;     //fixed canvas size for maze
var MAZEHEIGHT = 600;     //fixed canvas size for maze
//////////////////////////

var players = [
  {
    name: 'player1',
    distanceX: 10,         //horizontal distance by pixel
    distanceY: 10,         //vertical distance by pixel
    right: 68,             //key D
    left: 65,              //key A
    up: 87,                //key W
    down: 83,              //key S
    markerColor: 'mediumVioletRed',
    positionX    : 1,    //p1 horizontal position
    positionY    : 307,  //p1 vertical position
    markerWidth  : 17,   //p1 marker width
    markerHeight : 17,   //p1 marker height
    markerSpecs: function(){
                    createMarkers(
                    players[0].positionX,
                    players[0].positionY,
                    players[0].markerWidth,
                    players[0].markerHeight)
                    }
  },
  {
    name: 'player2',
    distanceX: 10,         //horizontal distance by pixel
    distanceY: 10,         //vertical distance by pixel
    right: 39,             //arrow right
    left: 37,              //arrow left
    up: 38,                //arrow up
    down: 40,              //arrow down
    markerColor: 'yellowGreen',
    positionX    : 583,
    positionY    : 276,
    markerWidth  : 17,
    markerHeight : 17,
    markerSpecs  : function(){
                      createMarkers(
                      players[1].positionX,
                      players[1].positionY,
                      players[1].markerWidth,
                      players[1].markerHeight)
                      }
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
      players[i].markerSpecs();
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

function checkForWall(){
  console.log('checking for wall');
  for (var i = 0; i < players.length; i++){
    var mazeImageData = context.getImageData(
      players[i].positionX,
      players[i].positionY,
      players[i].markerWidth,
      players[i].markerHeight);
    var imgDataArr = mazeImageData.data;
    for (var j = 0; j < imgDataArr.length; j++){
    if (imgDataArr[j] === 0){
      wallBlocking = true;
      }
    }
  }
}

function checkForWin(){                             //checks for winner, 1st to exit wins!
  console.log('checking for win');
  if (players[0].positionX === 571 && players[0].positionY === 277){  //p1 exit coordinates
    console.log(p1name + ' wins!');
    p1win = true;
    winAlert();
    return;
  }
  if (players[1].positionX === 3 && players[1].positionY === 306){    //p2 exit coordinates
    console.log(p2name + ' wins!');
    p2win = true;
    winAlert();
    return;
  }
}

function movePlayers(mark){
  console.log(mark.keyCode);
  console.log('in movePlayers function');
  for (var i = 0; i < players.length; i++){
    if (mark.keyCode === players[i].right){
      console.log('moving ' + players[i].name + ' right');
      players[i].positionX += players[i].distanceX;
      checkForWall();
      if (wallBlocking){           ////TODO, create moveBack()
        console.log('wall block');
        players[i].positionX -= players[i].distanceX;
        wallBlocking = false;
      }
    }
    if (mark.keyCode === players[i].left){
      console.log('moving ' + players[i].name + ' left');
      players[i].positionX -= players[i].distanceX;
      checkForWall();
      if (wallBlocking){
        console.log('wall block');
        players[i].positionX += players[i].distanceX;
        wallBlocking = false;
      }
    }
    if (mark.keyCode === players[i].up){
      console.log('moving ' + players[i].name + ' up');
      players[i].positionY -= players[i].distanceY;
      checkForWall();
      if (wallBlocking){
        console.log('wall block');
        players[i].positionY += players[i].distanceY;
        wallBlocking = false;
      }
    }
    if (mark.keyCode === players[i].down){
      console.log('moving ' + players[i].name + ' down');
      players[i].positionY += players[i].distanceY;
      checkForWall();
      if (wallBlocking){
        console.log('wall block');
        players[i].positionY -= players[i].distanceY;
        wallBlocking = false;
      }
    }
    checkForWin();
  }
  // //console logging the image data map
  // for (var i = 0; i < players.length; i++){
  // console.log(context.getImageData(
  //   players[i].positionX,
  //   players[i].positionY,
  //   players[i].markerWidth,
  //   players[i].markerHeight).data);
  // }
}

startGame();

document.addEventListener('keydown', movePlayers);     //listens for players' keydown



/* TODO
Resize canvas maze image instead of just resizing the image diretly

currently, only 1 player at a time can hold down the key for continuous
movement. Unless both players are constantly keying down, the game is
technically broken----solution could be a while loop???
*/
