var panel = $('#quiz-area');
var countStartNumer = 30;
var Smurfs_Theme_Song = new Audio("./assets/sound/Smurfs_Theme_Song.mp3");
var gargamel = new Audio("./assets/sound/gargamel.mp3")


$(document).ready(function() {
   Smurfs_Theme_Song.play();
});

    // start the game when user clicks on Start button
    $(document).on('click', '#start-over', function(e) {
      game.reset();
  });

  $(document).on('click', '.answer-button', function(e) {
      game.clicked(e);
  });
  
  $(document).on('click', '#start', function(e) {
      $('.timer').append('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
      game.loadQuestion();
      Smurfs_Theme_Song.pause();
  });
  
  ///////////////////////////////////////////////////////////////////////////////
  //Question set
  //////////////////////////////////////////////////////////////////
  // array of objects with the questions, possible answers, and the correct answer
  var questions =[{
      question: "Which smurf wore glasses?",
      answers: ["Vanity Smurf,Brainy Smurf, Bifocal Smurf"],
      correct: "Brainy Smurf"
    },{
      question: "What year did the smurfs animated television series air in the U.S?",
      answers: ["1979, 1980, 1981"],
      correct: "1981"
    }, {
      question: "What do the Smurfs live in?",
      answers: ["molehills", "caves", "mushrooms"],
      correct: "mushrooms"
    }, {
      question: "Which character is in charge of the Smurfs?",
      answers: ["Brainy Smurf", "Commander Smurf", "Papa Smurf"],
      correct: "Papa Smurf"
    },{
      question: "What color is Smurfettes hair?",
      answers: ["red", "white", "blond"],
      correct: "blond"
    },{
      question: "What was the name of the villan in The Smurfs?",
      answers: ["Azreal", "Gargamel", "Mumm ra"],
      correct: "Gargamel"
    },{
      question: "What color are Papa Smurfs hat and pants?",
      answers: ["white", "red", "yellow"],
      correct: "red"
    },{
      question: "What is tha name of Gargamels cat?",
      answers: ["Frisky", "Azreal", "Rumplestiltskin"],
      correct: "Azreal"
    },{
      question: "How many female smurfs are there?",
      answers: ["one", "three", "two"],
      correct: "three - Smurfette,Sassette Smurfling,and Nanny Smurf"
    },{
      question: "Which Smurf wears yellow clothes?",
      answers: ["Papa Smurf", "Happy Smurf","Granpa Smurf"],
      correct: "Granpa Smurf"
    }];


var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,
  countdown: function() {
      game.counter--;
      $('#counter-number').html(game.counter);

      if (game.counter === 0) {
          console.log('TIME UP');
          game.timeUp();
      }
  },
  loadQuestion: function() {
      timer = setInterval(game.countdown, 1000);
      panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
      for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
          panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
      }
  },
  nextQuestion: function() {
      game.counter = countStartNumber;
      $('#counter-number').html(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
  },
  timeUp: function() {
      badSound.play();
      clearInterval(timer);
      $('#counter-number').html(game.counter);

      panel.html('<h2>Out of Time!</h2>');
      panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
      panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

      if (game.currentQuestion === questions.length - 1) {
          setTimeout(game.results, 3 * 1000);
      } else {
          setTimeout(game.nextQuestion, 3 * 1000);
      }
  },
  results: function() {
      finalSound.play();
      clearInterval(timer);

      panel.html('<h2>All done, heres how you did!</h2>');
      $('#counter-number').html(game.counter);
      panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
      panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
      panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
      panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
      clearInterval(timer);

      if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
          this.answeredCorrectly();
      } else {
          this.answeredIncorrectly();
      }
  },
  answeredIncorrectly: function() {
      badSound.play();
      game.incorrect++;
      clearInterval(timer);
      panel.html('<h2>Nope!</h2>');
      panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
      panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

      if (game.currentQuestion === questions.length - 1) {
          setTimeout(game.results, 3 * 1000);
      } else {
          setTimeout(game.nextQuestion, 3 * 1000);
      }
  },
  answeredCorrectly: function() {
      gargamel.play();
      clearInterval(timer);
      game.correct++;
      panel.html('<h2>Correct!</h2>');
      panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

      if (game.currentQuestion === questions.length - 1) {
          setTimeout(game.results, 3 * 1000);
      } else {
          setTimeout(game.nextQuestion, 3 * 1000);
      }
  },
  reset: function() {
      this.currentQuestion = 0;
      this.counter = countStartNumber;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
  }
};
