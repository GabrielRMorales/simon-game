//make sure functions are pure 
//can code additional methods to incorporate via Object.assign
//ex: checkVictory, checkAccuracy
const simonGame = ()=>{
    let simonMoves =[];
    let userMoves = [];
    let isUserTurn = false;
    let round = 0;

    return {
        simonMoves,
        userMoves,
        round,
        isUserTurn
    };
}

const currentGame = simonGame();

//needs to check if X turns has passed
const roundCount = ()=>{
    currentGame.round +=1;
}

//Upon user clicking start button, randomly select 3 colors and set these as simonMoves
//addColors function
const addColors = ()=>{
    const colors = ["green","blue","red","yellow"];
    let random=Math.floor(Math.random()*4);
    currentGame.simonMoves.push(colors[random]);
    roundCount();
    
}

//playLight function
const playLight = (lightColor, col="white")=>{
   // let lightEl = document.getElementById(lightColor);
    //add light up class for 1 second
    $(`#${lightColor}`).css("background-color", col);
}

const playSound = (colInd)=>{
var buttonBeepOne=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var buttonBeepTwo=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var buttonBeepThree=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var buttonBeepFour=new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
const beeps=[buttonBeepOne,buttonBeepTwo,buttonBeepThree, buttonBeepFour];
beeps[colInd].play();
}

//playPattern-needs its own function
//should be done with setTimeouts, one light flash/second. Use promises if necessary
const playPattern = (arr=currentGame.simonMoves) => {
    //always reset userMoves each turn
    currentGame.userMoves=[];
    //an async await function is another option
    //or potentially just a for loop 
    let completed = arr.reduce((acc, curr)=>{
        return acc.then(function(){
          //refactor
            return new Promise (function(resolve){
                setTimeout(function(){
                    playLight(curr);
                    playSound(arr.indexOf(curr));
                    console.log("now it's wite");
                    resolve();
                }, 1000);
                console.log("this should fire");
            }).then(function(){
                return new Promise(function(resolve){
                    setTimeout(function(){
                        playLight(curr, curr);
                        resolve();
                    }, 1000);
                });
            });
            /*return new Promise(function(resolve){
                    //playLight
                    playLight(curr);
                    //playSound
                setTimeout(function(){
                    //remove light class
                    playLight(curr, curr);
                    console.log(curr);
                    resolve();
                }, 1000);
            });    */
            
            
        })
    }, Promise.resolve());
    //once the loop is finished, set isUsersTurn to true
    completed.then(function(){
        currentGame.isUserTurn = true;
    });      
}

//comparePatterns function
const comparePatterns = ()=>{
    let wrongIndex;
    let sameMoves = currentGame.simonMoves.every(function(el, index){
        //get wrong index here
        if (el!==currentGame.userMoves[index]){
            wrongIndex=index;
            return false;
        }
            return true;
    });
    if (sameMoves === true) {
        //check if game is over
        if (currentGame.round===6){
            console.log("User wins!");
        }
        //continueGame functions
        addColors();
        playPattern();
    }
    else {

        //if strict mode-start over and invoke an initialize function

        //else ifnormal mode-replay colors
        let replayColors=currentGame.simonMoves.slice(wrongIndex);
        playPattern(replayColors);
    }

}
   

//setEventListeners for buttons-upon click, if it's the usersTurn, add them to the userMoves array
//once userMoves.length is same as simonMoves, set isUsersTurn to false and compare patterns

const addUserControls = ()=>{

    let lights = document.querySelectorAll(".game-light");
    lights.forEach(btn=>{
        btn.addEventListener("click",function(){
            if (currentGame.isUserTurn===true){
                currentGame.userMoves.push(this.id);
                //should blink and play sound
                console.log(currentGame.userMoves);
                if (currentGame.userMoves.length === currentGame.simonMoves.length){
                    currentGame.isUserTurn = false;
                    comparePatterns();
                }
            }
        });
    });

    //add StrictMode
    
}

//invocation of functions-make an initialize function

const initialize = ()=>{
    //const currentGame = simonGamePiece();--do this here
    addUserControls();
    addColors();
    playPattern(currentGame.simonMoves);
    
}
    
//add StartGame to invoke initialize
let startButton = document.getElementById("start");
startButton.addEventListener("click", initialize);
//make a continueGame function to be used between turns


//addStrictMode later
//for these, they don't need to be based on if statements
//it can also be changing a function defintion upon click-though this would conflict
//with const and how would the old function definition be returned? Maybe use Simon Game 
// strict method vs non-strict methods