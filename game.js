
let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let started = false;
let level = 0;

$(document).on("keypress touchstart", function(){
    if (!started) {
        started = true;
        
        setTimeout(function(){
            nextSequence();
        }, 100);
    }
});

$(".btn").click(function(){
    if(started){
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
        playSound(userChosenColour);
        animatePress(userChosenColour);
    }
});

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    userClickedPattern = [];

    let randNum = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randNum];
    gamePattern.push(randomChosenColour);

    $('#'+randomChosenColour).fadeOut(50).fadeIn(50);

    playSound(randomChosenColour);
}

function playSound(name){
    let audio = new Audio('sounds/'+name+'.mp3');
    audio.play().catch(function (error) {
        console.log("Playback failed:", error);
    });
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
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

    

