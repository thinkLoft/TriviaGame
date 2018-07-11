//  Answer Button Listener not present onload
$(document).on('click', '.answer', function() {
  validate($(this).val());
});

//  Start Button Listener which dynamically disappears on start
$(document).on('click', '#start', function() {
  timer.start();
  getQuestion(questionCounter);
});

//  Reset Button Listener static on Load
window.onload = function() {
  $('#reset').on('click', reset);
};

//  Variable that will hold our setInterval that runs the timer
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

var defaultTime = 10;

//  Our timer object.
var timer = {
  // default time
  time: defaultTime,

  // reset function
  reset: function() {
    timer.time = defaultTime;
    $('#display').html('00:' + defaultTime);
  },

  // Start Timer function
  start: function() {
    //Checks if the clock is running
    if (!clockRunning) {
      $('#display').html('00:' + defaultTime);
      intervalId = setInterval(timer.count, 1000);
      clockRunning = true;
    }
  },

  // Stop Timer function
  stop: function() {
    clearInterval(intervalId);
    clockRunning = false;
  },

  // This is the countdown function for the timer
  count: function() {
    // checks if the countdown reaches 0
    if (timer.time === 0) {
      // runs the validate function without an answer
      validate();
    } else {
      // ticks downt he timer and updates the time
      timer.time--;
      $('#display').html(timer.timeConverter(timer.time));
    }
  },

  timeConverter: function(t) {
    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (minutes === 0) {
      minutes = '00';
    } else if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return minutes + ':' + seconds;
  }
};

// Starting of what will become the Questionnaire object
// First lines are variable initializations

// First Question Object
var question1 = {
  question: '1. What year was the last Ontario Elections (As of July 2018)?',
  answers: [2014, 2015, 2016, 2017, 2018],
  correct: 2018
};
// Second Question Object
var question2 = {
  question: '2. Who Won the Last Ontario Elections?',
  answers: [
    'Progressive Conservative Party of Ontario',
    'Ontario New Democratic Party',
    'Ontario Liberal Party',
    'Green Party of Ontario'
  ],
  correct: 'Progressive Conservative Party of Ontario'
};

// Third Question Object
var question3 = {
  question: '3. Who is the leader of the winning Party?',
  answers: ['Doug Ford', 'Andrea Horwath', 'John Fraser', 'Mike Schreiner'],
  correct: 'Doug Ford'
};

// Fourth Question Object
var question4 = {
  question: '4. How many seats are in the Ontario Legislature?',
  answers: [205, 85, 124, 276],
  correct: 124
};

// Fifth Question Object
var question5 = {
  question: '5. What day was voting held?',
  answers: ['June 1', 'June 2', 'June 6', 'June 7'],
  correct: 'June 7'
};

// Sixth Question Object
var question6 = {
  question: '6. What Number Election did we just have?',
  answers: [40, 41, 42, 43],
  correct: 42
};

// Seventh Question Object
var question7 = {
  question: '7. How many seats are needed for the majority?',
  answers: [40, 63, 12, 94],
  correct: 63
};

// Eith Question Object
var question8 = {
  question: '8. Which Year had the Highest Voter Turnout?',
  answers: [1999, 2007, 2011, 2018],
  correct: 1999
};
// Array to hold all the questions to allow iteration
var questionDatabase = [
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
  question8
];
// Key Variables to keep track, assigning all to zero
var questionCounter, userRight, userWrong, Unanswered;
questionCounter = userRight = userWrong = unAnswered = 0;

// Updates HTML with the current Question and it's respective Answers
function getQuestion(x) {
  // Gets Latest Question
  $('#question').html('<h1>' + questionDatabase[x].question + '</h1>');
  // Clears any previous answers
  $('#answers').html('');
  // Adds each answer
  for (i = 0; i < questionDatabase[x].answers.length; i++) {
    $('#answers').append(
      '<button class="answer btn btn-outline-primary btn-lg" value="' +
        i +
        '">' +
        questionDatabase[x].answers[i] +
        '</button></br>'
    );
  }
}

// Validate verifies the user input and lets them know if the answer is right or wrong
function validate(v) {
  // stop the timer
  timer.stop();
  //assign user response
  var ans = questionDatabase[questionCounter].answers[v];
  // retrieve correct answer from Question Object
  var correctAnswer = questionDatabase[questionCounter].correct;
  // Checks if the answer is correct
  if (ans !== undefined) {
    if (ans === correctAnswer) {
      userRight++;
      $('#answers').css('color', 'green');
      $('#answers').html('<h2>You got it right!</h2>');
    } else {
      userWrong++;
      $('#answers').css('color', 'red');
      $('#answers').html("<h2>You're incorrect!</h2>");
      $('#answers').append('<h3>Your Answer: ' + ans + '</h3>');
    }
  } else {
    unAnswered++;
    $('#answers').css('color', 'white');
    $('#answers').html('<h1>You Ran out of Time!</h1>');
  }
  // Shows the user the correct Answer
  $('#answers').append('<h3> Correct Answer: ' + correctAnswer + '</h3>');
  // This section checks if there are any more questions left to ask
  if (questionCounter < questionDatabase.length - 1) {
    questionCounter++;
    timer.reset();
    setTimeout(function() {
      timer.start();
      getQuestion(questionCounter);
    }, 5000);
  } else {
    //This section is when the game has asked all questions and tells you the score
    setTimeout(function() {
      $('#question').html('This is the end of the Game!');
      $('#answers').css('color', 'white');
      $('#answers').html('<h3> Here is your Score</h3>');
      $('#answers').append('Correct Answers: ' + userRight + '</br>');
      $('#answers').append('Incorrect Answers: ' + userWrong + '</br>');
      $('#answers').append('Unanswered: ' + unAnswered + '');
    }, 5000);
  }
}

function reset() {
  timer.stop();
  timer.time = defaultTime;
  questionCounter = userRight = userWrong = unAnswered = 0;
  $('#display').html('00:00');
  $('#question').html(
    '<button id="start" class="btn btn-success btn-lg">Start</button>'
  );
  $('#answers').html('');
  $('#result').html('');
}
