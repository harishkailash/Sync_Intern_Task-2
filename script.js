const questions = [
  {
    question:"How many times has India won the Cricket World Cup?",
    answers:[
      {text:"2",correct:"true"},
      {text:"3",correct:"false"},
      {text:"4",correct:"false"},
      {text:"1",correct:"false"},
    ]
  },
  {
    question:"Which Indian cricketer is also known as the “God of Cricket”?",
    answers:[
      {text:"MS Dhoni",correct:"false"},
      {text:"Yuvraj Singh",correct:"false"},
      {text:"Virat Kohli",correct:"false"},
      {text:"Sachin Tendulkar",correct:"true"},
    ]
  },
  {
    question:"What is the moniker given to the Indian cricket team? ",
    answers:[
      {text:"Men in Blue",correct:"true"},
      {text:"The Team of Lions",correct:"false"},
      {text:"The Indian Army",correct:"false"},
      {text:"None of the above",correct:"false"},
    ]
  },
  {
    question:"Who was the first Indian batsman to hit a century in a Test match?",
    answers:[
      {text:"Lala Amarnath Bharadwaj",correct:"true"},
      {text:"Kapil Dev",correct:"false"},
      {text:"Sunil Gavaskar",correct:"false"},
      {text:"Vijay Hazare ",correct:"false"},
    ]
  },
  {
    question:"When did India play its first Test match?",
    answers:[
      {text:"1931",correct:"true"},
      {text:"1930",correct:"false"},
      {text:"1932",correct:"false"},
      {text:"1929",correct:"false"},
    ]
  },
]

const questionElement =document.getElementById("Questions");
const answerButton =document.getElementById("answer-buttons");
const nextButton =document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score=0;
  nextButton.innerHTML="Next";
  showQuestion();
}

function showQuestion()
{
  resetState();
  let currentQuestion=questions[currentQuestionIndex];
  let questionNO=currentQuestionIndex+1;
  questionElement.innerHTML=questionNO+". "+currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button=document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);  
    if(answer.correct){
      button.dataset.correct=answer.correct
    }  
    button.addEventListener("click",selectAnswer)
  });
}
function resetState(){
  nextButton.style.display="none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }

}
function selectAnswer(e){
  const selectedBtn=e.target;
  const isCorrect = selectedBtn.dataset.correct ==="true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button=>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct")
    }
    button.disabled=true;
  });
  nextButton.style.display="block";

};
function showScore(){
  resetState();

  questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`
    let result="none"
    const clickhere=document.getElementById("click_here");
    const clickheres=document.getElementById("click_heres");
    if(score>2){
      result="winner"
      clickhere.style.display="block"
    }else{
      result="looser"
      clickheres.style.display="block"
    }


  nextButton.innerHTML="Play Again";
  nextButton.style.display="block";
  nextButton.addEventListener("click",()=>{
    clickhere.style.display="none"
    clickheres.style.display="none"
  })
};
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length){
    showQuestion();
  }else{
    showScore();
  }
};

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex<questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})

startQuiz(); 