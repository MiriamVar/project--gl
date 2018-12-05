let playerOne = {
				name: "",
				turn:true,
				point:0
}
let playerTwo = {
				name: "",
				turn:false,
				point:0
}


// napevno nie
let sizeX = 6;
let sizeY = 4;

let gameboard = []
disableRestart();			//NA ZACIATKU SA DA KLIKNUT LEN NA NEW GAME

function createGameboard() {
	let swap = 0;
	for (var i = 1; i <= (sizeX * sizeY) / 2; i++) {
		for (var j = 0; j < 2; j++) {
			gameboard[swap] = {
				id: "card" + i + "_" + j,
				src: "../img/kosice/" + i + ".JPG",
				name: "card" + i,
				flipped: false				//STAV, CI JE KARTA OTOCENA, TRUE=OTOCENA, FALSE=NIE JE OTOCENA
			}
			swap++;
		}

	}
	//console.log(gameboard);
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
	enableRestart();
	for (i = 0; i < gameboard.length; i++) {
		let x = document.createElement("IMG");
		x.setAttribute("src", "../img/kosice/empty.png");
		x.setAttribute("id", gameboard[i].id);
		x.setAttribute("name", gameboard[i].name);
		x.setAttribute("onclick", "match(event)");
		let y = document.createElement("DIV");
		y.setAttribute("id", "board"+i);
		y.setAttribute("class", "boardElement");
		document.getElementById("gameBoard").appendChild(y);
		document.getElementById("board"+i).appendChild(x);
	}
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
	//console.log('zobrazujem zmenene data (pole gameboard)');
	for (let i = 0; i < gameboard.length; i++) {
		if (gameboard[i].flipped == true) {
			let x = document.getElementById(gameboard[i].id);
			x.setAttribute("src", gameboard[i].src);
		}
		else {
			let x = document.getElementById(gameboard[i].id);
			x.setAttribute("src", "../img/kosice/empty.png");
		}
	}
}

function resetVars() { // FUNKCOA, RESETUJE PREMENNE	
	clicker = 0;
	countcardF = 0;
	countcardT = 0;
	memoryname = null;
	memoryid = null;
	playerOne.turn=!playerOne.turn;	//zneguje jeho hodnotu aby mohol ist dalsi hrac
	playerTwo.turn=!playerTwo.turn;	//zneguje jeho hodnotu aby mohol ist dalsi hrac

}
let winner;
function match(event) {

	//console.log('menim data (pole gameboard)');
	if (clicker == 2) { 				//RESTART PO 2 KLIKOCH AKO KOLO
		resetVars();
		resetFlip();
	}

	flipCard(event.target.id);
	//console.log(gameboard);

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

		if(playerOne.turn==true){			//ten hrac ktory teraz hra a sa nasiel par dostane bod
			alert("point to "+playerOne.name);

			let swap=document.getElementById(memoryid);

			let N=document.createElement("TR");
			N.setAttribute("id","mytr"+playerOne.point);
			document.getElementById("table1N").appendChild(N);

			let y = document.createElement("TD");
			let t = document.createElement("IMG");
			t.setAttribute("src", swap.src);
			y.appendChild(t);
			document.getElementById("mytr"+playerOne.point).appendChild(y);

			playerOne.point++;
		}else{
			alert("point to "+playerTwo.name);

			let swap2=document.getElementById(memoryid);

			let N2=document.createElement("TR");
			N2.setAttribute("id","mytr2"+playerTwo.point);
			document.getElementById("table2N").appendChild(N2);

			let y2 = document.createElement("TD");
			let t2 = document.createElement("IMG");
			t2.setAttribute("src", swap2.src);
			y2.appendChild(t2);
			document.getElementById("mytr2"+playerTwo.point).appendChild(y2);

			playerTwo.point++;
		}

		playerOne.turn=!playerOne.turn;		//obrati znova false a true aby ked to pojde resetVars zostal hrat ten ktory nasiel par
		playerTwo.turn=!playerTwo.turn;


		//let swap=document.getElementById(memoryid);
		//let newElement=document.createElement("IMG");
		//newElement.setAttribute("src", swap.src);
		//newElement.setAttribute("class", "resultElement");
		//document.getElementById("placeForCard").appendChild(newElement);

		document.getElementById(memoryid).style.visibility='hidden';
		document.getElementById(event.target.id).style.visibility='hidden';

		if((playerOne.point+playerTwo.point)==(sizeX*sizeY)/2){
			if(playerOne.point>playerTwo.point){
				winner=playerOne.name;
			}else{
				winner=playerTwo.name;
			}
			end();
		}

	}
	repaint();			//PREKRESLI HRACIE POLE

}
function end(){     //FUNKCIA PO NAJDENI VSETKYCH PAROV
	clearBoard();
	document.getElementById("endGame").innerHTML="Gameover";
	document.getElementById("placeForCard").innerHTML="";
	playerOne.point=0;
	playerTwo.point=0;
	alert("winner is "+winner);
	enableRestart();

}

