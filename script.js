const qnaBuffer = [
  {
    question: "What is the capital of Australia?",
    answer: "Canberra",
    givenAnswer: ""
  },
  {
    question: "What is the largest mammal?",
    answer: "Blue Whale",
    givenAnswer: ""
  },
];

const indexTracker = {
  questionIndex: 0,
  correctAnswerCount: 0
};

function loadNewQuestion() {
  const questionElement = document.getElementById("question");
  const question = qnaBuffer[indexTracker.questionIndex].question;
  
  questionElement.textContent = question;

  const qnaGroupElement = document.getElementById("qna");
  if (!qnaGroupElement.classList.contains("qna-group-visible"))
      qnaGroupElement.classList.add("qna-group-visible");
  if (qnaGroupElement.classList.contains("qna-group-hidden"))
      qnaGroupElement.classList.remove("qna-group-hidden");

  const resultGroupElement = document.getElementById("results");

  if (!resultGroupElement.classList.contains("results-group-hidden"))
        resultGroupElement.classList.add("results-group-hidden");
  if (resultGroupElement.classList.contains("results-group-visible")) 
      resultGroupElement.classList.remove("results-group-visible");

  const answerElement = document.getElementById("answer");
  answerElement.value = "";
}

function submitAnswer() {
  const answerElement = document.getElementById("answer");
  const answer = answerElement.value;

  qnaBuffer[indexTracker.questionIndex].givenAnswer = answer;
  // Correct Answer
  if (answer.toLowerCase() === qnaBuffer[indexTracker.questionIndex].answer.toLowerCase()) 
    ++indexTracker.correctAnswerCount;
  // Incorrect Answer - Do Nothing.

  // Move to next question.
  if (indexTracker.questionIndex < qnaBuffer.length - 1) {
    ++indexTracker.questionIndex;
    
    loadNewQuestion();
  }
  // Quiz is complete -> Print Result;
  else {
    const resultElement = document.getElementById("result");
    
    let result = "Results Tally:\n\n";

    for (let i = 0; i < qnaBuffer.length; ++i) {
      result += qnaBuffer[i].question + "\n";
      result += qnaBuffer[i].givenAnswer + " - " + 
        ((qnaBuffer[i].givenAnswer.toLowerCase() === qnaBuffer[i].answer.toLowerCase())? "✅" : "❌");

      if (i < qnaBuffer.length - 1)
        result += "\n\n";
    }
    
    result += `\n\nYour score is ${indexTracker.correctAnswerCount}/${qnaBuffer.length}.`;
    resultElement.textContent = result;
    
    const qnaGroupElement = document.getElementById("qna");
    if (qnaGroupElement.classList.contains("qna-group-visible"))
        qnaGroupElement.classList.remove("qna-group-visible");
    if (!qnaGroupElement.classList.contains("qna-group-hidden"))
        qnaGroupElement.classList.add("qna-group-hidden");
    
    const resultGroupElement = document.getElementById("results");
    
    if (resultGroupElement.classList.contains("results-group-hidden"))
          resultGroupElement.classList.remove("results-group-hidden");
    if (!resultGroupElement.classList.contains("results-group-visible")) 
        resultGroupElement.classList.add("results-group-visible");
  }
}

function retry() {
  indexTracker.questionIndex = 0;
  indexTracker.correctAnswerCount = 0;

  loadNewQuestion();
}