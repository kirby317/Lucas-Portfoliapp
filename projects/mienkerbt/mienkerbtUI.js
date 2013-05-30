/*
 * The beginnings of a Minecraft-esque game. It's turning out to be rather ambitious. 
 * Yes, "Steve" has trouble moving from sky to dirt, and that will be fixed by the
 * presentation time (an implementation of the savesky function will somehow take
 * care of this...). Allegedly, "Steve" will also be able to change whether he's 
 * standing on dirt or sky, and be constrained by gravity. But not right now. That
 * is where the program is going though... hopefully. 
 */

// ATTENTION PROGRAMMERS 
// COL ==== __________________________________
// ROW ==== |||||||||||||||||||||||||||||||||
// block id should be in  (row_col) format

		var currentcol = 3;
		var currentrow = 2;
		var sky = "Images/sky.jpg";
		var steve = "Images/steve.jpg";
		var dirt = "Images/dirt.jpg";
		var blocks; 
		var savedSky = sky;
		var blockid2;
		var gravity; //timer
		var dirtInPocket = 0;

function savesky(dir, currentrow, currentcol){
	switch(dir){
		case "left":
					blockId2 = currentrow + "_" + (currentcol - 1);
					savedSky = sky;
					break;
		case "right":
					blockId2 = currentrow + "_" + (currentcol + 1);
					savedSky = sky;
					break;
		case "up":
					blockId2 = (currentrow - 1) + "_" + currentcol;
					savedSky = sky;
					break;
		case "down":
					blockId2 = (currentrow + 1) + "_" + currentcol;
					savedSky = sky;
					break;			
	}
}

function gravity(){
	setTimeout(fall(), 1000)
}

function fall(){
	
}


function checkdirt(dir, currentrow, currentcol)
{
	var blockId3;
	
	switch(dir){
		case "left":
					blockId3 = currentrow + "_" + (currentcol - 1);
					break;
		case "right":
					blockId3 = currentrow + "_" + (currentcol + 1);
					break;
		case "down":
					blockId3 = (currentrow + 1) + "_" + currentcol;
					break;	
		case "up":  
					blockId3 = (currentrow - 1) + "_" + currentcol;
					break;
							
	}

	var fubar = document.getElementById(blockId3).src;
	
	if(fubar.indexOf(dirt) == -1)
	{
		return true;
	}
	else{
		 
		return false;
	}
}

function resetGame(){
    	blocks = Array(8); // create array with length of 8
    	for (var row = 0; row < blocks.length; row++) {
        blocks[row] = Array(8); // create all columns on this row, length = 8
        for (var col = 0; col < blocks[row].length; col++) {
       	setPieceAtLocation(blocks, row, col)
        }
    }	
		for (var b = 0; b < 3; b++) {//CHANGE 3 FOR LOWER SKY
			for (var i = 0; i < 8; i++) {
				blocks[[b][i]]
				var blockId = b + "_" + i;
				document.getElementById(blockId).src = sky;
			}
		}
	currentrow = 2;
	currentcol = 4;
	
	dirtInPocket = 0;
	updateDirt();
	
	update(currentrow, currentcol);
	
}

function setskyAtLocation(blocks, row, col){
    var blockId = row + "_" + col;
	document.getElementById(blockId).src = sky;
}				
			
function setPieceAtLocation(blocks, row, col){
    var blockId = row + "_" + col;
	document.getElementById(blockId).src = dirt;
}	

function update(currentrow, currentcol)
{
	var blockId = currentrow + "_" + currentcol;
	document.getElementById(blockId).src = steve;
	
}
			
function moveleft(){
	if (currentcol == 0) {
		return;
	}
	else {
		if(checkdirt("left", currentrow, currentcol)){
		
			savesky("left", currentrow, currentcol);
			var blockId = currentrow + "_" + currentcol;
			document.getElementById(blockId).src = savedSky;
			currentcol--;
			}
	}
	
	update(currentrow, currentcol);
	setGravity ();
}
			
function moveright(){
	if (currentcol == 7) {//MAKE THIS BIGGER WHEN CHANGED
		return;
	}
	else {
		if(checkdirt("right", currentrow, currentcol)){

			savesky("right", currentrow, currentcol);	
			var blockId = currentrow + "_" + currentcol;
			document.getElementById(blockId).src = savedSky;
			currentcol++;
			}
	}
	update(currentrow, currentcol);
	setGravity ();
}

