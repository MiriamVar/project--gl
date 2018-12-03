let gameboard = []

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
    let y = document.createElemnt("DIV");
    y.setAttribute("id", "board"+ei);
    y.setAttribute("class", "boardElement");
    document.getElementById("gameboard").appendChild(y);
    document.getElementById("board"+i).appendChild(x);
  }
 }

 function CardFlip(index){
  gameboard[index].flip();
 }

function setup(){
  createGameboard();
  flipBoard();
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

  function match(){
    
  }