let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

let level = 0;
let isOn = false;

$(document).keydown(function (event) {
    if (!isOn && event.key === "a") {
        $("#level-title").text("Level " + level);
        nextSequence();
        isOn = true;
    }
})

$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animateColour(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound (name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animateColour (currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 300);
    }
    }   
    else {
      audio = new Audio("sounds/wrong.mp3");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }

function startOver () {
    level = 0;
    isOn = false;
    gamePattern = [];
}