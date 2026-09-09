let questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which language is used to style a web page?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        correctAnswer: 1
    },
    {
        question: "Which language is used to add interactivity to a website?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Bootstrap"
        ],
        correctAnswer: 2
    },
    {
        question: "Which HTML tag is used to create a paragraph?",
        options: [
            "<p>",
            "<h1>",
            "<div>",
            "<br>"
        ],
        correctAnswer: 0
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [
            ".",
            "#",
            "*",
            "@"
        ],
        correctAnswer: 1
    },
    {
        question: "Which method is used to select an element by ID?",
        options: [
            "getElementById()",
            "querySelectorAll()",
            "getElementsByClassName()",
            "getElement()"
        ],
        correctAnswer: 0
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "variable",
            "var",
            "declare",
            "letvalue"
        ],
        correctAnswer: 1
    },
    {
        question: "Which method adds a new element at the end of an array?",
        options: [
            "pop()",
            "shift()",
            "push()",
            "add()"
        ],
        correctAnswer: 2
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Model",
            "Document Order Method",
            "Digital Object Management"
        ],
        correctAnswer: 0
    },
    {
        question: "Which Bootstrap class creates a primary button?",
        options: [
            "button-primary",
            "btn-main",
            "btn-primary",
            "primary-btn"
        ],
        correctAnswer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let userAnswers = [];
let timer;
let timeLeft = 30;

let questionNumber = document.getElementById("questionNumber");
let scoreText = document.getElementById("score");
let timerText = document.getElementById("timer");
let progressBar = document.getElementById("progressBar");
let questionText = document.getElementById("question");
let options = document.getElementById("options");

let previousBtn = document.getElementById("previousBtn");
let submitBtn = document.getElementById("submitBtn");
let nextBtn = document.getElementById("nextBtn");
let restartBtn = document.getElementById("restartBtn");

let message = document.getElementById("message");


function loadQuestion() {

    clearInterval(timer);

    let question = questions[currentQuestion];

    questionNumber.textContent =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    scoreText.textContent = "Score: " + score;

    questionText.textContent = question.question;

    let progress = ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";

    options.innerHTML = "";

    selectedAnswer = userAnswers[currentQuestion] ?? null;

    question.options.forEach(function(option, index) {

    let button = document.createElement("button");

    button.type = "button";
    button.className = "option-btn";

    let letter = document.createElement("span");

    letter.className = "option-letter";

    letter.textContent = String.fromCharCode(65 + index);

    button.appendChild(letter);

    let optionText = document.createTextNode(option);

    button.appendChild(optionText);

    button.addEventListener("click", function() {
        selectAnswer(index);
    });

    options.appendChild(button);
});

    if (selectedAnswer !== null) {
        showSelectedAnswer();
    }

    previousBtn.disabled = currentQuestion === 0;

    nextBtn.disabled = selectedAnswer === null;

    submitBtn.disabled = selectedAnswer === null;

    message.classList.add("d-none");

    startTimer();
}


function selectAnswer(index) {

    selectedAnswer = index;

    userAnswers[currentQuestion] = index;

    let buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(function(button) {
        button.classList.remove("selected");
    });

    buttons[index].classList.add("selected");

    submitBtn.disabled = false;

    nextBtn.disabled = false;
}


function showSelectedAnswer() {

    let buttons = document.querySelectorAll(".option-btn");

    buttons[selectedAnswer].classList.add("selected");
}


function submitAnswer() {

    if (selectedAnswer === null) {
        return;
    }

    let question = questions[currentQuestion];

    let buttons = document.querySelectorAll(".option-btn");

    buttons.forEach(function(button, index) {

        button.disabled = true;

        if (index === question.correctAnswer) {
            button.classList.add("correct");
        }

        if (index === selectedAnswer &&
            selectedAnswer !== question.correctAnswer) {

            button.classList.add("incorrect");
        }

    });

    if (selectedAnswer === question.correctAnswer) {

        score++;

        scoreText.textContent = "Score: " + score;

        message.textContent = "Correct answer! 🎉";

        message.className = "alert alert-success mt-3";

    } else {

        message.textContent = "Incorrect answer.";

        message.className = "alert alert-danger mt-3";
    }

    submitBtn.disabled = true;

    clearInterval(timer);
}


function nextQuestion() {

    if (selectedAnswer === null) {
        return;
    }

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        showResult();
    }
}


function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();
    }
}


function startTimer() {

    timeLeft = 30;

    updateTimer();

    timer = setInterval(function() {

        timeLeft--;

        updateTimer();

        if (timeLeft === 0) {

            clearInterval(timer);

            nextQuestion();
        }

    }, 1000);
}


function updateTimer() {

    let seconds = timeLeft < 10 ? "0" + timeLeft : timeLeft;

    timerText.textContent = "00:" + seconds;
}


function showResult() {

    clearInterval(timer);

    let correct = score;

    let incorrect = questions.length - score;

    let percentage =
        Math.round((score / questions.length) * 100);

    document.getElementById("finalScore").textContent =
        score + " / " + questions.length;

    document.getElementById("correctAnswers").textContent =
        correct;

    document.getElementById("incorrectAnswers").textContent =
        incorrect;

    document.getElementById("percentage").textContent =
        percentage + "%";

    document.getElementById("totalQuestions").textContent =
        questions.length;


    let performanceMessage =
        document.getElementById("performanceMessage");

    if (percentage >= 80) {

        performanceMessage.textContent =
            "Excellent work! You really know your stuff. 🚀";

    } else if (percentage >= 60) {

        performanceMessage.textContent =
            "Great job! Keep practicing. 👍";

    } else if (percentage >= 40) {

        performanceMessage.textContent =
            "Good attempt! A little more practice will help.";

    } else {

        performanceMessage.textContent =
            "Keep learning and try the quiz again! 💪";
    }


    let resultModal =
        new bootstrap.Modal(document.getElementById("resultModal"));

    resultModal.show();
}


function restartQuiz() {

    clearInterval(timer);

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    userAnswers = [];

    loadQuestion();
}


submitBtn.addEventListener("click", function() {
    submitAnswer();
});

nextBtn.addEventListener("click", function() {
    nextQuestion();
});

previousBtn.addEventListener("click", function() {
    previousQuestion();
});

restartBtn.addEventListener("click", function() {
    restartQuiz();
});


loadQuestion();