function clearBoard(elementID) {
	document.getElementById('gameBoard').innerHTML = "";
	resetFlip();
}

function restart() {
	clearBoard();
	shuffle();
	create();		//TOTO VYMAZAT AK CHCEME ABY ZMIZLA CELA BOARD AJ S KARTICKAMI, INAC TAM ZOSTANE
	disableRestart();
	document.getElementById("endGame").innerHTML="";
}

function create2() {
	clearBoard();
	createGameboard();
	shuffle();				//FUNKCIA NA VYKRESENIE ZATIAL TOTAAAALNA BETA VERZIA
	enableRestart();
	for (i = 0; i < gameboard.length; i++) {
		let x = document.createElement("IMG");
		x.setAttribute("src", "../img/kosice/" + i + ".JPG");
		x.setAttribute("id", gameboard[i].id);
		x.setAttribute("name", gameboard[i].name);
		x.setAttribute("onclick", "match(event)");
		let y = document.createElement("DIV");
		y.setAttribute("id", "board"+i);
		y.setAttribute("class", "boardElement");
		document.getElementById("gameBoard").appendChild(y);
		document.getElementById("board"+i).appendChild(x);
	}
}

function start() {				//pri nacitani stranky
	shuffle();
	button = document.getElementById('btnP');
	button.addEventListener("click", event => {			//buttonu na posielanie mien prida akoby funkciu pri kliknuti na neho
   
    	names();											//ziska obsah z inputov
			if(playerOne.name === "" || playerTwo.name === ""){		//ak su inputy prazdne 
				alert("empty names folders");
			}else{											//ak v nich je nieco

				create();									
				//disableRestart();
				applieNames();
				//document.getElementById("endGame").innerHTML="";
			}

    });

}

let button;

function names(){
	playerOne.name=document.getElementById("P1").value;
	playerTwo.name=document.getElementById("P2").value;
}

function applieNames(){														//zapise mena do tabulky
		createNameTables();
		let remove = document.getElementById("inputNames");					//vymaze cele divko
		remove.parentNode.removeChild(remove);

}

function createNameTables(){

	let table1N=document.createElement("TABLE");
	table1N.setAttribute("id","table1N");
	document.body.appendChild(table1N);

	let N=document.createElement("TR");
	N.setAttribute("id","mytr");
	document.getElementById("table1N").appendChild(N);

	let y = document.createElement("TD");
	let t = document.createTextNode(playerOne.name);
	y.appendChild(t);
	document.getElementById("mytr").appendChild(y);

	let table2N=document.createElement("TABLE");
	table2N.setAttribute("id","table2N");
	document.body.appendChild(table2N);

	let N2=document.createElement("TR");
	N2.setAttribute("id","mytr2");
	document.getElementById("table2N").appendChild(N2);

	let y2 = document.createElement("TD");
	let t2 = document.createTextNode(playerTwo.name);
	y2.appendChild(t2);
	document.getElementById("mytr2").appendChild(y2);
	
}
