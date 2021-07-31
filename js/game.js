let $$ = select => document.querySelector(select);
let $$All = select => document.querySelectorAll(select);
document.documentElement.style.overflowX = "hidden";
let key;
let data;
let values = [];
let getValues = function () {
    for (let x = 0; x < localStorage.length; x++) {
        key = localStorage.key(x);
        data = localStorage.getItem(localStorage.key(x));
        values[key] = data;
    }
};
document.addEventListener("load", getValues(), false);

// -------------------------game---------------------------

const suit = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
const rank = ['Ace', "2", "3", "4", "5", "6", "7", "8", "9", "10", 'Jack', 'Queen', 'King'];
const colour = ['Red', 'Black'];
const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

let tableau = [];
let columnOne = [];
let columnTwo = [];
let columnThree = [];
let columnFour = [];
let columnFive = [];
let columnSix = [];
let columnSeven = [];
let drawPile = [];
let stockPile = [];
let hearts = [];
let clubs = [];
let diamonds = [];
let spades = [];


let elDisplay = [];

for (let x = 0; x < 13; x++)
    elDisplay[x] = $$(`#col${x}`);

let displayStockPile = function () {
    elDisplay[8].innerHTML = ``;
    for (y = 0; y < tableau[8].length; y++)
        if (tableau[8][y].faceUp === true)
            elDisplay[8].innerHTML += `<img src="${tableau[8][y].imgCard}" id="${tableau[8][y].name()}" class="stock" alt="card">`;
    if (tableau[7].length > 0)
        elDisplay[7].innerHTML = `<img src="images/cards/FaceDown.svg" alt="card" class="draw" alt="card">`;
    else
        elDisplay[7].innerHTML = `<img src="images/cards/Empty.svg" alt="card" class="draw" alt="card">`;
};

let displayCardsColumns = function () {
    for (let x = 0; x < tableau.length; x++)
        elDisplay[x].innerHTML = "";
    for (let x = 0; x < tableau.length; x++) {
        if (tableau[x].length > 0) {
            for (let y = 0; y < tableau[x].length; y++) {
                if (tableau[x][y].faceUp === true)
                    elDisplay[x].innerHTML += `<img src="${tableau[x][y].imgCard}" id="${tableau[x][y].name()}" class="tableauCard">`;
                else
                    elDisplay[x].innerHTML += `<img src="images/cards/FaceDown.svg" alt="card" id="${tableau[x][y].name()}" class="tableauCard">`;
            }
        } else
            elDisplay[x].innerHTML = `<img src="images/cards/Empty.svg" alt="card" id="card" class="tableauCard" >`
    }

    displayStockPile();

    if (hearts.length > 0)
        elDisplay[9].innerHTML = `<img src="${hearts[(hearts.length - 1)].imgCard}" id="col9" class="tableauColumn" alt="card">`;
    if (clubs.length > 0)
        elDisplay[10].innerHTML = `<img src="${clubs[(clubs.length - 1)].imgCard}" id="col10" class="tableauColumn" alt="card">`;
    if (diamonds.length > 0)
        elDisplay[11].innerHTML = `<img src="${diamonds[(diamonds.length - 1)].imgCard}" id="col11" class="tableauColumn" alt="card">`;
    if (spades.length > 0)
        elDisplay[12].innerHTML = `<img src="${spades[(spades.length - 1)].imgCard}" id="col12" class="tableauColumn" alt="card">`;
};

let moveCardImage = function (cardObj, colID) {
    colID--;
    displayCardsColumns();
    $(`#${cardObj.name()}`).hide().fadeIn(200, displayCardsColumns);
};

