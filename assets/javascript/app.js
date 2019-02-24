
$(document).ready(function(){

    // start the game when user clicks on Start button
    $("#start-button").on("click", gameStatus.startTimer);
  
  });
  
  // information about the state of game play
  var gameStatus = {
  
    // set the time at 60 seconds, and count down by 1 second
    timeRemaining : 60,
  
    // start the timer, hide the start page, show the questions
    startTimer: function() {
      $("#timer").text("Time remaining: " + gameStatus.timeRemaining);
      setInterval(gameStatus.countdown, 1000);
      $("#start-page").hide();
      trivia.displayQuestions();
    },
  
    // decrement the timer and update the UI; stop the timer at 0
    countdown: function() {
      gameStatus.timeRemaining--;
      $("#timer").text("Time remaining: " + gameStatus.timeRemaining);
      if (gameStatus.timeRemaining === 0) {
        gameStatus.stopTimer();
        $("#timer").empty();
      }
    },
  
    // stop the timer and check the answers
    stopTimer: function() {
      clearInterval();
      trivia.checkAnswers();
    },
  
    // hide the quetions and display the end page with results
    showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
      $("#end-page").show();
      $("#questions-box").empty();
      $("#timer").empty();
      $("#timer").hide();
      $("#correct-answers").text("Correct answers (smurferrific!): " + numCorrect);
      $("#incorrect-answers").text("Incorrect answers (aww smurf!): " + numIncorrect);
      $("#unanswered").text("Skipped questions (): " + numUnanswered);
    }
  }
  
  // functions to handle the building questions page and scoring
  var trivia = {
  
    // pull questions from the array of questions, loop through them, and append to UI
    displayQuestions: function() {
      var divContainer = $("#questions-box");
      var answerGroup = $(".form-check");
      divContainer.append('<h2>Answer the following questions:</h2>');
              
      for (var i = 0; i < questionBank.length; i++) {
  
        divContainer.append('<div id="question">' + questionBank[i].question + '</div>');
  
        var answer1 = questionBank[i].answers[0];
        var answer2 = questionBank[i].answers[1];
        var answer3 = questionBank[i].answers[2];
  
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
        divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
      }
  
      // add a Done button to the end of the page and register its click handler
      var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
      divContainer.append(doneButton);
      $("#done-button").on("click", gameState.stopTimer);
    },
  
    // test if the user answers are correct, incorrect, or if there are unanswered questions
    checkAnswers: function() {
      var correctAnswer;
      var userAnswer;
      var numCorrect = 0;
      var numIncorrect = 0;
      var numUnanswered = 0;
  
      // loop through to compare the text of the label with the user answers
      // increment score counts appropriately
      for (var i = 0; i < questionBank.length; i++) {
        correctAnswer = questionBank[i].correct;
        userAnswer = $('input[id=radio'+i+']:checked + label').text();
  
        if (userAnswer === correctAnswer) {
          numCorrect++;
        } else if (userAnswer === "") {
          numUnanswered++;
        } else if (userAnswer !== correctAnswer) {
          {
            numIncorrect++;
          }
        }
      }
  
      // show the end page with the score tally
      gameStatus.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
  }
  
  // array of objects with the questions, possible answers, and the correct answer
  var questionBank =
  [
    {
      question: "Which smurf wore glasses?",
      answers: ["Vanity Smurf,Brainy Smurf, Bifocal Smurf"],
      correct: "Brainy Smurf"
    },
  
    {
      question: "What year did the smurfs animated television series air in the U.S?",
      answers: ["1979, 1980, 1981"],
      correct: "1981"
    },
    {
      question: "What do the Smurfs live in?",
      answers: ["molehills", "caves", "mushrooms"],
      correct: "mushrooms"
    },
    {
      question: "Which character is in charge of the Smurfs?",
      answers: ["Brainy Smurf", "Commander Smurf", "Papa Smurf"],
      correct: "Papa Smurf"
    },
    {
      question: "What color is Smurfettes hair?",
      answers: ["red", "white", "blond"],
      correct: "blond"
    },
    {
      question: "What was the name of the villan in The Smurfs?",
      answers: ["Azreal", "Gargamel", "Mumm ra"],
      correct: "Gargamel"
    },
    {
      question: "What color are Papa Smurfs hat and pants?",
      answers: ["white", "red", "yellow"],
      correct: "red"
    },
    {
      question: "What is tha name of Gargamels cat?",
      answers: ["Frisky", "Azreal", "Rumplestiltskin"],
      correct: "Azreal"
    },
    {
      question: "How many female smurfs are there?",
      answers: ["one", "three", "two"],
      correct: "three - Smurfette,Sassette Smurfling,and Nanny Smurf"
    },
    {
      question: "Which Smurf wears yellow clothes?",
      answers: ["Papa Smurf", "Happy Smurf","Granpa Smurf"],
      correct: "Granpa Smurf"
    }
    ];