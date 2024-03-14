const questions = [
    {
        question: "Which planet in our solar system is the largest?",
        answers: [
            { text: "Venus", correct: false},
            { text: "Jupiter", correct: true},
            { text: "Neptune", correct: false},
            { text: "Mars", correct: false},
        ]
    },
    {
        question: "What type of celestial object is the famous Hubble Space Telescope designed to observe?",
        answers: [
            { text: "Comets", correct: false},
            { text: "Asteroids", correct: false},
            { text: "Stars", correct: false},
            { text: "Galaxies", correct: true},
        ]
    },
    {
        question: "What is the name of the nearest star to our solar system?",
        answers: [
            { text: "Andromeda", correct: false},
            { text: "Sirius", correct: false},
            { text: "Betelgeuse", correct: false},
            { text: "Alpha Centauri", correct: true},
        ]
    },
    {
        question: "Which planet in our solar system is the largest?",
        answers: [
            { text: "Venus", correct: false},
            { text: "Jupiter", correct: true},
            { text: "Neptune", correct: false},
            { text: "Mars", correct: false},
        ]
    },
    {
        question: "What is the name of the first artificial satellite launched into space?",
        answers: [
            { text: "Explorer 1", correct: false},
            { text: "Sputnik 1", correct: true},
            { text: "Vanguard 1", correct: false},
            { text: "Telstar 1", correct: false},
        ]
    },
    {
        question: "What is the name of the largest moon in our solar system?",
        answers: [
            { text: "Titan", correct: false},
            { text: "Europa", correct: false},
            { text: "Ganymede", correct: true},
            { text: "Callisto", correct: false},
        ]
    },
    {
        question: "Which space mission put the first humans on the Moon?",
        answers: [
            { text: "Apollo 8", correct: false},
            { text: "Apollo 11", correct: true},
            { text: "Apollo 13", correct: false},
            { text: "Apollo 17", correct: false},
        ]
    },
    {
        question: "What is the name of the phenomenon where a star explodes and becomes incredibly bright for a short period of time?",
        answers: [
            { text: "Nova", correct: false},
            { text: "Black hole", correct: false},
            { text: "Supernova", correct: true},
            { text: "Quasar", correct: false},
        ]
    },
    {
        question: "What is the name of the imaginary line that runs through the Earth's poles and around which the Earth rotates?",
        answers: [
            { text: "Equator", correct: false},
            { text: "Tropic of Cancer", correct: false},
            { text: "Tropic of Capricorn", correct: false},
            { text: "Prime Meridian", correct:true},
        ]
    },
    {
        question: "What is the name of the theory that explains the origin and evolution of the universe?",
        answers: [
            { text: "The Big Bang Theory", correct: true},
            { text: "The Steady State Theory", correct: false},
            { text: "The Ptolemaic Model", correct: false},
            { text: "The Copernican Model", correct: false},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const starts = document.querySelector(".botton1");
const quizbox = document.querySelector(".app");
const timecount = document.querySelector("#timer");
const showQuestionNO = document.querySelector("#status");
//const totaltime = document.querySelector("");

starts.onclick =function(){
    time_countdown();
    starts.classList.add("show1")
    quizbox.classList.add("show")
}

let currentQuestionIndex = 0;
let score = 0;
let index = 0;
let timer = 0;
let interval =0; 
let totalcount =0;
let countSecond = 0;
let intervalId;

//what happen when Start Quiz button clicked
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    startTimer();
    showQuestions();
}

function showQuestions(){
    resetState();
    document.getElementById("Question_No").innerHTML=currentQuestionIndex+1;
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo +". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button); 
        if(answer.correct){
            button.dataset.correct = answer.correct; 
        } 
        button.addEventListener("click",selectAnswer);
    });
    timer=0;
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
let total=0;
let text1 =0;
let incorrect_qno=0;
function showScore(){
    resetState();
    stopTimer();
    timecount.classList.add("hide");
    showQuestionNO.classList.add("off");
    questionElement.innerHTML= 'You scored '+score+' out of 10<br><br>';
    total=score*10;
    questionElement.innerHTML+=" <p>Congratulations, AstroTrivia Quiz Completed!</p><br>";
    questionElement.innerHTML+="Grade : "+total+"%<br><br>";
    incorrect_qno=(10-score);
    questionElement.innerHTML+=" wrong Answers : "+incorrect_qno+"<br><br>";
    if(score<5){
        questionElement.innerHTML+="you are bad<br>";
    }else if(score<8){
        questionElement.innerHTML+="you are not bad<br>";
    }else{
        questionElement.innerHTML+="you are very good<br>";
    }
    questionElement.innerHTML+="Time taken : "+totalcount+"S";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    stopCountdown();
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        stopCountdown();
        time_countdown();
        showQuestions();
        
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex <= questions.length){
        handleNextButton();
    }else{
        timecount.classList.remove("hide");
        stopCountdown();
        time_countdown();
        location.reload();
        startQuiz();
    }
})

let countdown = ()=>{
    if(timer===60){  
        clearInterval(interval);
    }else{
        timer++;
        console.log(timer);
    }
}
startQuiz();

function time_countdown() {
    let timeLeft = 20;
    const countdown = document.getElementById("time");
  
    function updateCountdown() {
      timeLeft--;
      countdown.innerHTML = timeLeft;
      if (timeLeft === 0) {
        stopCountdown();
        handleNextButton();
      }
    }
  
    counter = setInterval(updateCountdown, 1000);
  }
  function stopCountdown() {
    clearInterval(counter);
  }

    

    function startTimer() {
      intervalId = setInterval(function() {
        countSecond++;
        totalcount+=1;
      }, 1000);
    }

    function stopTimer() {
      clearInterval(intervalId);
    }