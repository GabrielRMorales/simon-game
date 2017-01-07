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
var choiceOn=false;
var strict=false;
var replaying=false;
//start function-this finds a random number and pushes it into the compButtons array then plays all items in the compButtons array

function start(){
	 	count++;
  	$("#count").html(count);
		i=0;
		var random=Math.ceil(Math.random() * (4)-1);
		var computerId=(choices[random]);
		compButtons.push(computerId);
		setTimeout(function(){
			replay();	
		},1000);		
}

function reset(){
strict=false;
$("span").html("Off");
choiceOn=false;
replaying=false;
compButtons=[];
userButtons=[];	
i=0;
j=0;
count=0;
playerMadeChoice=true;
$("#count").html("0"+count);
}

$("#reset").click(function(){
	reset();
});
$("#strict").click(function(){
	strict=true;
	$("span").html("On");
});

//replay function-once i is set to 0 by another function, this will replay all the compButton array values (until i=compButtons.length-1)
function replay(){
	replaying=true;
	choiceOn=false;
	playerMadeChoice=false;
	userButtons=[];
		j=0;
		var current=compButtons[i];
		var idSelector=choices.indexOf(compButtons[i]);
		
		$(current).css("background-color", "white");
		beeps[idSelector].play();
		setTimeout(function() {
		$(current).css("background-color", colors[idSelector]); 	
	}, 500);
	
		setTimeout(function(){
	if (i!==compButtons.length-1){
		i++;
		replay();	
	}	
	else {
		choiceOn=true;
		replaying=false;
		setTimeout(function(){
			//if the user does nothing, the game will automatically replay
			if (playerMadeChoice==false&&userButtons.length<compButtons.length&&replaying==false){
				if (strict==false){
				i=0;
				replay();
			}
				else if (strict==true){
					reset();
				}
			}
			}, 3000);
	}		
	}, 1000);	
	
}

 //initiate the simon game with the given process
 	$("#start").click(function(){	 	
	start();	
	});
	//function for the player's response-this will keep the game going

		$(".color").click(function(){
			playerMadeChoice=true;
			//clicking on color should brighten it
			if (choiceOn==true){
			$(this).css("background-color", "white");
		 var playerChoiceId="#"+$(this).attr("id");
		 var playerChoice=choices.indexOf(playerChoiceId);
		beeps[playerChoice].play();
		setTimeout(function() {
		$(playerChoiceId).css("background-color", colors[playerChoice]); 
	}, 500)
		//push choice into userButton arrays
		userButtons.push(playerChoiceId);		
		//compare with the compButton arrays
		//if correct, increase iterator to continue comparing
		if (userButtons[j]===compButtons[j]){
			j++;
			if (j==compButtons.length){
			var temp=$("#count").html();
			if (temp==7){
				setTimeout(function() {
				$("#count").html("You've won! Resetting.");	
				setTimeout(function() {
					reset();
				},500);			
			},1000);
				
			}
			else{
			$("#count").html("Correct!");
			setTimeout(function(){
			$("#count").html(temp);
			}, 500);
				setTimeout(function() {
				start();
				}, 1500);
			}
		}
	}
		//if it's wrong, replay the compButtons array
		else {
			var temp=$("#count").html();
				if (strict==true){
					$("#count").html("Wrong! Resetting!");
				}
				else {
				$("#count").html("Wrong!");
				}
			setTimeout(function(){
			$("#count").html(temp);
			}, 500);
			setTimeout(function() {
			if (strict==false){
			i=0;
			replay();
			}
			else if (strict==true){
				reset();
				start();
			}
		}, 1500);
		}
	}
	});
});
 