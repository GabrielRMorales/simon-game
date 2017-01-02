$(document).ready(function(){

var choices=["#top-left","#top-right","#bottom-left","#bottom-right"];
var colors=["blue","green","red","yellow"];
var compButtons=[];
var userButtons=[];	
var count=0;
var playerMadeChoice=true;

//replay button function in case user's response is false or not incomplete
function replay(){
	for (var i=0;i<compButtons.length;i++){
		var computerChoice=$(compButtons[i]).css("background-color");
		var computerId="#"+$(compButtons[i]).attr("id");
		$(compButtons[i]).css("background-color", "white");
		
		setTimeout(function() {
   		$(computerId).css("background-color","black");
		 }, 300);    	
		}		
}
//function for the random buttons to actually play
	function game(){
	userButtons=[];
	playerMadeChoice=false;  
	if (count==3){
	console.log("Game over");
	}
	if (compButtons.length>0){
	replay();
	console.log("replay done");
	}
	
	var random=Math.ceil(Math.random() * (4)-1);
	var computerChoice=$(choices[random]).css("background-color");
	
	compButtons.push(choices[random]);
	console.log(compButtons);
	count++;
	$("#count").html(count);
	$(choices[random]).css("background-color", "white");	
	setTimeout(function() {
        $(choices[random]).css("background-color", "black");
    }, 300);
	//as part of game, if the user does nothing, the game will automatically replay
	/*setTimeout(function() {
	if (playerMadeChoice==false){
		replay();	}
	
	}, 5000);*/

	}
	

 //initiate the simon game with the given process
 	$("#start").click(function(){
	
	game();

	});

	//function for the player's response-this will keep the game going

		$(".color").click(function(){
		var choicesCorrect=true;
		var playerChoice=$(this).css("background-color");
		var playerChoiceID=$(this).attr("id");
		$(this).css("background-color", "white");	
		
	setTimeout(function() {
        $("#"+playerChoiceID).css("background-color", "black");
    }, 300);

		userButtons.push("#"+playerChoiceID);
		console.log("CompButtons length is "+compButtons.length);
		console.log("userButtons length is "+userButtons.length);
		console.log(userButtons);
		//make sure the player has clicked the right amount of buttons
		if (compButtons.length==userButtons.length){
		playerMadeChoice=true;

		console.log("playerMadeChoice is "+playerMadeChoice);
		}	
	//compare user's buttons to computer's buttons-if any are incorrect, user's choices are incorrect
	if (playerMadeChoice==true){
	for (var i=0;i<compButtons.length;i++){
		console.log("comparing");
		if (compButtons[i]!=userButtons[i]){
			choicesCorrect=false;
		}		
	}
	}
	//game decisions based upon whether user has chosen correctly or not
	setTimeout(function() {
	if (playerMadeChoice==true&&choicesCorrect==true){
		console.log("player chose correct");
		game();
	}
	else if (choicesCorrect==false){
		replay();
	}
	}, 500);

	});
 




});