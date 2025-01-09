$(document).ready(function () {
    let userClickedPattern = [];
    let gamePattern = [];
    let buttonColours = ["red", "blue", "green", "yellow"];

    $(".btn").click(function(){
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
    });

    function nextSequence(){
        let randNum = Math.floor(Math.random() * 4);
        let randomChosenColour = buttonColours[randNum];
        gamePattern.push(randomChosenColour);

        $('#'+randomChosenColour).fadeOut(50).fadeIn(50);

        let audio = new Audio('sounds/'+randomChosenColour+'.mp3');
        audio.play();
    }
});

    

