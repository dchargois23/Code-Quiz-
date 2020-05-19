//variables for the 
var landText = document.getElementById("landingText");
var showQuestons = document.getElementById("quiz");
var startQuizBtn = document.getElementById("startQuizBtn");
var submitBtn = document.getElementById("submitBtn");
var submitScoreEl = document.getElementById("submitScore");
var userScoreEl = document.getElementById("userScore");
var userNameInput;
var questionHeader = document.getElementById("titleQuestion");
var answerChoices = document.getElementById("answers");
var questionNumber = -1;
var secondsLeft = 60 + 1;
var answer;
var timeEl = document.querySelector("timer");

//Create questions
var questions = [
    {

        title: "Commonly used datatypes DO NOT include ____________ .",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",

    },
    {
        title: "The condition in an if/else statement is inclosed within ____________ .",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "2. curly brackets",

    },

    {
        title: "Arrays in JavaScript can be used to store ___________ .",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above",

    },

    {
        title: "String values must be enclosed within ______________ when being assigned to variables. ",
        choices: ["1. commas", "2. curly brackets", "3. parentheses", "4. quotes"],
        answer: "3. parentheses",

    },

    {
        title: "A very useful tool during devlopment and debugging for printing contnent to the debugger is: ",
        choices: ["1. JavaScript", "2. terminal / bash", "3. for loops", "4. console.log"],
        answer: "4. console.log",

    },

];
//Create funstions to be acivated once quiz has started
function startQuiz() {
    landText.classList.add("d-none");
    showQuestons.classList.remove("d-none");
    setTime();
    makeQuestions();
}
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time:" + secondsLeft;
        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(timerInterval);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}
function makeQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answer;
    questionHeader.textContent = questions[questionNumber].title;
    answerChoices.innerHTML = "";
    var choices = questions[questionNumber].choices;
    for (var i = 0; i < choices.length; i++) {
        var nextChoice = document.createElement("button");
        nextChoice.textContent = choices[i];
        answerBtn = answerChoices
            .appendChild(nextChoice)
            .setAttribute("class", "btn btn-primary btn-block");
    }
}
function displayScore() {
    document.getElementById("quiz").classList.add("d-none");
    document.getElementById("submitScore").classList.remove("d-none");
    userScoreEl.textContent = "Your final score is " + secondsLeft + ".";
}
startQuizBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    window.location.href = "./highscores.html";
});
function addScore() {
    userNameInput = document.getElementById("userName").value;
    var newScore = {
        name: userNameInput,
        score: secondsLeft,
    };
    var highScores = JSON.parse(localStorage.getItem("highSchores") || "[]");
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
function hideFeedback() {
    var pEl = document.getElementsByClassName("accuracy")[0];
    pEl.style.display = "none";
}
function showFeedback() {
    var pEl = document.getElementsByClassName("accuracy")[0];
    pEl.removeAttribute("style");
}
answerChoices.addEventListener("click", function (event) {
    var pEl = document.getElementsByClassName("accuracy")[0];
    if (answer === event.target.textContent) {
        pEl.innerHTML = "Correct!";
        setTimeout(hideFeedback, 1000);
        showFeedback();
    } else {
        pEl.innerHTML = "Sorry, that's incorrect.";
        setTimeout(hideFeedback, 1000);
        secondsLeft = secondsLeft - 10;
        showFeedback();
    }
    makeQuestions();
});