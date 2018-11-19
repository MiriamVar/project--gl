/*let pole = [					//POLE OBJEKTOV

	{id:"card1F",
	src:"obr/1.jpg",
	name:"card1"},
	
	{id:"card2F",
	src:"obr/2.jpg",
	name:"card2"},
	
	{id:"card3F",
	src:"obr/3.jpg",
	name:"card3"},

	{id:"card4F",
	src:"obr/4.jpg",
	name:"card4"},

	{id:"card5F",
	src:"obr/5.jpg",
	name:"card5"},

	{id:"card6F",
	src:"obr/6.jpg",
	name:"card6"},

	{id:"card1T",
	src:"obr/1.jpg",
	name:"card1"},
	
	{id:"card2T",
	src:"obr/2.jpg",
	name:"card2"},
	
	{id:"card3T",
	src:"obr/3.jpg",
	name:"card3"},

	{id:"card4T",
	src:"obr/4.jpg",
	name:"card4"},

	{id:"card5T",
	src:"obr/5.jpg",
	name:"card5"},

	{id:"card6T",
	src:"obr/6.jpg",
	name:"card6"}
	

]; */

// napevno nie
let sizeX = 3;
let sizeY = 4;

let gameboard = []

function createGameboard(){
	let swap = 0;
	for (var i = 1; i <= (sizeX*sizeY)/2; i++) {
		for (var j = 0; j < 2; j++) {
			gameboard[swap]={
				id:"card"+i+"_"+j,
				src:"obr/"+i+".jpg",
				name:"card"+i
			}
			swap++;
		} 
		
	}
	console.log(gameboard);
}

function shuffle(){					//FUNKCIA NA NAHODNE PREHADZANIE KARIET
	//createGameboard();
	for(i=0;i<gameboard.length;i++){
		let rand=Math.trunc(Math.random() * gameboard.length);
		let swap = gameboard[rand];
		gameboard[rand] = gameboard[i];
		gameboard[i]=swap;
	}
}

function create() {	
	createGameboard();	
	shuffle();
	shuffle();					//FUNKCIA NA VYKRESENIE ZATIAL TOTAAAALNA BETA VERZIA
	for(i=0;i<gameboard.length;i++){
	let x=document.createElement("IMG");
	x.setAttribute("src", gameboard[i].src);
	x.setAttribute("id", gameboard[i].id);
	x.setAttribute("name", gameboard[i].name);
	x.setAttribute("onclick","match()");
	document.getElementById("div").appendChild(x);
	} 
}

//premenne pre funkciu match
let countcardF=0;  
let countcardT=0;
let clicker=0;
let memoryname;
let memoryid;

let points=0;

function match(){
	if(clicker==2){ 				//RESTART PO 2 KLIKOCH AKO KOLO
		clicker=0;
		countcardF=0;
		countcardT=0;
		memoryname=null;
		memoryid=null;
	}

	clicker++;			//POCITADLO KLIKOV

	if(memoryname==null && memoryid==null){   //PRVA ULOZENIE ABY BOLO S CIM POROVNAVAT MENO A ID
		memoryname = event.target.name;
		memoryid = event.target.id;
	}
	if(countcardF==0){    	//ULOZENIE PRE PRVU KARTU BOD
		countcardF++;
	}
	if((memoryname==event.target.name)&&memoryid!=event.target.id) { //AK NASIEL KARTU Z PARU ALE NIE ROVNAKU AKO PRED TYM BOD
		if(countcardT==0) {
			countcardT++;
		}

	}

	if((countcardT+countcardF)==2){    //AK NA DRUHY KLIK NASIEL DVE ROZDIELNE KARTY Z ROVNAKEHO PARU TAK NASIEL CELI PAR
		points++;
		alert("match with id:"+memoryid+"and name: "+memoryname+" to card "+event.target.id+" and name: "+event.target.name+" points: "+points);
	}

}

function clearBord() {

}

function restart() {

}

//document.getElementById("card1").src = "obr/0.jpg";

