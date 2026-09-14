const photolist = document.getElementsByClassName("photocont")
const photoscaleX = 11;
const photoscaleY = (photoscaleX / 427) * 516; //13.2927
const pinoffsetx = photoscaleX / 2.3;
const pinoffsety = photoscaleX / -22;
const stroffsetx = photoscaleX / 2.1;
const stroffsety = photoscaleX / 53.8;
const borderwidth = 1.5625;
let vpX = window.innerWidth;
let vpY = window.innerHeight;
let vpYvw = 0;

var root = document.querySelector(':root');
let photoloc = [];
for (let k = 0; k < photolist.length; k++) {
	photoloc[k] = []
}
let strloc = [];
for (let k = 0; k < photolist.length; k++) {
	strloc[k] = []
}
let pinloc = [];
for (let k = 0; k < photolist.length; k++) {
	pinloc[k] = []
}

let ScU = getComputedStyle(root).getPropertyValue("--scaler");

console.log(ScU)

root.style.setProperty('--width', photoscaleX + ScU);


if (ScU == "vw"){
	vpYvw = vpY/(vpX/100)
	vpXvw = vpX/(vpX/100)
}else{
	vpXvw = vpX/(vpY/100)
	vpYvw = vpX/(vpX/100)
}






function startup() {
	postorganise()
	document.getElementById('blackout').style.animationName = "lightflicker"
	stringangler()

}
let j = 0


function postorganise(){
	for (let i = 0; i < photolist.length; i++) {
		posgen(i)
		for (let j = 0; j < photolist.length; j++) {
			console.log("j = " + j)
			if (i != j){
				if (photoloc[i][0] >= (photoloc[j][0] - photoscaleX) && 
					photoloc[i][0] <= (photoloc[j][0] + photoscaleX) && 
					photoloc[i][1] >= (photoloc[j][1] - photoscaleY) && 
					photoloc[i][1] <= (photoloc[j][1] + photoscaleY)) {
					console.log("resetting photo " + i + " because it overlapped photo " + j)
					console.log(photoloc[i][0] + ", " + photoloc[i][1])
					console.log(photoloc[j][0] + ", " + photoloc[j][1])
					posgen(i);
					j = -1;
					
				}
			}
			if (photoloc[i][0] >= ((100 - ((photoscaleX * 2) + borderwidth + 3))) && 
				photoloc[i][1] >= (50 - (borderwidth + photoscaleY + ((photoscaleX / 438) * 264) + 3))){
				console.log("resetting because " + i + " overlapped the tutorial note")
				posgen(i);
				j = -1;
			}
		}
		
		
		document.getElementById("photo" + i).style.left = photoloc[i][0] + ScU;
		document.getElementById("photo" + i).style.top = photoloc[i][1] + ScU;
		
		document.getElementById("str" + i + "a").style.left = strloc[i][0] + ScU;
		document.getElementById("str" + i + "a").style.top = strloc[i][1] + ScU;
		document.getElementById("str" + i + "b").style.left = strloc[i][0] + ScU;
		document.getElementById("str" + i + "b").style.top = strloc[i][1] +ScU;
		
		document.getElementById("pin" + i).style.left = pinloc[i][0] + ScU;
		document.getElementById("pin" + i).style.top = pinloc[i][1] +ScU;
	}
	
	
}

function stringangler(){
	for (let l = 0; l < photolist.length; l++){
		console.log("origin coords = " + photoloc[l])
		targetA = Math.floor(Math.random() * photolist.length)
		targetB = Math.floor(Math.random() * photolist.length)
		while (targetA == l){
			targetA = Math.floor(Math.random() * photolist.length);
		};
		while (targetB == l){
			targetB = Math.floor(Math.random() * photolist.length);
		};
		
		
		angleA = (Math.atan2(strloc[l][1] - strloc[targetA][1], strloc[l][0] - strloc[targetA][0]) ) * (180/Math.PI) + 90 + 360;
		if (angleA>360){
			angleA -= 360;
		};
		
		
		if (angleA > 333 || angleA < 27 || (243 > angleA && angleA > 117)){
			document.getElementById("str" + l + "a").style.zIndex = "50";
		} 
		lenA = Math.sqrt(Math.pow(strloc[l][1] - strloc[targetA][1],2)+Math.pow(strloc[l][0] - strloc[targetA][0],2))
		document.getElementById("str" + l + "a").style.height = lenA + ScU;
		document.getElementById("str" + l + "a").style.transform = "rotate("+ angleA + "deg)";
		
		
		angleB = (Math.atan2(strloc[l][1] - strloc[targetB][1], strloc[l][0] - strloc[targetB][0]) ) * (180/Math.PI) + 90 + 360;
		if (angleB>360){
			angleB -= 360;
		};
		if (angleB > 333 || angleB < 27 || (243 > angleB && angleB > 117)){
			document.getElementById("str" + l + "b").style.zIndex = "50";
		}
		
		lenB = Math.sqrt(Math.pow(strloc[l][1] - strloc[targetB][1],2)+Math.pow(strloc[l][0] - strloc[targetB][0],2))
		document.getElementById("str" + l + "b").style.height = lenB + ScU;
		document.getElementById("str" + l + "b").style.transform = "rotate("+ angleB + "deg)";


	}
}

function posgen(i){
	photoloc[i][0] = Math.floor(Math.random() * (vpXvw - ((borderwidth*2) + photoscaleX))) + borderwidth;
	photoloc[i][1] = Math.floor(Math.random() * (vpYvw - ((borderwidth*2) + photoscaleY))) + borderwidth;
	strloc[i][0] = photoloc[i][0] + stroffsetx;
	strloc[i][1] = photoloc[i][1] + stroffsety;
	pinloc[i][0] = photoloc[i][0] + pinoffsetx;
	pinloc[i][1] = photoloc[i][1] + pinoffsety;
}