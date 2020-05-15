
//add timer 
function setTime() {
    var timeLeft = 60;
    var timerInterval = setInterval(function () {
        timeLeft--;
        $time.textContent = "Time:" + timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 1000);
}
function sendMessage() {
    $time.textContent = "Game Over";
}

var $time = document.querySelector("#time");
var initials = "user initials";
var score = "user scores";
var userAnswer = "user input";
var timeUp = "game over";


var startClick = document.querySelector("#btnStarter");
startClick.addEventListener("click", function () {
    setTime();
    startClick.style.display = "none";
});


$(document).ready(function () {

    $("#quiz").hide();
    $("#enterInitial").hide();
    $("#initial").hide();
    $("#submit").hide();


});

//Question Set
var questions = [
    new Question("Commonly used datatypes <strong>DO NOT</strong> include ____________ .", ["1. strings", "2. booleans", "3. alerts", "4. numbers"], "3. alerts"),
    new Question("The condition in an if/else statement is inclosed within ____________ .", ["quotes", "curly brackets", "parentheses", "square brackets"], "curly brackets"),
    new Question("Arrays in JavaScript can be used to store ___________ .", ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"], "4. all of the above"),
    new Question("String values must be enclosed within ______________ when being assigned to variables. ", ["1. commas", "2. curly brackets", "3. parentheses", "4. quotes"], "3. parentheses"),
    new Question("A very useful tool during devlopment and debugging for printing contnent to the debugger is: ", ["1. JavaScript", "2. terminal / bash", "3. for loops", "4. console.log"], "4. console.log"),


];

//Variable for questions
var quiz = new Quiz(questions);


//Question Totolizer
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;

}

//click function to hide the screen at startup
function startQuiz() {

    $("#startDiv").hide();
    $("#welcomeDiv").hide();
    $("#quiz").show();
}


//show form to enter initials
function populate() {
    console.log(quiz.isEnded());
    if (quiz.isEnded()) {
        $("#enterInitial").show();
        $("#initial").show();
        $("#submit").show();



    }
    else {
        //  show question 
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show choices
        var choices = quiz.getQuestionIndex().choices;
        var i = 0
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};





Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];

}

Quiz.prototype.isEnded = function () {
    return this.questions.length === this.questionIndex;
}


Quiz.prototype.guess = function (answer) {


    if (this.getQuestionIndex().correctAnswer(answer)) {
        this.score += 5;
    }

    if (this.getQuestionIndex().correctAnswer(answer)) {
        var element = document.getElementById('result');
        element.innerHTML = "Correct!";

    } else {

        var element = document.getElementById('result');
        element.innerHTML = "Wrong!";


    }


    this.questionIndex++;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;

}

Question.prototype.correctAnswer = function (choice) {
    return choice === this.answer;
}



function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById('progress');
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;

}

function addInitial() {

    var element = $("#initial").val();
    console.log(element)
    return element;

}

function showScores(initials) {
    var initials = addInitial();
    var gameOverHtml = "<h1>Result</h1>";
    gameOverHtml += "<h2 id='score'> All Done! Your final score is: " + initials + " " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;

}



populate();