$(document).ready(function(){

var choices=["#top-left","#top-right","#bottom-left","#bottom-right"];
var colors=["blue","green","red","yellow"];
var compButtons=[];
var userButtons=[];
var count=0;

//make sure to initiate the game itself
	$("#start").click(function(){
		
	var playerMadeChoice=false;
	var random=Math.ceil(Math.random() * (4)-1);
	var computerChoice=$(choices[random]).css("background-color");
	console.log("game on");
	compButtons.push(choices[random]);
	count++;
	$("#count").html(count);
	$(choices[random]).css("background-color","white");	
	setTimeout(function() {
        $(choices[random]).css("background-color", computerChoice);
    }, 300);

	//do {
		$(".color").click(function(){
		var playerChoice=$(this).css("background-color");
		var playerChoiceID=$(this).attr("id");
		$(this).css("background-color","white");	
		
	setTimeout(function() {
        $("#"+playerChoiceID).css("background-color", playerChoice);
    }, 300);
			playerMadeChoice==true;
			userButtons.push("#"+playerChoiceID);
			console.log("compButtons "+compButtons);
	console.log("userButtons "+userButtons);
	var choicesCorrect=true;

	setTimeout(function() {
	for (var i=0;i<compButtons.length;i++){
		console.log("checking");
		if (compButtons[i]!=userButtons[i]){
			choicesCorrect=false;
		}
	}
	

	if (choicesCorrect==false){
		
		for (var i=0;i<compButtons.length;i++){
		var computerChoice=$(compButtons[i]).css("background-color");
		var computerId="#"+$(compButtons[i]).attr("id");
		$(compButtons[i]).css("background-color","white");
		setTimeout(function() {
   		$(computerId).css("background-color",computerChoice);
		 }, 500);    	
		}
	}

		}, 300);

		});

	//}
	//while(playerMadeChoice==false);
	
	});






});