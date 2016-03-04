console.log('app.js loaded');



/////GLOBAL VARIABLES/////
var mazeGame;
var welcomeBox;
var title;
var clickToPlay;
/////////////////////////


clickToPlay = document.querySelector('.submitButton');
  clickToPlay.addEventListener('click', function(){
    alert('clicked to play');
    // playMaze(); //does not play maze, instead refreshes the page
  });


function playMaze(){
  console.log('ready. set. go!')

  title = document.querySelector('h1');
  title.style.color = 'black';

  mazeGame = document.querySelector('.maze-game');
  welcomeBox = document.querySelector('.welcome');
  mazeGame.removeChild(welcomeBox);

  startGame()
}





/////// WIN BOX
