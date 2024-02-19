const questions = [
  {
    question: "Which is the largest planet in our solar system?",
    answers: [
      {text: "Earth", correct: false},
      {text: "Jupiter", correct: true},
      {text: "Saturn", correct: false},
      {text: "Mars", correct: false}
    ]
  },
  {
    question: "What is the capital city of France?",
    answers: [
      {text: "Berlin", correct: false},
      {text: "Madrid", correct: false},
      {text: "Paris", correct: true},
      {text: "Rome", correct: false}
    ]
  },
  {
    question: "In which year did the Titanic sink?",
    answers: [
      {text: "1912", correct: true},
      {text: "1905", correct: false},
      {text: "1920", correct: false},
      {text: "1935", correct: false}
    ]
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      {text: "Beijing", correct: false},
      {text: "Seoul", correct: false},
      {text: "Tokyo", correct: true},
      {text: "Bangkok", correct: false}
    ]
  }
];

let questionElement = document.getElementById("questions");
let answerButton = document.getElementById("ans-btn");
let nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next"
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    let button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", (e)=> {
      if(e.target.dataset.correct === "true"){
        button.classList.add("correct");
        score++;
      }
      else{
        button.classList.add("incorrect");
      }
      Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
          button.classList.add("correct");
        }
        button.disabled = true;
      })
      nextButton.style.display = "block";
    })
  });
}

function resetState() {
  nextButton.style.display = "none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild)
  }
}
function showScore(){
  resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
      showQuestion();
    }
    else{
      showScore();
    }
}

nextButton.addEventListener("click", (e) =>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }
  else{
    showQuestion();
  }
})
startQuiz();