function Player(_firstName, _lastName, _username, _postalCode, _email, _phoneNumber, _money, _lastVisit, _currentVisit, _firstVisit) {
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.username = _username;

    this.postalCode = _postalCode;

    this.email = _email;
    this.phoneNumber = _phoneNumber;
    this.money = _money;

    this.bet = 0;
    this.totalWin = 0;
    this.lastVisit = _lastVisit;
    this.currentVisit = _currentVisit;
    this.firstVisit = _firstVisit;

    let qTotal = $$("#qTotalWin");
    this.getFullName = function () {
        return `${this.firstName} ${this.lastName}`
    };

    this.placeBet = function (bet) {
        this.bet = bet;
        this.totalWin = (bet * -1);
        qTotal.innerHTML = this.totalWin;
    };
    this.setPayout = function (bet) {
        this.payout = this.bet / 52 * 5;
    };
    this.updateTotalWin = function () {
        this.totalWin += this.payout;
        qTotal.innerHTML = this.totalWin;
    };
    this.totalMoney = function (numCards) {
        this.money += (numCards * this.payout) - this.bet;
        return this.money;
    };
    this.displayPlayer = function () {
        let elqAmount = $$("#qAmount");
        let elWelcome = $$("#welcome");
        let elInfo = $$("#info");
        let elBank = $$("#bank");
        let elLastV = $$("#lv");
        elqAmount.innerHTML = this.money;

        elWelcome.innerHTML = `${(this.lastVisit === this.currentVisit && this.firstVisit===true)? "Welcome" : "Welcome back"} ${this.getFullName()}.`;
        elInfo.innerHTML = `Your phone number is : ${this.phoneNumber} and your postal code is ${this.postalCode}.`;
        elBank.innerHTML = `You have $${this.money} left in your bank roll.`;
        elLastV.innerHTML = `${this.lastVisit === this.currentVisit? "":"Your last visit was " + this.lastVisit}`;
        signOut.innerHTML = `Not ${this.getFullName()}? <a id="changePlayer">Change your credentials</a>`;
        localStorage.setItem('firstVisit', false);
    }
} // Player object

function Card(_rank, _suit, _value, _colour) {
    this.rank = _rank;
    this.suit = _suit;
    this.value = _value;
    this.colour = _colour;
    this.faceUp = false;
    this.play = false;
    this.playableFoundation = false;

    this.name = function () {
        let r = (this.rank == "10") ? this.rank : this.rank.substring(0, 1);
        let s = this.suit.substring(0, 1);
        return r + s;
    };

    this.imgCard = `images/cards/${this.rank}_${this.suit}.svg`;

    this.word = function () {
        return `${this.rank} of ${this.suit}`;
    };

    this.flip = function () {
        this.faceUp = !(this.faceUp);
    };

    this.changePlay = function () {
        this.play = !(this.play);
    };
    this.changePlayFound = function () {
        this.playableFoundation = !(this.play);
    }

} // Card object


function Deck() {
    this.deck = [];
    for (let i = 0; i < suit.length; i++)
        for (let x = 0; x < rank.length; x++)
            this.deck[this.deck.length] = new Card(rank[x], suit[i], value[x], colour[i % 2]);
    // creates deck automatically : new Deck()
    this.shuffle = function () {
        let x = 0;
        while (x < 9) {
            for (let i = (this.deck.length - 1); i >= 0; i--) {
                let rand = Math.floor((Math.random() * (i + 1)));
                let temp = this.deck[i];
                this.deck[i] = this.deck[rand];
                this.deck[rand] = temp;
            } // for (let i = (arr.length - 1); i > 0; i--)
            x++;
        }
    }; // shuffle()
    this.deal = function () {

        let y = 0;
        for (let x = 0; x <= 7; x++) {
            if (x <= 0) {
                columnOne[x] = this.deck[y];
                y++;
            }
            if (x <= 1) {
                columnTwo[x] = this.deck[y];
                y++;
            }
            if (x <= 2) {
                columnThree[x] = this.deck[y];
                y++;
            }
            if (x <= 3) {
                columnFour[x] = this.deck[y];
                y++;
            }
            if (x <= 4) {
                columnFive[x] = this.deck[y];
                y++;
            }
            if (x <= 5) {
                columnSix[x] = this.deck[y];
                y++;
            }
            if (x <= 6) {
                columnSeven[x] = this.deck[y];
                y++;
            }

        } // for(let x = 0; x <= 7; x++)
        let x = 0;
        for (let k = y; k < this.deck.length; k++) {
            drawPile[x] = this.deck[k];
            x++
        }
        tableau[0] = columnOne;
        tableau[1] = columnTwo;
        tableau[2] = columnThree;
        tableau[3] = columnFour;
        tableau[4] = columnFive;
        tableau[5] = columnSix;
        tableau[6] = columnSeven;
        tableau[7] = drawPile;
        tableau[8] = stockPile;
        // initializes faceUp and displays
        if (tableau.length > 0)
            for (let x = 0; x < tableau.length - 1; x++) {
                let last = ((tableau[x].length) - 1);
                if (tableau[x].length > 0) {
                    tableau[x][last].faceUp = true;
                    tableau[x][last].play = true;
                }
            }
        displayCardsColumns();
    } // Deck.deal()

} // Deck object

