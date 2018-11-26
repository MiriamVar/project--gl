let pole = [					//POLE OBJEKTOV

	{id:"card1",
	src:"obr/1.jpg",
	name:"card1F"},
	
	{id:"card2",
	src:"obr/2.jpg",
	name:"card2F"},
	
	{id:"card3",
	src:"obr/3.jpg",
	name:"card3F"},

	{id:"card4",
	src:"obr/4.jpg",
	name:"card4F"},

	{id:"card5",
	src:"obr/5.jpg",
	name:"card5F"},

	{id:"card6",
	src:"obr/6.jpg",
	name:"card6F"},

	{id:"card1",
	src:"obr/1.jpg",
	name:"card1T"},
	
	{id:"card2",
	src:"obr/2.jpg",
	name:"card2T"},
	
	{id:"card3",
	src:"obr/3.jpg",
	name:"card3T"},

	{id:"card4",
	src:"obr/4.jpg",
	name:"card4T"},

	{id:"card5",
	src:"obr/5.jpg",
	name:"card5T"},

	{id:"card6",
	src:"obr/6.jpg",
	name:"card6T"}
	

];

let resultpole = [];             //PRAZDNE POLE PRE NOVOPREHADZANE KARTY

function shuffle(){					//FUNKCIA NA NAHODNE PREHADZANIE KARIET
	let check=[];
	for(i=0;i<pole.length;i++){
	let rand=Math.trunc(Math.random() * pole.length);

		if(check.includes(rand)==true){    //OPATRENIE CI UZ RAZ SA NEVYGENEROVALO TO CISLO
		i--;
		}else{
		resultpole[i]=pole[rand];
		check.push(rand);
		}

	}
}

function create() {							//FUNKCIA NA VYKRESENIE ZATIAL TOTAAAALNA BETA VERZIA
	for(i=0;i<pole.length;i++){
	var x=document.createElement("IMG");
	x.setAttribute("src", resultpole[i].src);
	x.setAttribute("id", resultpole[i].id);
	x.setAttribute("name", resultpole[i].name);
	x.setAttribute("onclick","match()");
	document.getElementById("div").appendChild(x);
	}
}

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
	if((memoryname!=event.target.name)&&memoryid==event.target.id) { //AK NASIEL KARTU Z PARU ALE NIE ROVNAKU AKO PRED TYM BOD
		if(countcardT==0) {
			countcardT++;
		}

	}

	if((countcardT+countcardF)==2){    //AK NA DRUHY KLIK NASIEL DVE ROZDIELNE KARTY Z ROVNAKEHO PARU TAK NASIEL CELI PAR
		points++;
		alert("match with id:"+memoryid+"and name: "+memoryname+" to card "+event.target.id+" and name: "+event.target.name+" points: "+points);
	}

}


//document.getElementById("card1").src = "obr/0.jpg";

