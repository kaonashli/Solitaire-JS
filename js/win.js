let $$ = select => document.querySelector(select);
let endAmount = $$("#endAmount");
let totalWon = $$("#totalWon");
let playAgain = $$("#playAgain");
let total = localStorage.getItem('totalWon');
let bank = localStorage.getItem('bankRoll');
document.documentElement.style.overflow = "hidden";

let play = function(){
    location.href="index.html";
};

playAgain.addEventListener("click", play, false);

let randomColour = () => Math.floor(Math.random() * 16777215).toString(16);

const startPos = window.innerWidth;
const dx = 10;
let currPos = startPos;

let setUp = function () {
    let elCanvas = $$("#myCanvas");
    elCanvas.width = window.innerWidth;
    elCanvas.heigth = 300;
    let context = elCanvas.getContext('2d');
    if(window.innerHeight > 480)
    context.font = "80pt Roboto Mono, monospace";
    else
    if(window.innerHeight <=480)
    context.font = "40pt Roboto Mono, monospace";
    setInterval(() => {scrollText(context);}, 50);
};

let scrollText = function (context) {
    context.fillStyle = `#${randomColour()}`;
    if (currPos < -350)
        currPos = startPos;
    else
        currPos -= dx;

    context.clearRect(0, 0, window.innerWidth, 400); // redraws canvas
    context.fillText("You Won!", currPos, 150);
};


setUp();

