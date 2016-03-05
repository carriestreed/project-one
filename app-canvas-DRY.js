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
var distanceX  = 10;      //horizontal distance by pixel
    distanceY  = 10;      //vertical distance by pixel
    MAZEWIDTH  = 600;     //fixed canvas size for maze
    MAZEHEIGHT = 600;     //fixed canvas size for maze
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

// var markers = [
//   {
//     distanceX: 10,        //horizontal distance by pixel
//     distanceY: 10,        //vertical distance by pixel
//   }
// ]

function startGame(){                               //starts the game, sets everything in place
  canvas      = document.querySelector('#canvas');  //selects canvas
  context     = canvas.getContext('2d');            //canvas api to assign Context (which is 2D)
  mazeImg     = new Image();                        //reads from canvas API - creates new image function for maze.gif
  mazeImg.src = 'img/maze.gif';                     //sets maze image to canvas
  return setInterval(draw, 1);                      //rate of draw refresh (relates to speed which markers are moved). Points to draw()
}

function draw(){                                    //magggggiccccc
  clear();                                          //points to clear() which resets canvas for 'redrawing'
  for (var i = 0; i < players.length; i++){
    if (players[i].name === 'player1'){             //setting up player 1
      context.fillStyle = players[i].markerColor;
      positionX = players[i].positionX;
      positionY = players[i].positionY;
      markerWidth = players[i].width;
      markerHeight = players[i].height;
      createMarkers(positionX, positionY, markerWidth, markerHeight);
    }
    if (players[i].name === 'player2'){             //setting up player 2
      context.fillStyle = players[i].markerColor;
      positionX = players[i].positionX;
      positionY = players[i].positionY;
      markerWidth = players[i].width;
      markerHeight = players[i].height;
      createMarkers(positionX, positionY, markerWidth, markerHeight);
    }
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
function checkForWallP1(){  /////checks for boundaries
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
/////////////////////////

//TODO rework
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


/////moving player 1 marker
/* from Ascii table: http://www.ascii-code.com/
KEY D = 68, (right)
    A = 65, (left)
    W = 87, (up)
    S = 83  (down) */

function movePlayers(mark){
  console.log(mark.keyCode);
  console.log('in movePlayers function');
  for (var i = 0; i < players.length; i++){
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
//
// function moveP1(p1){
//   if (p1.keyCode === 68){                          //KEY D (RIGHT))
//     if (p1positionX + distanceX < MAZEWIDTH){      //if distance travelled to the right doesn't exceed the  maze width
//       clear();                                     //reset marker for 'redrawing' of position
//       p1positionX += distanceX;                    //move Right per pixel assigned
//       checkForWallP1();                            //check for boundaries
//       if (wallBlocking){                           //if there is a wall
//         p1positionX -= distanceX;                  //move marker back (left)
//         wallBlocking = false;                      //marker position no longer blocked, yay
//       }
//       checkForWin();                               //CHECKING FOR WIN
//     }
//   }
//   if (p1.keyCode === 65){
//     if (p1positionX + distanceX > 0){
//       clear();
//       p1positionX -= distanceY;
//       checkForWallP1();
//       if (wallBlocking){
//         p1positionX += distanceX;
//         wallBlocking = false;
//       }
//       checkForWin();
//     }
//   }
//   if (p1.keyCode === 87){
//     if (p1positionY + distanceY > 0){
//       clear();
//       p1positionY -= distanceY;
//       checkForWallP1();
//       if (wallBlocking){
//         p1positionY += distanceY;
//         wallBlocking = false;
//       }
//       checkForWin();
//     }
//   }
//   if (p1.keyCode === 83){
//     if (p1positionY + distanceY < MAZEHEIGHT){
//       clear();
//       p1positionY += distanceY;
//       checkForWallP1();
//       if (wallBlocking){
//         p1positionY -= distanceY;
//         wallBlocking = false;
//       }
//       checkForWin();
//     }
//   }
// }
//
//
// /////moving player 2 marker
// /* from Ascii table: http://www.ascii-code.com/
// ARROW RIGHT = 39,
//       LEFT  = 37,
//       UP    = 38,
//       DOWN  = 40*/
// function moveP2(p2){
//   if (p2.keyCode === 39){                        //ARROW RIGHT
//     if (p2positionX + distanceX < MAZEWIDTH){    //if distance travelled to the right doesn't exceed the  maze width
//       clear();                                   //reset marker for 'redrawing' of position
//       p2positionX += distanceX;                  //move Right per pixel assigned
//       checkForWallP2();                          //check for boundaries
//       if (wallBlocking){                         //if there is a wall
//         p2positionX -= distanceX;                //move marker back (left)
//         wallBlocking = false;                    //marker position no longer blocked, proceeeeeeed
//       }
//       checkForWin();                             //CHECKING FOR WIN
//     }
//   }
//   if (p2.keyCode === 37){                        //ARROW LEFT
//     if (p2positionX + distanceX > 0){            //if distance travelled to the left doesn't proceed the maze width
//       clear();                                   //reset marker for 'redrawing' of position
//       p2positionX -= distanceX;                  //move Left per pixel assigned
//       checkForWallP2();                          //check for boundaries
//       if (wallBlocking){                         //if there is a wall
//         p2positionX += distanceX;                //move marker back (right)
//         wallBlocking = false;                    //marker position no longer blocked, proceed!!!!!
//       }
//       checkForWin();
//     }
//   }
//   if (p2.keyCode === 38){
//     if (p2positionY + distanceY > 0){
//       clear();
//       p2positionY -= distanceY;
//       checkForWallP2();
//       if (wallBlocking){
//         p2positionY += distanceY;
//         wallBlocking = false;
//       }
//       checkForWin();
//     }
//   }
//   if (p2.keyCode === 40){
//     if (p2positionY + distanceY < MAZEHEIGHT){
//       clear();
//       p2positionY += distanceY;
//       checkForWallP2();
//       if (wallBlocking){
//         p2positionY -= distanceY;
//         wallBlocking = false;
//       }
//       checkForWin();
//     }
//   }
// }

startGame();

document.addEventListener('keydown', movePlayers);     //listens for players' keydown


/* TODO
Resize canvas maze image instead of just resizing the image diretly

currently, only 1 player at a time can hold down the key for continuous
movement. Unless both players are constantly keying down, the game is
technically broken----solution could be a while loop???
*/
