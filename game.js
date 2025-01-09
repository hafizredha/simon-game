
let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let started = false;
let level = 0;

$(document).keypress(function(){
    if (!started) {
        nextSequence();
        started = true;
        $("#level-title").text("Level "+level);
    }
});

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    userClickedPattern = [];

    let randNum = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randNum];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    $('#'+randomChosenColour).fadeOut(50).fadeIn(50);

    playSound(randomChosenColour);
}

function playSound(name){
    let audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    console.log(currentLevel);
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(gamePattern.length -1 == currentLevel){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound('wrong');
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

    

