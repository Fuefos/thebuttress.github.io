const photolist = document.getElementsByClassName("photocont")
const photoscaleX = 11;
const photoscaleY = (photoscaleX / 427) * 516; //13.2927
const pinoffsetx = photoscaleX / 2.3;
const pinoffsety = photoscaleX / -22;
const stroffsetx = photoscaleX / 2.1;
const stroffsety = photoscaleX / 53.8;
const overlapPercent = 1; // 0-1, 1 = 0% overlap, 0 = 100% overlap
const borderwidth = 1.5625;
const borderwidth2 = 2.0625;
const shadowmax = 0.5208338;
let vpX = window.innerWidth;
let vpY = window.innerHeight;
let vpYvw = 0;

const stringCnt = ["A"]

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
	stringangler()
	document.getElementById('blackout').style.animationDelay = "0s"
}
let j = 0


function postorganise(){
	for (let i = 0; i < photolist.length; i++) {
		posgen(i)
		for (let j = 0; j < photolist.length; j++) {
			console.log("j = " + j)
			if (i != j){
				if (photoloc[i][0] >= (photoloc[j][0] - (photoscaleX * overlapPercent)) && 
					photoloc[i][0] <= (photoloc[j][0] + (photoscaleX * overlapPercent)) && 
					photoloc[i][1] >= (photoloc[j][1] - (photoscaleY * overlapPercent)) && 
					photoloc[i][1] <= (photoloc[j][1] + (photoscaleY * overlapPercent))) {
					console.log("resetting photo " + i + " because it overlapped photo " + j)
					console.log(photoloc[i][0] + ", " + photoloc[i][1])
					console.log(photoloc[j][0] + ", " + photoloc[j][1])
					posgen(i);
					j = -1;
					
				}
			}
			if (photoloc[i][0] <= (photoscaleX/3) && 
				photoloc[i][1] <= (photoscaleX/3)){
				console.log("resetting because " + i + " overlapped the return button")
				posgen(i);
				j = -1;
			}
			if (ScU =="vw"){
				if (photoloc[i][0] >= ((100 - ((photoscaleX * 2) + borderwidth2 + 3))) && 
					photoloc[i][1] >= (50 - (borderwidth2 + photoscaleY + ((photoscaleX / 438) * 264) + 3))){
					console.log("resetting because " + i + " overlapped the tutorial note")
					posgen(i);
					j = -1;
				}
			}else{
				if (photoloc[i][0] >= ((50 - ((photoscaleX * 2) + borderwidth2 + 3))) && 
					photoloc[i][1] >= (100 - (borderwidth2 + photoscaleY + ((photoscaleX / 438) * 264) + 3))){
					console.log("resetting because " + i + " overlapped the tutorial note")
					posgen(i);
					j = -1;
				}
			}
		}
		
		document.getElementById("photo" + i).style.position = "fixed";
		document.getElementById("photo" + i).style.left = photoloc[i][0] + ScU;
		document.getElementById("photo" + i).style.top = photoloc[i][1] + ScU;
		
		document.getElementById("str" + i + "A").style.left = strloc[i][0] + ScU;
		document.getElementById("str" + i + "A").style.top = strloc[i][1] + ScU;
		document.getElementById("str" + i + "A").style.position = "fixed";
		
		document.getElementById("pin" + i).style.left = pinloc[i][0] + ScU;
		document.getElementById("pin" + i).style.top = pinloc[i][1] +ScU;
		document.getElementById("pin" + i).style.position = "fixed";
	}
	
	
}

function stringangler(){
	for (let l = 0; l < photolist.length; l++){
		console.log("origin coords = " + photoloc[l])

		
		for (let m of stringCnt){
			targetA = Math.floor(Math.random() * photolist.length)
			while (targetA == l){
				targetA = Math.floor(Math.random() * photolist.length);
			};
			
			
			angleA = (Math.atan2(strloc[l][1] - strloc[targetA][1], strloc[l][0] - strloc[targetA][0]) ) * (180/Math.PI) + 90 + 360;
			if (angleA>360){
				angleA -= 360;
			};
			
			
			if (angleA > 333 || angleA < 27 || (243 > angleA && angleA > 117)){
				document.getElementById("str" + l + m).style.zIndex = "50";
			} 
			lenA = Math.sqrt(Math.pow(strloc[l][1] - strloc[targetA][1],2)+Math.pow(strloc[l][0] - strloc[targetA][0],2))
			
			
			testangleX = (Math.round((Math.sin((angleA+45)*(Math.PI/180)))*1000))/1000;
			testangleY = (Math.round((Math.cos((angleA+45)*(Math.PI/180)))*1000))/1000;
			absX = Math.abs(testangleX)
			absY = Math.abs(testangleY)
			absTot = absX+absY
			if (testangleX<0){
				balX = 0 - (absX/absTot)
			}else{
				balX = absX/absTot
			}
			if (testangleY<0){
				balY = 0 - (absY/absTot)
			}else{
				balY = absY/absTot
			}
			finX = balX * shadowmax
			finY = balY * shadowmax
			
			document.getElementById("str" + l + m).style.height = lenA + ScU;
			document.getElementById("str" + l + m).style.transform = "rotate("+ angleA + "deg)";
			document.getElementById("str" + l + m).style.boxShadow = finX+ScU +" "+ finY+ScU +" "+ shadowmax+ScU +" "+ "#0000009e"
		}
	}
}












function posgen(i){
	photoloc[i][0] = Math.floor(Math.random() * (vpXvw - ((borderwidth2*2) + photoscaleX))) + borderwidth2;
	photoloc[i][1] = Math.floor(Math.random() * (vpYvw - ((borderwidth2*2) + photoscaleY))) + borderwidth2;
	strloc[i][0] = photoloc[i][0] + stroffsetx;
	strloc[i][1] = photoloc[i][1] + stroffsety;
	pinloc[i][0] = photoloc[i][0] + pinoffsetx;
	pinloc[i][1] = photoloc[i][1] + pinoffsety;
}