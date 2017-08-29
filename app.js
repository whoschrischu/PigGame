/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying;

init();


//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em';


document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){
    //1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
      //Math.random() comes up with a random number between 1 and 0
      //Multiplying by 6 would generate a number between 0 and 5
      //Math.floor() gets rid of any decimals and only leaves an integer
      //Adding 1 makes the range 1-6

    //2. Display the result
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';

    //3. Update the round score IF the rolled number was NOT a 1
    if(dice !== 1){
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
      //Add CURRENT score to GLOBAL score
      scores[activePlayer] += roundScore;

      //Update the UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      //Check if the player won the game
      if(scores[activePlayer] >= 100){
          document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
          document.querySelector('.dice').style.display = 'none';
          document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
          document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
          gamePlaying = false;
      }
      else{
        nextPlayer();

      }
    }


    //Next Player
    //nextPlayer();
});

function nextPlayer (){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  //Ternary operators
  //Same thing as
  /*if (activePlayer === 0){
    activePlayer = 1;
  }else{
    activePlayer = 0;
  }*/

  roundScore = 0;

  //statement before and after ? is the IF STATEMENT
  //statement after : is the ELSE STATEMENT
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');


}




/*

3 CODING CHALLENGES
Change the game to follow these rules:

1. A player loses his ENTIRE score when he rolls two 6 in a row. AFter that, it's the next player's turn.

2. Add an input field to the HTML where players can set the winning score, so that they can change the
   predefined score of 100.
   (Hint: you can read that value with the .value propert in JavaSCript.
          This is a good opportunity to use Google to figure this out.)

3. Add another dice to the game, so that there are two dice now. The player loses his current score
   When one of them is a 1.
   (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one)
