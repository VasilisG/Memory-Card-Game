var imageSources = ["res/face_1.png",
                   "res/face_2.png",
                   "res/face_3.png",
                   "res/face_4.png",
                   "res/face_5.png",
                   "res/face_6.png",
                   "res/face_7.png",
                   "res/face_8.png",
                   "res/face_9.png",
                   "res/face_10.png"];

var NUM_OF_CARDS = 20;
var firstCard = null;
var secondCard = null;
var matches = 0;

function setOpacityToCells(){
    var i;
    cells = document.getElementsByTagName("td");
    for(i=0; i<cells.length; i++) {
        cells[i].className = "cell";
    }
}

function generateRandomNumbers() {
    numbers = [];
    dups = [];
    var i;
    for(i=0; i<20; i++) {
        while(true) {
            number = Math.floor(Math.random() * 20 + 1);
            if(!dups.includes(number)) {
                numbers.push(number);
                dups.push(number);
                break;
            }
        }
    }
    return numbers;
}

function getCardElements() {
    cards = [];
    var i;
    for(i=0; i<NUM_OF_CARDS; i++) {
        idName = "image" + (i+1);
        card = document.getElementById(idName);
        card.className = "initCard";
        card.onclick = function() {
            if(firstCard === null || secondCard === null){
                if(firstCard === null) firstCard = this;
                else if(this !== firstCard && secondCard === null) secondCard = this;
                this.className = "visibleCard";
            }  
        };
        cards.push(card);
    }
    return cards;
}

function createMatches(imageSources, cards, numbers) {
    var i;
    for(i=0; i<imageSources.length; i++) {
        cards[numbers[i*2]-1].src = imageSources[i];
        cards[numbers[i*2+1]-1].src = imageSources[i];
    }
}

function setTiming(){
    if(firstCard !== null && secondCard !== null){
        window.setTimeout(function() {
            if(firstCard.src === secondCard.src){
                firstCard.className = "discoveredCard";
                secondCard.className = "discoveredCard";
                firstCard.parentElement.className = "inactiveCell";
                secondCard.parentElement.className = "inactiveCell";
                matches++;
            
                updateProgressInfo();
            }
            else {
                firstCard.className = "card";
                secondCard.className = "card";
            }
            firstCard = null;
            secondCard = null;         
        }, 750);
    }
}

function setDivListener(){
    var container = document.getElementById("cardTableContainer");
    container.onclick = setTiming;
}

function resetCards(){
    var i;
    for(i=0; i<cards.length; i++){
        cards[i].className = "card";
        cards[i].parentElement.className = "cell";
    }
}

function setRestartButtonListener(){
    var restartButton = document.getElementById("restart");
    restartButton.addEventListener("click", function() {
        matches = 0;
        resetCards();
        initProcess();
        updateProgressInfo();
    });
}

function updateProgressInfo(){
    progressInfo = document.getElementById("progressInfo");
    progressInfo.innerHTML = "Matches found: " + matches + " / " + (NUM_OF_CARDS / 2);
}

function initProcess(){
    cards = getCardElements();
    numbers = generateRandomNumbers();
    createMatches(imageSources, cards, numbers);
}

window.addEventListener("load", function() {
    setOpacityToCells();
    setDivListener();
    setRestartButtonListener();
    updateProgressInfo();
    initProcess();
});