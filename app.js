console.log('app.js loaded');



/////GLOBAL VARIABLES/////
var mazeGame;
var welcomeBox;
var title;
var clickToPlay;

/////////////////////////

/////player variables
var p1name;
var p2name;
var p1win       = false;
    p2win       = false;
    p1nameInput = document.querySelector('#p1');
    p2nameInput = document.querySelector('#p2');

if (p1nameInput.addEventListener){
  p1nameInput.addEventListener('keyup', function() {
    p1name = p1nameInput.value;
  });
}

if (p2nameInput.addEventListener){
  p2nameInput.addEventListener('keyup', function() {
    p2name = p2nameInput.value;
  });
}

/////welcome box
clickToPlay = document.querySelector('.playButton');
clickToPlay.addEventListener('click', playMaze);

function playMaze(){
  console.log('ready. set. go!');

  title = document.querySelector('h1');
  title.style.color = 'black';

  mazeGame = document.querySelector('.maze-game');
  welcomeBox = document.querySelector('.welcome');
  mazeGame.removeChild(welcomeBox);

  startGame()
}

/////rules box
clickForRules = document.querySelector('.rulesButton');
clickForRules.addEventListener('click', openRules);

function openRules(){
  console.log('clicked for rules');
  var rulesBox = document.querySelector('#rules');
    rulesBox.style.visibility = 'visible';
}

var rulesExit = document.querySelector('.exitButton');
rulesExit.addEventListener('click', function(){
  console.log('clicked to reload');
  document.location.reload(true);
});

/////win alert box
function winAlert(){
  console.log('in the WinAlert function')
  if (p1win){
    console.log(p1name + ' is the winner');
    var winBox = document.querySelector('.winner');
      winBox.style.visibility = 'visible';
    var winnerName = document.querySelector('.winName');
      winnerName.innerHTML = p1name;
      winnerName.style.color = 'mediumVioletRed';
    var loserName = document.querySelector('.loseName');
      loserName.innerHTML = p2name;
      loserName.style.color = 'yellowGreen';
  }
  if (p2win){
    console.log(p2name + ' is the winner');
    var winBox = document.querySelector('.winner');
      winBox.style.visibility = 'visible';
    var winnerName = document.querySelector('.winName');
      winnerName.innerHTML = p2name;
      winnerName.style.color = 'yellowGreen';
    var loserName = document.querySelector('.loseName');
      loserName.innerHTML = p1name;
      loserName.style.color = 'mediumVioletRed';
   }
}

/////race again button
var raceAgain = document.querySelector('.resetButton');
raceAgain.addEventListener('click', function(){
  console.log('clicked to reload');
  document.location.reload(true);
});
