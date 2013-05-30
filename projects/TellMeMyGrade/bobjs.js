/**
 * @author Lucas
 */
function StoreCookie()
			{
             
			    var userInput = document.getElementById(n1).value;
                
				var name = document.getElementById(nn3);
				
				var date = new Date();
			    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			    expires = "; expires=" + date.toGMTString();
				
				document.cookie = name + "=" + userInput + expires + "; path=/";
            }
function fgpa(){
	var n1 = parseFloat(document.getElementById("nn1").value);
	
	if (n1 == null) {
		alert("you didnt enter a grade");
		return;
	}
	if (isNaN(n1)) {
		alert("you didnt enter a number");
		return;
	}
	else {
	
		if (n1 > "95") {
			document.getElementById("nn2").value = "your gpa is 4";
		}
		else {
			if (n1 > "100") {
				document.getElementById("nn2").value = "there was no extra credit";
			}
			else {
				if (n1 < "65") {
					document.getElementById("nn2").value = "your gpa is 0.0";
				}
				else {
					if(n1 < 1 ){
						document.getElementById("nn2").value = "cant have negative grade"
					}
					var b = n1 - 65
					
					document.getElementById("nn2").value = "your gpa is " + (b + 10) / 10;
				}
			}
		}
	}	
}
			
			function writeCookie(name, value, days) {
  // By default, there is no expiration so the cookie is temporary
  var expires = "";

  // Specifying a number of days makes the cookie persistent
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }

  // Set the cookie to the name, value, and expiration date
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  // Find the specified cookie and return its value
  var searchName = name + "=";
  var cookies = document.cookie.split(';');
  for(var i=0; i < cookies.length; i++) {
    var c = cookies[i];
    while (c.charAt(0) == ' ')
      c = c.substring(1, c.length);
    if (c.indexOf(searchName) == 0)
      return c.substring(searchName.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  // Erase the specified cookie
  writeCookie(name, "", -1);
}