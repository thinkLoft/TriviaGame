//  Interval Exercise (follow the instructions below).

//  This code will run as soon as the page loads.
window.onload = function() {
  //  Click events are done for us:
  $('#validate').click(validate);
  $('#start').click(timer.start);
};

//  Variable that will hold our setInterval that runs the timer
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

//  Our timer object.
var timer = {
  time: 30,

  reset: function() {
    timer.time = 30;

    //  TODO: Change the "display" div to "00:00."
    $('#display').html('00:30');
  },

  start: function() {
    //  TODO: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      intervalId = setInterval(timer.count, 1000);
      clockRunning = true;
      getQuestion(questionCounter);
    }
  },

  stop: function() {
    //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockrunning = false;
  },

  count: function() {
    //  TODO: increment time by 1, remember we cant use "this" here.
    if (timer.time === 0) {
      alert('You ran out of time!');
      validate();
    } else {
      timer.time--;
      //  TODO: Get the current time, pass that into the timer.timeConverter function,
      //        and save the result in a variable.
      // currentT = timer.timeConverter(time);
      //  TODO: Use the variable you just created to show the converted time in the "display" div.
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

var question1 = {
  question: 'What year was the last Ontario Elections (As of July 2018)?',
  answers: [2014, 2015, 2016, 2017, 2018],
  correct: 2018
};

var question2 = {
  question: 'Who Won the Last Ontario Elections?',
  answers: [
    'Progressive Conservative Party of Ontario',
    'Ontario New Democratic Party',
    'Ontario Liberal Party',
    'Green Party of Ontario'
  ],
  correct: 'Progressive Conservative Party of Ontario'
};

var question3 = {
  question: 'Who is the leader of the winning Party?',
  answers: ['Doug Ford', 'Andrea Horwath', 'John Fraser', 'Mike Schreiner'],
  correct: 'Doug Ford'
};

var questionDatabase = [question1, question2, question3];
var questionCounter = 0;

function getQuestion(x) {
  $('#question').html(questionDatabase[x].question);
  $('#answers').html('');
  for (i = 0; i < questionDatabase[x].answers.length; i++) {
    $('#answers').append(
      '<input type="radio" name="answers" value="' +
        i +
        '">' +
        questionDatabase[x].answers[i] +
        '<br>'
    );
  }
}

function validate() {
  var ans =
    questionDatabase[questionCounter].answers[
      $('input[type=radio][name=answers]:checked').val()
    ];
  if (ans !== undefined) {
    if (ans === questionDatabase[questionCounter].correct) {
      alert('Correct!');
    } else {
      alert('Wrong!');
    }
  }
  timer.stop();
  timer.reset();
  if (questionCounter < questionDatabase.length) {
    questionCounter++;
    getQuestion(questionCounter);
    timer.start();
  } else {
    alert('You Won the game!');
  }
}
