console.log('loaded');

//global variables
var mazeGame      = document.querySelector('.maze-game');
    player1       = document.querySelector('#player1');
    player2       = document.querySelector('#player2');
    player1start  = 0;
    player2start  = 0;

//////// TWO PLAYER GAME

//////// WELCOME WINDOW BOX
/// GIVE SHORT GAME INSTRUCTIONS
/// PROMPT USERS TO SELECT MARKER
/// PLAYERS PRESS START
/// WINDOW BOX CLOSES
/// PLAYERS BEGIN GAME


//////// SET GAME MARKERS' FUNCTIONALITY
/// KEYSTROKES DETERMINE MOVEMENT OF MARKERS

/// PLAYER 1: A (LEFT) D (RIGHT) W (UP) S (DOWN)
/* from Ascii table: http://www.ascii-code.com/
A = 65,
D = 68,
W = 87,
S = 83
*/
document.onkeydown = animatePlayer1;

function animatePlayer1(marker){
    if (marker.keyCode === 68){ //moves marker Right
      player1start +=2;
      player1.style.left = player1start + 'px';
    }
}




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