let faceUpLastCard = function (array) {
    let last;
    for (let x = 0; x < array.length; x++) {
        last = (array.length - 1);
        array[last].faceUp = true;
        array[last].play = true;
    }
};

function Game(deck, tableau) {
    let error = $$("#errorMsg");

    this.findCard = function (card) {
        let found = false;
        for (let x = 0; x < deck.length && found === false; x++)
            if (card === deck[x].name()) {
                card = deck[x];
                found = true;
            }
        return card;
    };

    this.moveValidation = function (card, target) {
        let move = false;
        //find card
        card = this.findCard(card);

        //find drawColumn >
        let drawColumn;
        let draw;
        for (let x = 0; x < tableau.length; x++)
            for (let y = 0; y < tableau[x].length; y++)
                if (card == tableau[x][y]) {
                    drawColumn = tableau[x];
                    draw = x;
                }
        //set target Column >
        let targetColumn = tableau[(target - 1)];
        //set target Card >
        let targetCard = targetColumn[(targetColumn.length - 1)];
        if (targetColumn.length > 0) {
            if (card.faceUp === true && card.play === true && targetCard.faceUp === true && (!(card.colour === targetCard.colour)) && (card.value === (targetCard.value - 1))) {
                move = true;
            }
        } else if (card.faceUp === true && card.play === true && card.value === 13) {
            move = true;
        }
        if (move === true) {
            let count = drawColumn.length - drawColumn.indexOf(card); // if moving more than one card
            for (x = drawColumn.indexOf(card); x < drawColumn.length; x++){
                targetColumn[targetColumn.length] = drawColumn[x];
            }
            drawColumn.length -= count;
            faceUpLastCard(drawColumn);

            $(`#${card.name()}`).fadeOut(500, () => {
                $(`#${card.name()}`).remove();
                moveCardImage(card, target);
            });
            
        }
        return move;
    };

    this.moveToFoundation = function (card) {
        let move = false;
        let foundationArray;
        let foundation = card.slice(-1);
        // find foundation >
        if (foundation === "H") {
            foundation = "Hearts";
            foundationArray = hearts;
        } else if (foundation === "D") {
            foundation = "Diamonds";
            foundationArray = diamonds;
        } else if (foundation === "S") {
            foundation = "Spades";
            foundationArray = spades;
        } else if (foundation === "C") {
            foundation = "Clubs";
            foundationArray = clubs;
        }

        // find the card >
        card = this.findCard(card);

        //find drawColumn >
        let column; // the column array
        let draw; // the index
        for (let x = 0; x < tableau.length; x++)
            for (let y = 0; y < tableau[x].length; y++)
                if (card == tableau[x][y]) {
                    column = tableau[x];
                    draw = x;
                }
        else {
            move = false;
        }
        // logic >
        let valid = false;
        if (card.faceUp && card.play && card.suit === foundation) {
            valid = true;
        }

        if (foundationArray.length > 0) {
            let last = (foundationArray.length - 1);
            if (foundationArray[last].value === (card.value - 1) && valid) {
                foundationArray.push(card);
                column.length -= 1;
                card.play = false;
                faceUpLastCard(column);
                displayCardsColumns(); // moves card
                myPlayer.updateTotalWin();
                move = true;
            } // if card matches suit and is the right value
            else
                move = false;
        } // if the foundation is not empty
        else
        if (card.value === 1 && valid) {
            foundationArray.push(card);
            card.play = false;
            column.length -= 1;
            faceUpLastCard(column);
            displayCardsColumns(); // moves card
            myPlayer.updateTotalWin();
            move = true;
        } else {
            move = false;
        }
        if (move)
            this.determineWin();
        return move;
    }; // moveToFoundation()

    this.moveCardToStockPile = function (draw, take) {
        let move = false;
        if (draw.length >= 3) {
            if (take.length > 0) {
                for (x = 0; x < take.length; x++)
                    take[x].faceUp = false;
            } // flips the current cards in stockPile

            for (let x = 0; x < 3; x++) {
                draw[draw.length - 1].faceUp = true;
                take.push(draw[draw.length - 1]);
                draw.pop();
            } // loops 3 cards and adds them to the stock pile
            take[take.length - 1].play = true; // makes last card in stock pile playable
            displayStockPile(); //
        } // if there are three or more cards in the draw pile, adds 3 cards to the stock pile
        else if (draw.length < 3 && draw.length > 0) {
            if (take.length > 0) {
                for (x = 0; x < take.length; x++)
                    take[x].faceUp = false;
            } // flips the current cards in stockPile
            let num = draw.length;
            for (let x = 0; x < num; x++) {
                draw[draw.length - 1].faceUp = true;
                take.push(draw[draw.length - 1]);
                draw.pop();
            } // loops for the remaining cards
            take[take.length - 1].play = true;
            displayStockPile(); //
        } // if drawPile is < 3 && > 0
        else {
            take.reverse();
            for (let x = 0; x < take.length; x++) {
                take[x].faceUp = false;
                take[x].play = false;
                draw[x] = take[x];
            }
            take.length = 0;
            displayStockPile(); //
        }

    }; // moveCardToStockPile()


    this.quitGame = function () {
        totalCards = hearts.length + spades.length + diamonds.length + clubs.length;
        localStorage.setItem('totalWon', myPlayer.totalWin);
        let bank = myPlayer.totalMoney(totalCards);
        localStorage.setItem('bankRoll', bank);
        location.href = "quit.html";

    }; // quitGame();

    this.determineWin = function () {
        if (hearts.length === 13 && spades.length === 13 && diamonds.length === 13 && clubs.length === 13) {
            totalCards = hearts.length + spades.length + diamonds.length + clubs.length;
            localStorage.setItem('totalWon', myPlayer.totalWin);
            let bank = myPlayer.totalMoney(totalCards);
            localStorage.setItem('bankRoll', bank);
            location.href = "win.html";
        }
    } // determineWin()
} // Game object (deck, tableau)



