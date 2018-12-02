// napevno nie
let sizeX = 3;
let sizeY = 4;

let gameboard = []
disableRestart();			//NA ZACIATKU SA DA KLIKNUT LEN NA NEW GAME

function createGameboard() {
	let swap = 0;
	for (var i = 1; i <= (sizeX * sizeY) / 2; i++) {
		for (var j = 0; j < 2; j++) {
			gameboard[swap] = {
				id: "card" + i + "_" + j,
				src: "obr/" + i + ".jpg",
				name: "card" + i,
				flipped: false				//STAV, CI JE KARTA OTOCENA, TRUE=OTOCENA, FALSE=NIE JE OTOCENA
			}
			swap++;
		}

	}
	console.log(gameboard);
}

function shuffle() {					//FUNKCIA NA NAHODNE PREHADZANIE KARIET
	//createGameboard();
	resetVars();
	for (i = 0; i < gameboard.length; i++) {
		let rand = Math.trunc(Math.random() * gameboard.length);
		let swap = gameboard[rand];
		gameboard[rand] = gameboard[i];
		gameboard[i] = swap;
	}
}

function create() {
	clearBoard();
	createGameboard();
	shuffle();				//FUNKCIA NA VYKRESENIE ZATIAL TOTAAAALNA BETA VERZIA
	disableNewGame();
	enableRestart();
	for (i = 0; i < gameboard.length; i++) {
		let x = document.createElement("IMG");
		x.setAttribute("src", "obr/empty.png");
		x.setAttribute("id", gameboard[i].id);
		x.setAttribute("name", gameboard[i].name);
		x.setAttribute("onclick", "match()");
		document.getElementById("div").appendChild(x);
	}
}

function disableNewGame() {			//ZNEMOZNI KLIKNUT NA NEW GAME
    document.getElementById('newGame').disabled = true;
}

function enableNewGame() {			//OPAT JE MOZNE KLIKNUT NA NEW GAME
    document.getElementById('newGame').disabled = false;
}

function disableRestart() {			//ZNEMOZNI KLIKNUT NA RESTART
    document.getElementById('restart').disabled = true;
}

function enableRestart() {			//OPAT JE MOZNE KLIKNUT NA RESTART
    document.getElementById('restart').disabled = false;
}

//PREMENNE PRE FUNKCIU MATCH	
let countcardF = 0;
let countcardT = 0;
let clicker = 0;
let memoryname;
let memoryid;

let points = 0;

function flipCard(id) {			//FUNKCIA OTOCI KARTU PO KLIKNUTI
	for (let i = 0; i < gameboard.length; i++) {
		if (gameboard[i].id === id) {
			gameboard[i].flipped = true;
		}
	}
}

function resetFlip() {	//Prejde cez cele pole a vsetky karty oznaci ako false (pretoci ich)
	for (let i = 0; i < gameboard.length; i++) {
		gameboard[i].flipped = false;
	}
}



function repaint() {	// FUNKCIA, ZAVOLA SA NA PREKLESLENIE PEXESA
	console.log('zobrazujem zmenene data (pole gameboard)');
	for (let i = 0; i < gameboard.length; i++) {
		if (gameboard[i].flipped == true) {
			let x = document.getElementById(gameboard[i].id);
			x.setAttribute("src", gameboard[i].src);
		}
		else {
			let x = document.getElementById(gameboard[i].id);
			x.setAttribute("src", "obr/empty.png");
		}
	}
}

function resetVars() { // FUNKCOA, RESETUJE PREMENNE	
	clicker = 0;
	countcardF = 0;
	countcardT = 0;
	memoryname = null;
	memoryid = null;
}

function match() {

	console.log('menim data (pole gameboard)');
	if (clicker == 2) { 				//RESTART PO 2 KLIKOCH AKO KOLO
		resetVars();
		resetFlip();
	}

	flipCard(event.target.id);
	console.log(gameboard);

	clicker++;			//POCITADLO KLIKOV

	if (memoryname == null && memoryid == null) {   //PRVA ULOZENIE ABY BOLO S CIM POROVNAVAT MENO A ID
		memoryname = event.target.name;
		memoryid = event.target.id;
	}
	if (countcardF == 0) {    	//ULOZENIE PRE PRVU KARTU BOD
		countcardF++;
	}
	if ((memoryname == event.target.name) && memoryid != event.target.id) { //AK NASIEL KARTU Z PARU ALE NIE ROVNAKU AKO PRED TYM BOD
		if (countcardT == 0) {
			countcardT++;
		}

	}

	if ((countcardT + countcardF) == 2) {    //AK NA DRUHY KLIK NASIEL DVE ROZDIELNE KARTY Z ROVNAKEHO PARU TAK NASIEL CELY PAR
		points++;
		alert("match with id:" + memoryid + "and name: " + memoryname + " to card " + event.target.id + " and name: " + event.target.name + " points: " + points);
	}
	repaint();			//PREKRESLI HRACIE POLE

}

function clearBoard(elementID) {
	document.getElementById('div').innerHTML = "";
	resetFlip();
}

function restart() {
	clearBoard();
	shuffle();
	create();		//TOTO VYMAZAT AK CHCEME ABY ZMIZLA CELA BOARD AJ S KARTICKAMI, INAC TAM ZOSTANE
	enableNewGame();
	disableRestart();
}

//document.getElementById("card1").src = "obr/0.jpg";

