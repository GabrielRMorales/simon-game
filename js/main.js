$(document).ready(function(){
var buttonBeepOne=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var buttonBeepTwo=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var buttonBeepThree=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var buttonBeepFour=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var beeps=[buttonBeepOne,buttonBeepTwo,buttonBeepThree, buttonBeepFour];
var choices=["#top-left","#top-right","#bottom-left","#bottom-right"];
var colors=["blue","green","red","yellow"];
var compButtons=[];
var userButtons=[];	
var i;
var j;
var count=0;
var playerMadeChoice=true;
//start function-this finds a random number and pushes it into the compButtons array then plays all items in the compButtons array
function start(){
	 	count++;
  	$("#count").html(count);
		i=0;
		var random=Math.ceil(Math.random() * (4)-1);
		var computerId=(choices[random]);
		compButtons.push(computerId);
		replay();
}
//replay function-once i is set to 0 by another function, this will replay all the compButton array values (until i=compButtons.length-1)
function replay(){
	userButtons=[];
		j=0;
		console.log("compButtons is "+compButtons);
		console.log("computer chose "+compButtons[i]);
		var current=compButtons[i];
		var idSelector=choices.indexOf(compButtons[i]);
		console.log("ID selection is "+idSelector);
		$(current).css("background-color", "white");
		beeps[idSelector].play();
		console.log(colors[idSelector]);
		setTimeout(function() {
		$(current).css("background-color", colors[idSelector]); 	
	}, 500);
		
	setTimeout(function(){
	if (i!==compButtons.length-1){
		i++;
		replay();	
	}	
	else {
		console.log("compButtons is done");
	}		
	}, 1500);
}
//replay button function in case user's response is false or not incomplete



//function for the random buttons to actually play
	function game(){
	playerMadeChoice=false;  
	if (count==3){
	console.log("Game over");
	}
	if (compButtons.length>0){
	replay();
	}
	
	
	
	console.log("compButtons array "+compButtons);
	count++;
	$("#count").html(count);
	$(choices[random]).css("background-color", "white");	
	setTimeout(function() {
        $(choices[random]).css("background-color", colors[random]);
    }, 300);
	//as part of game, if the user does nothing, the game will automatically replay
	/*setTimeout(function() {
	if (playerMadeChoice==false){
		replay();	}
	
	}, 5000);*/

	}
	

 //initiate the simon game with the given process
 	$("#start").click(function(){	
	start();
	});

	//function for the player's response-this will keep the game going

		$(".color").click(function(){
			//clicking on color should brighten it
			$(this).css("background-color", "white");
		 var playerChoiceId="#"+$(this).attr("id");
		 var playerChoice=choices.indexOf(playerChoiceId);
		beeps[playerChoice].play();
		setTimeout(function() {
		$(playerChoiceId).css("background-color", colors[playerChoice]); 
	}, 500)
		//push choice into userButton arrays
		console.log("user chose "+playerChoiceId);
		userButtons.push(playerChoiceId);		
		//compare with the compButton arrays
		//if correct, increase iterator to continue comparing
		console.log("j is "+j);
		console.log("compButtons.length is "+compButtons.length);
		console.log("user array "+userButtons);
		console.log("comp array "+compButtons);
		if (userButtons[j]===compButtons[j]){
			j++;
			if (j==compButtons.length){
			var temp=$("#count").html();
			$("#count").html("Correct!");
			setTimeout(function(){
			$("#count").html(temp);
			}, 500);
				setTimeout(function() {
				start();
				}, 2000);
			}
		}
		//if it's wrong, replay the compButtons array
		else {
			var temp=$("#count").html();
			$("#count").html("Wrong!");
			setTimeout(function(){
			$("#count").html(temp);
			}, 500);
			setTimeout(function() {
			i=0;
			replay();
		}, 1500);
		}
	});
	//game decisions based upon whether user has chosen correctly or not
	
	});
 