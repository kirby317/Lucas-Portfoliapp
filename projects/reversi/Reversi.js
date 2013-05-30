

var PLAYER_1 = "dark";
var PLAYER_2 = "light";
var EMPTY = "blank"
var closetoend = 0;
var fnImgBlank = "Images/blank.gif";
var fnImgPlayer1 = "Images/dark.gif";
var fnImgPlayer2 = "Images/light.gif";
var pts = 0;

var gameInProgress = true;

var currentPlayer = PLAYER_1;

var blocks; // a 2D array - each element is either 
//	PLAYER_1 (meaning that player#1 put their piece down on that space
//	PLAYER_2 (player 2's piece is there)
//	EMPTY (neither player has a piece there)
// blocks[row][col] will be drawn on-screen onto the <img> with the id row + "_" + col
//	e.g., blocks[1][2] corresponds to the block with id = "1_2" 
// Keep in mind that that (0,0) is the TOP LEFT corner of the board,
// as you can see from examining the HTML layout

function setPieceAtLocation(blocks, row, col, player){
	
    blocks[row][col] = player;
    
    var blockId = row + "_" + col;
       // alert("assigning " + player + " to block " + blockId);
		if (player == PLAYER_1) {
			document.getElementById(blockId).src = fnImgPlayer1;
			pts++;
		}
		
		else 
			if (player == PLAYER_2) {
				document.getElementById(blockId).src = fnImgPlayer2;
				pts--;
			}
			else 
				if (player == EMPTY) 
					document.getElementById(blockId).src = fnImgBlank;
	
	
}

function resetGame(){
    gameInProgress = true;
    blocks = Array(8); // create array with length of 8
    for (var row = 0; row < blocks.length; row++) {
        blocks[row] = Array(8); // create all columns on this row, length = 8
        for (var col = 0; col < blocks[row].length; col++) {
            if (row == 3 && col == 3 || row == 4 && col == 4) 
                setPieceAtLocation(blocks, row, col, PLAYER_1);
            else if (row == 3 && col == 4 || row == 4 && col == 3) 
                setPieceAtLocation(blocks, row, col, PLAYER_2);
            else 
                setPieceAtLocation(blocks, row, col, EMPTY);
        }
    }
    
    updateDisplay();
    
    //resetGame_DarkWin(); // uncommenting this line will run this method, will
    //	will replace the above initialization with a game that the dark side will win

    // resetGame_LightWin();

    // resetGame_TIE();
}

function updateDisplay(){
    document.getElementById("currentPlayer").innerHTML = "It is " + currentPlayer + "'s turn to move";
}

function selectBlock(blockId){
	

    var parts = blockId.split("_");
    var row = parseInt(parts[0]);
    var col = parseInt(parts[1]);
	

    // see if the move is valid - if so, flip pieces as needed
    if (!isPieceAllowedAtLocation(row, col, true)) {
        if (blocks[row][col] != EMPTY) {
			alert("You can't put a piece there - the space is already occupied");
		}
		else {
			alert("That's not a valid move!");
		}
        return;
    } else {
	closetoend++;
	setPieceAtLocation(blocks, row, col, currentPlayer);
	
	if(closetoend >= 60){
		var winner;
		if(pts > 0)
		winner = "player 1"
		else
		winner = "player 2"
		 document.getElementById("currentPlayer").innerHTML = "<h2> the winner is " + winner +  "!!</h2>";
		alert("the game is over " + winner + " has won!")
		return;
	}
	
	
	}
    


    switchPlayers();
    
    // if the current player can't actually move anywhere
    // then the figure out who's won
    if (isGameOver()) {
        determineVictory();
        return;
    }
    
    
    updateDisplay();
    
    //				alert("Selected block is in row " + row + " and col " + col);
    //    checkRow(row, col);
    //    checkColumn(row, col);
    //    checkDiagonals(row, col);
}

function switchPlayers(){
    if (currentPlayer == PLAYER_1) {
		currentPlayer = PLAYER_2;
	}
	else {
		currentPlayer = PLAYER_1;
	}
}

