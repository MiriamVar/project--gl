let gameboard = []; //hracia plocha
let gameState; //aky je stav hry
let time;

class GameState {
  constructor() {
    this.memory = null;
    this.score = 0;
    this.clicks = 0;
    this.clicker = document.getElementById("clicker");
    this.timer = document.getElementById("timer");
    this.ticks = 0;
  }

  restart(){
    this.ticks = 0;
    this.memory = 0;
    this.score = 0;
    this.clicks = 0;
  }
}

class Card {
  constructor(id, src, alterSrc) {
    this.id = id;    //vonkajsi parameter je ten za rovna sa  ... to je prijaty
    this.src = src;  //obr
    this.alterSrc = alterSrc; //vrchna karta
    this.flipped = false;
  }
  flip() {
    if(this.flipped){
      document.getElementById(this.id).src = this.alterSrc;
    } else {
      document.getElementById(this.id).src = this.src;
    }
    this.flipped =!this.flipped;
  }
}

 function createGameboard() {
  for (let i = 0; i < 5; i++) {
    gameboard[i] = new Card("card"+i,"img/kosice/"+i+".JPG","img/kosice/empty.png");
    let x = document.createElement("IMG");
    x.setAttribute("src",gameboard[i].src);
    x.setAttribute("id", gameboard[i].id);
    x.setAttribute("onclick", "CardFlip("+i+")");
    let y = document.createElement("DIV");
    y.setAttribute("id", "board"+i);
    y.setAttribute("class", "boardElement");
    document.getElementById("gameboard").appendChild(y);
    document.getElementById("board"+i).appendChild(x);
  }
 }

 function CardFlip(index){
  if (gameboard[index].flipped) {
    return;
  }
  gameboard[index].flip();
  if(gameState.memory != null) {
    match (index, gameState.memory);
    gameState.memory = null;
  }
  else {
    gameState.memory = index;
  }
  gameState.clicks++;
 }

function flipBoard() {
  for ( let i = 0; i < gameboard.length; i++){
    gameboard[i].flip();
  }
  setTimeout(function() {
    for (let i = 0; i < gameboard.length; i++) {
      gameboard[i].flip();
    }
  }, 3000);
}

function setup(){
  fillGameBoard();
  createGameboard();
  flipBoard();
  gameState = new GameState();
  time = setInterval(function() {
    if (gameState.clicks > 0) {
      gameState.ticks++;
      redraw();
    }
  }, 100);
}

function restart(){
  clearInterval(time);
  document.getElementById("gameboard").innerHTML="";
  setup();
  redraw();
}

function redraw(){
  function redraw() {
    if (gameState.ticks<10){ //dokoncit cas, nulky atd
      gameState.timer.innerHTML = "0"+Math.floor((gameState.ticks) / 60)+" : "+ "0" +((gameState.ticks) % 60);
    }
    else if(gameState.ticks>=10 && gameState.ticks<60){
      gameState.timer.innerHTML = "0"+Math.floor((gameState.ticks) / 60)+" : " +((gameState.ticks) % 60);
    }
    else if((gameState.ticks>=60 && gameState.ticks<599) && (gameState.ticks%60<10 && gameState.ticks/60<10)) {
      gameState.timer.innerHTML = "0"+Math.floor((gameState.ticks) / 60)+" : "+ "0" +((gameState.ticks) % 60);
    }
    else {
      gameState.timer.innerHTML = Math.floor((gameState.ticks) / 60)+" : "+((gameState.ticks) % 60);
    }
    gameState.clicker.innerHTML = "Score: " + (gameState.score/(gameState.clicks/2)).toFixed(3) + "   Clicks: "+gameState.clicks;
    if (gameState.score == 10) {
      clearInterval(time);
      gameState.clicker.style = "color: green";
    }
  } 
}



//otacanie karty 
function flipBoard() {
  for (i = 0; i < gameboard.length; i++) {
    gameboard[i].flip();
  }
  setTimeout(function(){
    for (i = 0; i < gameboard.length; i++) {
      gameboard[i].flip();
    }
  }, 2000)
  }

  function match(element, mem){ //function compare
    if (gameboard[element].src == gameboard[mem].src){
      gameState.score++;
      setTimeout(function() { //ak sa zhoduju, tak sa vymaze ich source a uz sa na ne nebude dat klikat
        document.getElementById(gameboard[element].id).disabled = true;
        document.getElementById(gameboard[mem].id).disabled = true;
        document.getElementById(gameboard[element].id).src = "";
        document.getElementById(gameboard[mem].id).src = "";
      }, 400);
    } else {
      setTimeout(function() { //inac sa pretocia
        gameboard[element].flip();
        gameboard[mem].flip();
      }, 800);
    }
  }

  function fillGameBoard() {
    for (let i = 0; i < 24; i=+2) {
      gameboard[i] = new Card("card" + i), "img/kosice/"+i+".JPG", "img/kosice/empty.png";
      gameboard[i+1] = new Card("card2" + i), "img/kosice/"+i+".JPG", "img/kosice/empty.png";
    }
    gameboard = shuffle(gameboard);
  }


  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    for (let i = 0; i < 2; i++) {
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    }
    return array;
  }