console.log('app.js loaded');



/////GLOBAL VARIABLES/////
var mazeGame;
var welcomeBox;
var title;
var clickToPlay;
/////////////////////////

/////player variables
var p1win       = false;
var p2win       = false;
var p1nameInput = document.querySelector('#p1');
var p2nameInput = document.querySelector('#p2');
var p1name;
var p2name;

if (p1nameInput.addEventListener){
    p1nameInput.addEventListener('keyup', function() {
      p1name = p1nameInput.value;
    });
}

if (p2nameInput.addEventListener){
  p2nameInput.addEventListener('keyup', function() {
    p2name = p2nameInput.value;
  })
}

/////welcome box
clickToPlay = document.querySelector('#playButton');
clickToPlay.addEventListener('click', playMaze);

function playMaze(){
  console.log('ready. set. go!')

  title = document.querySelector('h1');
  title.style.color = 'black';

  mazeGame = document.querySelector('.maze-game');
  welcomeBox = document.querySelector('.welcome');
  mazeGame.removeChild(welcomeBox);

  startGame()
}


/////win alert box

function winAlert(){
  console.log('in the WinAlert function')
  if (p1win = true){
    console.log(p1name + ' is the winner');
  }
  if (p2win = true){
    console.log(p2name + ' is the winner');
  }
}