function isPieceAllowedAtLocation(row, col, fFlipPieces){
//if (checkitall()) {
	// can't put something onto an occupied space
	if (blocks[row][col] != EMPTY) {
		//        alert("Tried to put a piece at (" + row + "," + col + ") - not empty (instead, it's " + blocks[row][col] + ")");
		return false;
	}
	for (xDir = -1; xDir < 2; xDir++) {
		for (yDir = -1; yDir < 2; yDir++) {
				if (xDir == 0 && yDir == 0) {
					continue;
				}
					if (isValidBeam(row, col, xDir, yDir)) {
						if (fFlipPieces == true) {
							convertBeam(row, col, xDir, yDir);
						}
						return true;
					}
		}
}
    return false;
}

function isValidBeam(row, col, xDir, yDir){
	
	var nrow = row + xDir;
	var ncol = col + yDir;
	if (nrow == 8 || nrow == -1 || ncol == 8 || ncol == -1){
		return false;
	}
	if (blocks[nrow][ncol] == currentPlayer){
		return false;
	}
	var x = nrow;
	var y = ncol;
	while ( x >= 0 && x <= 7 && y >= 0 && y <= 7){
		
			
			if (blocks[x][y] == EMPTY) {
				return false;
			}
			if (blocks[x][y] == currentPlayer) {
				return true;
			}
			x = x + xDir;
			y = y + yDir;
	
	}
}

function isInBounds(row, col){
    return row >= 0 && row <= 7 && col >= 0 && col <= 7;
}

function convertBeam(row, col, xDir, yDir){
	var crow = row + xDir;
	var ccol = col + yDir;
	while (isValidBeam(row, col, xDir, yDir) && blocks[crow][ccol] != currentPlayer && blocks[crow][ccol] != EMPTY) {
		setPieceAtLocation(blocks, crow, ccol, currentPlayer);
		crow = crow + xDir;
		ccol = ccol + yDir;
	}
}

function isGameOver(){

    return false;
}

function determineVictory(){
    document.getElementById("currentPlayer").innerHTML = "<h2>EVERYBODY WINS!!</h2>(Replace this with an actual implementation:)  )";
}

// Testing routines - if you want to force the game to be a tie, or have
// one player or the other win

function resetGame_DarkWin(){
    blocks = Array(8); // create array with length of 8
    for (var row = 0; row < blocks.length; row++) {
        blocks[row] = Array(8); // create all columns on this row, length = 8
        for (var col = 0; col < blocks[row].length; col++) {
            if (row <= 3) 
                setPieceAtLocation(blocks, row, col, PLAYER_1);
            else 
                setPieceAtLocation(blocks, row, col, PLAYER_2);
        }
    }
    
    setPieceAtLocation(blocks, 7, 0, EMPTY); // blank out the lower-left corner    
    updateDisplay();
}

function resetGame_LightWin(){
    blocks = Array(8); // create array with length of 8
    for (var row = 0; row < blocks.length; row++) {
        blocks[row] = Array(8); // create all columns on this row, length = 8
        for (var col = 0; col < blocks[row].length; col++) {
            if (row <= 3) 
                setPieceAtLocation(blocks, row, col, PLAYER_1);
            else if (row >= 4) 
                setPieceAtLocation(blocks, row, col, PLAYER_2);
        }
    }
    
    setPieceAtLocation(blocks, 5, 0, EMPTY); // space for dark to move
    setPieceAtLocation(blocks, 0, 7, EMPTY); // space for light to move & win   
    updateDisplay();
}

function resetGame_TIE(){
    blocks = Array(8); // create array with length of 8
    for (var row = 0; row < blocks.length; row++) {
        blocks[row] = Array(8); // create all columns on this row, length = 8
        for (var col = 0; col < blocks[row].length; col++) {
            if (row <= 3) 
                setPieceAtLocation(blocks, row, col, PLAYER_1);
            else if (row >= 4) 
                setPieceAtLocation(blocks, row, col, PLAYER_2);
        }
    }
    
    setPieceAtLocation(blocks, 5, 0, EMPTY); // space for dark to move
    setPieceAtLocation(blocks, 2, 7, EMPTY); // space for light to move & tie   
    updateDisplay();
}

