let $$ = select => document.querySelector(select);
let endAmount = $$("#endAmount");
let totalWon = $$("#totalWon");
let playAgain = $$("#playAgain");
let total = localStorage.getItem('totalWon');
let bank = localStorage.getItem('bankRoll');

totalWon.innerHTML += total >= 0 ? `Won: $${total}` : `Lost: $${total*-1}`;
endAmount.innerHTML += bank;

let play = function() {
    location.href = "intro.html";
};


playAgain.addEventListener("click", play, false);