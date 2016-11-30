(function() {
  var data1 = [{
    question: "Pick the undesirable user experience goal:",
    choices: ["Enjoyable", "Exciting", "Boring", "Helpful", "Rewarding"],
    correctAnswer: 3
  }, {
    question: "Pick the desirable user experience goal:",
    choices: ["Annoying", "Childish", "Cutesy", "Motivating", "Unpleasant"],
    correctAnswer: 4
  }, {
    question: "What is not a interaction type?",
    choices: ["Instructing", "Sleeping", "Conversing", "Manipulating", "Exploring"],
    correctAnswer: 2
  }, {
    question: "What is not a stage in information processing?",
    choices: ["Response Execution", "Response Selection", "Comparison", "Encoding", "Eating"],
    correctAnswer: 5
  }, {
    question: "Which of these is an example of social interaction using modern technology?",
    choices: ["Tele-presence", "Talking", "Shouting", "Yelling", "Smoke Signals"],
    correctAnswer: 1
  }];
  
	var data2 = [{
  	question: "These are the advantages of __________ : Can be used early on, inexpensive and easy to create, make design idea visual, no special knowledge is required and all team members can creat them.",
 	 choices: ["Personas", "Direct Manipulation", "Rapid Prototyping", "Lo-fi prototype"],
  	correctAnswer: 4
	}, {
  	question: "The following statements are disadvantages of __________: They can be dificult to create if the target audience is international, Too much will make the work difficult, There is a risk of incoroporating unsupported designer assumption.",
  	choices: ["Card Sort", "Personas ", "Menu-based Interface", "Semantics"],
  	correctAnswer: 2
	}, {
  	question: "Observation and elicitation are :",
  	choices: ["Tools for Physical Design", "Advantages of natural language", "Types of Observation", "Methods of Collection"],
  	correctAnswer: 1
	}, {
  	question: "Which of he following are not one of Nielson's Heuristics for User Interface Design?",
  	choices: ["Error Prevention", "Consistency and Standards", "Help and Documentation", "Encoding", "Recognition Rather Than Recall"],
  	correctAnswer: 4
	}, {
  	question: "Participants, design and testers are: ",
  	choices: ["Three phases in direct manipulation", "Three basic components for usability testing", "Three main criteria for lo-fi prototype", "Three main criteria for hi-fi prototype"],
  	correctAnswer: 2
	}];
	
	var data3 = [{
  	question: "These are the advantages of __________ : Ease of Learning, Low memory requirement, flexible interaction, low screen requirement, appropriate for beginner",
  	choices: ["Commmand line", "Natural Language", "Menu-based Interface", "Usability Testing"],
  	correctAnswer: 2
  }, {
  	question: "Time, finance, personnel and laboratory are all _______",
  	choices: ["Advantages of usability testing", "Interaction styles", "Constraints on usability testing", "Obstacles of natural language"],
  	correctAnswer: 3 
  }, {
  	question: "The following are _________________: Easy and inexpesive to make, flexible enough to be constantly changed and rearranged, complete enough to yield useful feedback about specific design questions.",
  	choices: ["Interface design standard tools", "Main criteria for lo-fi prototype", "Main criteria for hi-fi prototype", "Main criteria for conceptual design"],
  	correctAnswer: 2    	
  }, {
  	question: "The following are disadvantages of ___________: Rapid and inflexible navigation, inefficient for large menu navigation, infficient use of screen real estate, slow for experts",
  	choices: ["Natural Language", "Question and Answer", "Menu-based interface", "Direct Manipulation"],
  	correctAnswer: 3 
  }, {
  	question: "Gulfs of ______ relate to the effectiveness principle",
  	choices: ["Evaluation", "Execution", "Natural Language", "Examination"],
  	correctAnswer: 2
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  var questions;
  $('#next').hide();
  //displayNext(); hides initial quiz
  $('#choose').hide();
  var username = "";
  
  $('#set1').on('click', function (e){
    e.preventDefault()
    questions = data1;
    questionCounter = 0;
    selections = [];
    $('#start').hide();
    $('#next').show();
    $('#choose').hide();
    $('#game').show();
    displayNext();
  });
  
  $('#set2').on('click', function (e){
    e.preventDefault()
    questions = data2;
    questionCounter = 0;
    selections = [];
    $('#start').hide();
    $('#next').show();
    $('#choose').hide();
    $('#game').show();
    displayNext();
  });
  
  $('#set3').on('click', function (e){
    e.preventDefault()
    questions = data3;
    questionCounter = 0;
    selections = [];
    $('#start').hide();
    $('#next').show();
    $('#choose').hide();
    $('#game').show();
    displayNext();
  });
  
  $('#submit').on('click', function (e){
    e.preventDefault()
    if($('#name').val() != ""){
      $('#choose').show();
      username = $('#name').val();
      $('#getinfo').hide();
    }
  });
  
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
    $('#choose').show();
    $('#game').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          $('#next').show();
          $('#prev').hide();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();

