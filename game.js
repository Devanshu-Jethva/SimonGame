var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text(`level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    playSound(randomChosenColor);
    setInterval(() => {
        $("#" + randomChosenColor).fadeIn();
    }, 100);
    $("#" + randomChosenColor).fadeOut();
}

$(".btn").on("click", function () {
    userClickedPattern.push(this.id);
    console.log(userClickedPattern);
    playSound(this.id);
    animatePress($(this));
    if(userClickedPattern.length == level){
        checkAnswer();
    }
})

function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    currentColor.addClass("pressed");
    setInterval(() => {
        currentColor.removeClass("pressed")
    }, 100);
}

$(document).on("keypress", () => {
    nextSequence();
    $(document).unbind();
})

function checkAnswer() {
    if (gamePattern.join() == userClickedPattern.join()) {
        nextSequence();
    }
    else {
        gamePattern = [];
        playSound("wrong");
        $("#level-title").text("Game Over, Press any key to restart");
        $("body").css("backgroundColor", "red");
        setInterval(() => {
            $("body").css("backgroundColor", "#011F3F");
        }, 200);
        $(document).on("keypress", () => {
            nextSequence();
            $(document).unbind();
        })
        level = 0;
    }
}