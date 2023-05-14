
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress("#"+$(this).attr("id"));
    // console.log(userClickedPattern);

    var audioPath=$(this).attr("id")+".mp3";
    playSound(audioPath);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var clrid="#"+randomChosenColour;
    animatePress(clrid)

    var path=randomChosenColour+".mp3";
    playSound(path);
}

function playSound(name){
    var sound=new Audio(name);
    sound.play();
}

function animatePress(currentColour){
    // console.log("class "+ currentColour);
    $(currentColour).addClass('pressed');
    setTimeout(function () {
        $(currentColour).removeClass("pressed");
      }, 100);

}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        // console.log("success");
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        // console.log("wrong");
        var audio=new Audio('wrong.mp3');
        audio.play();
        $("#level-title").text("game over");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    setTimeout(function(){
        $("#level-title").text("Press A Key to Start");
    },1000);
    
}