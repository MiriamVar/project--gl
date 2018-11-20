let pole = [					//POLE OBJEKTOV

	{id:"card1",
	src:"obr/1.jpg",},
	
	{id:"card2",
	src:"obr/2.jpg",},
	
	{id:"card3",
	src:"obr/3.jpg"},

	{id:"card4",
	src:"obr/4.jpg"},

	{id:"card5",
	src:"obr/5.jpg"},

	{id:"card6",
	src:"obr/6.jpg"}
	

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
	document.body.appendChild(x);
	}
}