function moveup(){
	if (checkdirt("up", currentrow, currentcol)) {
		if (currentrow == 0) {
			return;
		}
		else {
			savesky("up", currentrow, currentcol);
			var old = savesky((currentrow - 1), currentcol);
			var blockId = currentrow + "_" + currentcol;
			document.getElementById(blockId).src = savedSky;
			currentrow--;
		}
		update(currentrow, currentcol);
		setGravity();
	}
}		
	
function movedw(){
	
	if (checkdirt("down", currentrow, currentcol)) {
	
	
		if (currentrow == 7) {//CHANGE THIS IF MAKING IT BIGGER
			return;
		}
		else {
			savesky("down", currentrow, currentcol);
			var blockId = currentrow + "_" + currentcol;
			document.getElementById(blockId).src = savedSky;
			currentrow++;
		}
		update(currentrow, currentcol);
		
		setGravity ();
	}
}	

function setGravity (){
	gravity = setTimeout('playGravity()',1000);
}		

function playGravity(){
	
	movedw();
}

function updateDirt(){
document.getElementById('dirtInPocket').innerHTML = "You have " + "<strong>"+dirtInPocket + "</strong>" +" dirt Pieces";
}

function sdus(){
		savedSky = sky;
		dirtInPocket++;
		setGravity();
		updateDirt();
}

function pickDirtUp(){
	var dirtRow = currentrow - 1;
	var blockId5 = dirtRow + '_' + currentcol;
	if((document.getElementById(dirtRow + '_' + currentcol).src.indexOf('dirt')>=0)){
		document.getElementById(blockId5).src = sky;
		sdus();
	}
}

function pickDirtDw(){
	var dirtRow = currentrow + 1;
	
	var blockId5 = dirtRow + '_' + currentcol;
	
	if(document.getElementById(dirtRow + '_' + currentcol).src.indexOf('dirt')>=0){
		document.getElementById(blockId5).src = sky;
		sdus();
	}
	
}

function pickDirtRight(){
	var dirtcol = currentcol + 1;
	
	var blockId5 = currentrow + '_' + dirtcol;
	if((document.getElementById(currentrow + '_' + dirtcol).src.indexOf('dirt')>=0)){
		document.getElementById(blockId5).src = sky;
		sdus();
	}
	
	
}

function pickDirtLeft(){
	var dirtcol = currentcol - 1;
	
	
	var blockId5 = currentrow + '_' + dirtcol;
	if(document.getElementById(currentrow + '_' + dirtcol).src.indexOf('dirt')>=0){
		document.getElementById(blockId5).src = sky;
		sdus();
	}
}

function sdusMinus(){
			savedSky = dirt;
			dirtInPocket--;
			setGravity();
			updateDirt();
}

function setdirtL(){
	if (dirtInPocket > 0) {
		var dirtcol = currentcol - 1;
		var blockId5 = currentrow + '_' + dirtcol;
		if (document.getElementById(currentrow + '_' + dirtcol).src.indexOf('sky') >= 0) {
			document.getElementById(blockId5).src = dirt;
			sdusMinus();
		}
	}
}

function setdirtR(){
	if (dirtInPocket > 0) {
		var dirtcol = currentcol + 1;
		var blockId5 = currentrow + '_' + dirtcol;
		if (document.getElementById(currentrow + '_' + dirtcol).src.indexOf('sky') >= 0) {
			document.getElementById(blockId5).src = dirt;
			sdusMinus();
		}
	}
}

function setdirtD(){
if (dirtInPocket > 0) {
	moveup();
	var dirtRow = currentrow + 1;
	var blockId5 = dirtRow + '_' + currentcol;
	if (document.getElementById(dirtRow + '_' + currentcol).src.indexOf('sky') >= 0) {
		document.getElementById(blockId5).src = dirt;
		sdusMinus();
	}
}
}

function freeD(){
	dirtInPocket = dirtInPocket + 25;
	updateDirt();
}

function esplode(){
	pickDirtLeft();
	pickDirtRight();
	pickDirtDw();
	pickDirtUp();
}

function helpMe(){
	document.getElementById("helpSpot").innerHTML = "<iframe src='help.html' width='675'></iframe><br/><img src='Images/nohelp.jpg' alt='closehelp' onclick='closeHelp()'>";
}

function closeHelp(){
	document.getElementById("helpSpot").innerHTML = "<img src='Images/help.jpg' id='help' alt='help' onclick='helpMe()'>";
}


