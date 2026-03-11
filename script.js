'use strict';
//selecting elements
const player0EL=document.querySelector('.player--0');
const player1EL=document.querySelector('.player--1');
const score0EL=document.querySelector('#score--0');
const score1EL=document.getElementById('score--1');
const current0EL=document.getElementById('current--0');
const current1EL=document.getElementById('current--1');
const diceEl=document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnROll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');

////The starting condition of the game////
let scores, currentScore, activePlayer, playing;
const init= function(){
playing=true;
scores=[0,0];
currentScore=0;
activePlayer=0;
score0EL.textContent=0;
score1EL.textContent=0;
current0EL.textContent=0;
current1EL.textContent=0;
diceEl.classList.add('hidden');
    
player0EL.classList.remove('player--winner')
player1EL.classList.remove('player--winner')
player0EL.classList.add('player--active')
player1EL.classList.remove('player--active')

};
init();

//switch player function
const switchPlayer= function(){
     document.getElementById(`current--${activePlayer}`).textContent=0;
        currentScore=0;
        activePlayer=activePlayer===0?1:0;    
        player0EL.classList.toggle('player--active');
        player1EL.classList.toggle('player--active');
        
}
// rolling dice function
btnROll.addEventListener('click', function(){
    if(playing){
    //1. generating a random dice number
    const dice= Math.trunc(Math.random()*6)+1;

    //2. Display the dice rolled
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${dice}.png`;

    //3. Check for rolled 1
    if(dice!==1){
        //Add score to current score
        currentScore+=dice;
        // displayScore0.textContent=currentScore;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;

    }else{
        //Switch to next player
        scores[activePlayer]=0;
        document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

       switchPlayer();
    }
}
})

//hold button 
btnHold.addEventListener('click', function(){
    if(playing){
    // 1. Add current score to active player's total score
    scores[activePlayer]+=currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
   //2. check if the score>=100.. if yes? then the player wins and the game stops
   if(scores[activePlayer]>=30){
    //finish the game
    playing=false;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    diceEl.classList.add('hidden');
   }
    else{switchPlayer()};
}
})

//new button 
btnNew.addEventListener('click',init);

