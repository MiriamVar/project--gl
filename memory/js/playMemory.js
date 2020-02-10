let gameBoard = []; //hracia plocha
let gameState; //aky je stav hry
let time;

let playerOne = {
  name: "",
  turn:true,
  point:0
}

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
    this.memory = null;
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
    this.flipped = !this.flipped;
  }
}

 function createGameboard() {
  for (let i = 0; i < gameBoard.length; i++) {
    // gameboard[i] = new Card("card"+i,"img/kosice/"+i+".JPG","img/kosice/empty.png");
    let x = document.createElement("IMG");
    x.setAttribute("src",gameBoard[i].src);
    x.setAttribute("id", gameBoard[i].id);
    x.setAttribute("onclick", "CardFlip("+i+")");
    let y = document.createElement("DIV");
    y.setAttribute("id", "board"+i);
    y.setAttribute("class", "boardElement");
    document.getElementById("gameboard").appendChild(y);
    document.getElementById("board"+i).appendChild(x);
  }
 }

 function end(){     //FUNKCIA PO NAJDENI VSETKYCH PAROV
    restart();
    document.getElementById("placeForCard").innerHTML="";
    playerOne.point=0;
    document.getElementById("container").style.visibility="hidden";
    document.getElementById("endGame").style.visibility="visible";
    document.getElementById('time').style.visibility="hidden";
    let winScore=(gameState.score/(gameState.clicks/2)).toFixed(3);
    console.log(winScore);
    document.getElementById("winn").innerHTML= "<h1 id='winn'> Your score is: "+(winScore*1000)+"</h1>";
    //alert("Your score is: "+ (gameState.score/(gameState.clicks/2)).toFixed(3));
  }
	
 function CardFlip(index){
  if (gameBoard[index].flipped) {
    return;
  }
  gameBoard[index].flip();
  if(gameState.memory != null) {
    match (index, gameState.memory);
    gameState.memory = null;
  }
  else {
    gameState.memory = index;
  }
  gameState.clicks++;
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
  }, 1000);
}

function restart(){
  clearInterval(time);
  document.getElementById("gameboard").innerHTML="";
  redraw();
}

function redraw(){
  document.getElementById('time').style.visibility="visible";
    if (gameState.ticks<10){ //dokoncit cas, nulky atd
      gameState.timer.innerHTML = "0"+Math.floor((gameState.ticks) / 60)+" : "+ "0" +((gameState.ticks) % 60);
    }
    else if(gameState.ticks>=10 && gameState.ticks<60){
      gameState.timer.innerHTML = "0"+Math.floor((gameState.ticks) / 60)+" : " +((gameState.ticks) % 60);
    }
    else if(gameState.ticks>=60 && gameState.ticks<599) {
        if (gameState.ticks%60<10 && gameState.ticks/60<10){
          gameState.timer.innerHTML = "0"+Math.floor((gameState.ticks) / 60)+" : "+ "0" +((gameState.ticks) % 60);
        }
        else if (gameState.ticks%60<10 && gameState.ticks/60>=10){
          gameState.timer.innerHTML = Math.floor((gameState.ticks) / 60)+" : "+ "0" +((gameState.ticks) % 60);
        }
        else if (gameState.ticks%60>=10 && gameState.ticks/60<10){
          gameState.timer.innerHTML = "0"+Math.floor((gameState.ticks) / 60)+" : "+ ((gameState.ticks) % 60);
        }
        else
        gameState.timer.innerHTML = Math.floor((gameState.ticks) / 60)+" : "+((gameState.ticks) % 60);
    }
    else{
    gameState.timer.innerHTML = Math.floor((gameState.ticks) / 60)+" : "+((gameState.ticks) % 60);
    }
    gameState.clicker.innerHTML = "Score: " + (gameState.score/(gameState.clicks/2)).toFixed(3) + "<br>"+"Clicks: "+gameState.clicks;
    if (gameState.score == 10) {
      clearInterval(time);
      gameState.clicker.style = "color: green";
    } 
}

//otacanie karty 
function flipBoard() {
  for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i].flip();
  }
  setTimeout(function(){
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i].flip();
    }
  }, 3000);
  }

let resultElementCount=0;

  function match(element, mem){ //function compare
    if (gameBoard[element].src == gameBoard[mem].src){
      gameState.score++;
      let newElement=document.createElement("IMG");
      newElement.setAttribute("src", gameBoard[mem].src);
      newElement.setAttribute("class", "resultElement");
      document.getElementById("left").appendChild(newElement);
      resultElementCount++;
      setTimeout(function() { //ak sa zhoduju, tak sa vymaze ich source a uz sa na ne nebude dat klikat
        document.getElementById(gameBoard[element].id).disabled = true;
        document.getElementById(gameBoard[mem].id).disabled = true;
        document.getElementById(gameBoard[element].id).src = "";
        document.getElementById(gameBoard[mem].id).src = "";
      }, 400);
    } else {
      setTimeout(function() { //inac sa pretocia
        gameBoard[element].flip();
        gameBoard[mem].flip();
      }, 800); 
    }
    //CardFlip().disabled=true;

    if (resultElementCount==12) {
      setTimeout(function(){
        end();
      },800);
      resultElementCount=0;
    }
  }

//upravit obrazky
  function fillGameBoard() {
    let swap=0;
    for (let i = 0; i < 24; i+=2) {
      gameBoard[i] = new Card("card" + i, "../MemoryGame/img/kosice/"+(swap)+".JPG", "../Pexeso/img/Slang/empty1.jpg"); 
      gameBoard[i+1] = new Card("card2" + (i+1), "../MemoryGame/img/kosice/"+(swap)+".JPG", "../Pexeso/img/Slang/empty1.jpg");
      swap++;
    }
    gameBoard = shuffle(gameBoard);
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


  function start() {				//pri nacitani stranky
    document.getElementById("container").style.visibility="hidden";
    shuffle(gameBoard);
    button = document.getElementById('btnP');
    button.addEventListener("click", event => {			//buttonu na posielanie mien prida akoby funkciu pri kliknuti na neho
      if(document.getElementById("P1").value ===""){
        document.getElementById("wrongInputs").innerHTML="You have to enter name.";
      }
      else if (document.getElementById("P1").value.length > 10) {
      document.getElementById("wrongInputs").innerHTML="Your name can contain max. 10 characters.";
      }
      else{
        names();
        createNameTables();
        document.getElementById("gameboard").innerHTML="";
        document.getElementById("container").style.visibility="visible";
        document.getElementById("containerNames").innerHTML="";
        document.getElementById("containerNames").style.marginTop="0%";
        setup();
  
      }
      });
  
  }

  function names(){
    playerOne.name=document.getElementById("P1").value;
  }

  function createNameTables(){

    let table1N=document.createElement("TABLE");
    table1N.setAttribute("id","table1N");
    document.getElementById('left').appendChild(table1N);
  
    let N=document.createElement("TR");
    N.setAttribute("id","mytr");
    document.getElementById("table1N").appendChild(N);
  
    let y = document.createElement("TD");
    let t = document.createTextNode(playerOne.name);
    y.appendChild(t);
    document.getElementById("mytr").appendChild(y);
  }

  function reloading() {
    location.reload();
}