function startGame(amount) {
    let elBet = $("#betAmount"); // span for slider
    let elqBet = $$("#qBet"); // span tag to display bet
    let bet = parseInt(elBet.text().substring(1));
    let elDisplayPlayer = $$("#displayPlayer");
    //validates bet >
    let validateBet = function () {
        if (bet > amount || amount < 52) {
            errorBet.innerHTML = "You do not have enough money in your account to make a bet.";
            return false;
        }
        if (bet == 0) {
            errorBet.innerHTML = "Please make a bet and click Start.";
            return false;
        }
        if (bet < 52) {
            errorBet.innerHTML = "Your bet must be a multiple of 52.";
            return false;
        }
        if (bet <= amount && bet >= 52) {
            errorBet.innerHTML = "";
            return true;
        }
    };
    // starts game >
    if (validateBet()) {
        let elContainer = $$(".tableau");
        // hides / displays content >
        elContainer.style.display = 'block';
        startBtn.disabled = true;
        startBtn.style.display = 'none';
        $$('#enterBet').style.display = 'none';
        elDisplayPlayer.style.position = "relative";
        $$(".nav").style.display = "flex";
        $$("#displayPlayer").style.display = "block";


        //creates game>
        let myDeck = new Deck();
        myDeck.shuffle();
        myDeck.deal();
        let myGame = new Game(myDeck.deck, tableau);
        elqBet.innerHTML = bet;
        myPlayer.placeBet(bet);
        myPlayer.setPayout(bet);

        let elColumns = $$All(".tableauColumn");
        let elStock = $$(".stockPile");
        click = 0;
        let selectedCardID = undefined;
        let selectedRowID = undefined;
        let selectedElement = undefined;
        let selectCardAndColumn = function (ev) {

            if (click < 1) {
                if (!(ev.target.id.slice(0, 3) === "col")) {
                    selectedCardID = ev.target.id;

                    let card = myGame.findCard(selectedCardID);
                    if (card.faceUp && card.play) {
                        selectedElement = ev.target;
                        ev.target.style.opacity = "0.5";

                    }
                }
            }
            if (!(selectedCardID === undefined || selectedCardID == ""))
                click++;

            if (click > 1 && (!(selectedElement === undefined || selectedElement == ""))) {
                selectedRowID = (1 + parseInt(this.id.substring(3)));
                selectedElement.style.removeProperty("opacity");

                click = 0;
                if (selectedRowID < 8)
                    myGame.moveValidation(selectedCardID, selectedRowID);
                else
                    myGame.moveToFoundation(selectedCardID);
                selectedCardID = undefined;
            }
        };

        let cardToFoundation = function (ev) {
            if (click < 1) {
                if (!(ev.target.id.slice(0, 3) === "col")) {
                    selectedCardID = ev.target.id;
                    let validMove = myGame.moveToFoundation(selectedCardID);
                    click = 0;
                    let elRocketDiv = $$("#rocketDiv");
                    if (validMove) {
                        elRocketDiv.innerHTML = '<img src="images/SpaceShip.svg" id="rocket" alt="rocket"/>';
                        let elRocket = $$("#rocket");
                        let leftPos = -10;
                        let topPos = 25;
                        let rot = 75;
                        let moveAni = function () {
                            elRocketDiv.style.left = leftPos + "px";
                            elRocketDiv.style.top = topPos + "px";
                            elRocket.style.transform = `rotate(${rot}deg)`;
                            elRocket.style.transition = "linear";

                            leftPos += 70;
                            topPos += 10;
                            rot += 1;
                            if (leftPos > 2000) {
                                clearInterval(myAnimation);
                                leftPos = -50;
                                topPos = 25;
                                rot = 150;
                            }

                        };
                        document.documentElement.style.overflowX = 'hidden';
                        let myAnimation = setInterval(moveAni, 50);
                        elRocketDiv.style.left = "0px";
                        elRocketDiv.style.top = "25px";
                    }
                }
            }

        };
        for (el of elColumns) {
            el.addEventListener("click", selectCardAndColumn, true);
            el.addEventListener("dblclick", cardToFoundation, true);
        }

        elStock.addEventListener("click", selectCardAndColumn, true);
        elStock.addEventListener("click", cardToFoundation, true);
        elStock.addEventListener("dblclick", cardToFoundation, true);

        let elDrawClass = $$(".drawPile");
        elDrawClass.addEventListener("click", () => {
            myGame.moveCardToStockPile(tableau[7], tableau[8])
        }, false);

        let quitBtn = $$("#quit");
        quitBtn.addEventListener("click", myGame.quitGame, false);

        let cheatWin = function () {

            let moveAllToFoundation = function (card, col) {
                if (card.suit === 'Hearts') {
                    hearts.push(card);
                    col.shift();
                    displayCardsColumns();
                } else if (card.suit === 'Diamonds') {
                    diamonds.push(card);
                    col.shift();
                    displayCardsColumns();
                } else if (card.suit === 'Spades') {
                    spades.push(card);
                    col.shift();
                    displayCardsColumns();
                } else if (card.suit === 'Clubs') {
                    clubs.push(card);
                    col.shift();
                    displayCardsColumns();
                }

            };
            for (let x = 0; x < tableau.length; x++) {
                for (let i = 0; i < tableau[x].length; i++) {
                    moveAllToFoundation(tableau[x][i], tableau[x]);
                    i--;
                }
            }
            displayCardsColumns();
            myGame.determineWin();
        };

        $$('#cheat').addEventListener('click', cheatWin, false);
    }
}

//creates player and starts game >
let myPlayer = new Player(values['firstName'], values['lastName'], values['username'], values['pCode'].toUpperCase(), values['email'], values['phoneNum'], parseInt(values['bankRoll']), values['lastVisit'], values['currentVisit'], values['firstVisit']);
myPlayer.displayPlayer();
let startBtn = $$("#start");
let amt = values['bankRoll'];
startBtn.addEventListener("click", () => {
    startGame(parseInt(amt));
}, false);

// change player >
let removeLocalStorage = function () {
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.removeItem("pCode");
    localStorage.removeItem("phoneNum");
    localStorage.removeItem("username");
    localStorage.removeItem("bankRoll");
    localStorage.removeItem("lastVisit");
    location.href = "intro.html";
};

let changePlayer = $$("#changePlayer");
changePlayer.addEventListener("click", removeLocalStorage, false);

let handleError = function (event) {
    alert("An error has occured.");
};

window.addEventListener("error", handleError, false);

$(function () {
    $("#betSlider").slider({
        value: 0,
        min: 0,
        max: myPlayer.money,
        step: 52,
        slide: function (ev, ui) {
            $("#betAmount").text("$" + ui.value);
        }
    });
});