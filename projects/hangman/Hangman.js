var secretWord = ""; // this is the word that the player is guessing
var secretWordDisplay = ""; // this will be filled with *'s to start, 
// and the displayed on the page during the game
var wrongGuesses = ""; // This is a list of the wrong guesses (letters)
var numWrongGuesses = 0; // examine how the textbook changes images
var beast;
var guessTimeout;
var bestScore = 10000; //how many guesses?  
var startedasdf = 29
var newGuess = "";
var guessLoc;
var wgss;
var gamover;
var all = "";
var t;
var picnum = 0;
var lengthofdone = 1;


function startGame(){
  if (startedasdf == 29)
    {
  	secretWord = prompt("Please choose a secret word to start the game" +
  	"\n(You may want to ask a friend to choose one for you, " +
  	"in order to make the game more fun)" +
  	"\nYou must choose a single word that has no duplicate letters" +
  	"\nThe word must contain only letters");
	gamover = 0;
  	doreests()
	
}

function doreests()
{
	initializescore();
	secretWord = secretWord.toLowerCase();  
	for (var i = 0; i < secretWord.length; i++){
		secretWordDisplay += "*";
	}
		putswdinswddisp();
		startedasdf = 31;
		bestScore = 0;
		timer();
		
	}}

function putswdinswddisp()
{   
	var wholeDoc = document.getElementById("secretWordDisplay");	
	var newNode = document.createTextNode(secretWordDisplay);
	wholeDoc.appendChild(newNode);	
}

function initializescore(){
	//if (document.cookie.length > 0) 
		document.getElementById("bestScore").innerHTML = "The current best score is <b>" + bestScore + "</b><br/>(Lower is better)";
	//else
    //document.getElementById("bestScore").innerHTML = "The current best score is <b>" + getCookie(bestScore) + "</b><br/>(Lower is better)";
	
}
function timer(){
	if (lengthofdone <= secretWord.length - 1) {
		t = setTimeout("alertMsg()", 5000);
	}
}

function alertMsg()
{
alert("TOO SLO");
window.location.href=window.location.href
}

function processGuess(){
	 
	if (picnum < 7)
	 {
	 	
		var newGuess = document.getElementById('FUCKMYLLIFE').value;
		if (startedasdf == 29) {
			alert("the game has not started");
			return;
		}
		
		bestScore++;
		if (newGuess.length > 1) {
			alert("thats more than one letter your guessing");
			initializescore();
			clearTimeout(t);
			timer();
			return;
		}
		if(all.indexOf(newGuess) > -1)
		{
			alert("you already guessed that")
			bestScore++;
			newimg()
			initializescore();
			clearTimeout(t);
			timer();
			return;
		}
		all += newGuess;
		//		1)  indexOf will return a whole number - what two, general categories 
		//		do these numbers fall into
		//      -----ints and boolians
		//		2) If indexOf returns -1, what does that mean (in terms of the game)?
		//      -----that would mean the the letter guessed is not in the word		
		guessLoc = secretWord.indexOf(newGuess);
		if (guessLoc == -1) {
			Addwg();
			newimg()			
			initializescore();
			clearTimeout(t);
			timer();
		}
		else {	
			firstChunk = secretWordDisplay.substring(0, guessLoc);
			lastChunk = secretWordDisplay.substring(guessLoc + 1);
			secretWordDisplay = firstChunk + newGuess + lastChunk;	
			document.getElementById("secretWordDisplay").innerHTML = secretWordDisplay;
			initializescore()
			clearTimeout(t)
			timer();
			lengthofdone++
			if(picnum = 7)
			{
				alert("you lost")
			}
			//		3) What value will firstChunk have?
			//     ---stuff before the correct letter guessed
			//		4) What value will lastChunk have?
			//		--stuff after the correct letter guessed
			//		5) What value will secretWordDisplay now have?
			//		-- *'s and then the letter guessed
			
			if (secretWordDisplay.indexOf("*") == -1) {
	
				//		6) If the above "if" statement is true, what does that mean
				//			 (in terms of the game)?
				// the game is over and youve won
				alert("you won");
				document.getElementById(bestScore).innerHTML = bestScore;
				//setCookie(bestScore, document.getElementById(bestScore).value)
				
			}
		}
	}
	else 
	{
	alert("the ganes already over :P, you lost")
	}
}
function Addwg()
	{
		var list = document.getElementById("wrongGuesses");
		var txtGuess = document.getElementById("FUCKMYLLIFE");	
		var newNode = document.createElement("LI");
		newNode.appendChild(  document.createTextNode(txtGuess.value));
		list.appendChild(newNode);
	}
// This will be called by the onresize method, and will handle
// 	the adjustments to the image (if any are needed
function newimg()
{
	picnum++;
	switch(picnum)
	{
	case 1:
 	 document.getElementById('thePicture').src="Images/Hangman1.jpg";
 	 break;
	case 2:
	  document.getElementById('thePicture').src="Images/Hangman2.jpg";
	  break;
	  case 3:
	  document.getElementById('thePicture').src="Images/Hangman3.jpg";
	  break;
	  case 4:
	  document.getElementById('thePicture').src="Images/Hangman4.jpg";
	  break;
	  case 5:
	  document.getElementById('thePicture').src="Images/Hangman5.jpg";
	  break;
	  case 6:
	  document.getElementById('thePicture').src="Images/Hangman6.jpg";
	  break;
	  case 7:
	  document.getElementById('thePicture').src="Images/Hangman7.jpg";
	  break;
	default:
  	  document.getElementById('thePicture').src="Images/Hangman0.jpg";
	}
}

function setImageSize(){
	
	var we = document.body.clientWidth;
	var hi = we;
	if (we > 300)
	{ we = 300; }
	if(hi > 300)
	{hi = 300} 
document.getElementById('thePicture').height= hi;	
document.getElementById('thePicture').width = we;
}