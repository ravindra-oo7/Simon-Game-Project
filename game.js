var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var isGameStart = false;

// --- KeyPress on keyboard event handling ---
// press any key on Keyboard
// If game is already in running then it will not respond
// if game is not in running state then it will change heading and START THE GAME
$(document).keypress(function () {
  if (!isGameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

// --- Button click event handle ---
// When button from game screen is clicked, userChoosenColour will be pushed into userClickedPattern[] array
// Sound will be played and animation also applied by changing CSS STYLE for perticular selection
//  Answer choosen by player will be Checked using checkAnswer(---) function
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  var indexOfLastEntry = userClickedPattern.length - 1;
  checkAnswer(indexOfLastEntry);

  console.log(userChosenColour); // Outputs the ID of the clicked button
});

// ---checkAnswer() function---
// first element in gamePattern[currentLevel] will be checked with userClickedPattern[currentLevel] at same index
// if element entered same then length of both array is matched if same or not
// if both condition true then call nextSequence() after 1 sec(1000 milisec) |continuing game
// if element not matched play wrong-sound, change body CSS STYLE by appliying game-over class, change h1 heading
// then removeClass after 0.2 sec to make our game on restart state
// call for startover function , which will reset all game values
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    console.log("userClickedPattern :" + userClickedPattern);
    console.log("gamePattern :" + gamePattern);
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart!!");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// ---nextSequence() function---
// nextSequence() function called means player is still playing hence
// we will emptied userClickedPattern[] array ,
// then increase level of palyer and print it on heading section
// Generate new random number between 0-3 to give new color to player for playing
// Game will add this color into older array gamepattern[] which is storying colors in sequace
// Apply animation to color choosen button to show player which color is Choosen
// Play distinct sound of that color choosen to make game more interesting
// set isGameStart value to true as game is started now if it is first time
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  isGameStart = true;
}

// --- playSound() function
// catch passed arument and create new Audio object using audio file path
// play audio
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// ---animatePress() function
// to animatePress we will add "pressed" CSS Styled class and remove it after 0.1 sec
function animatePress(currentColour) {
  var activeButton = $("#" + currentColour);
  $(activeButton).addClass("pressed");

  setTimeout(function () {
    activeButton.removeClass("pressed");
  }, 100);
}

// ---startOver() ---
// Reset all values to take our game to initial state
function startOver() {
  level = 0;
  gamePattern = [];
  isGameStart = false;
}
