const answerOptions = document.querySelector(".answerOptions") 
const nextQuestionBtn = document.querySelector(".nextQuestionBtn");
const questionStatus = document.querySelector(".questionStatus");

let quizCatagory = "HTML";
let currentQuestion = null;
let questionIndexHistory = [];

// fetch a random question from based on selected catagory
const getRandomQuestion = () => {
    const catagoryQuestions = questions.find(cat => cat.catagory.toLowerCase() === 
    quizCatagory.toLowerCase()).questions || [];

    // Filter out asked question and choose a random one.
    const availableQuestion = catagoryQuestions.filter((_,index) => !questionIndexHistory.includes(index));

    const randomQuestion = availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
    questionIndexHistory.push(catagoryQuestions.indexOf(randomQuestion));
   return randomQuestion;
}
// High Light the correct answer option
const highlightCorrectAnswer = () => {
    const correctOption = answerOptions.querySelectorAll(".answerOption")[currentQuestion.correctAnwer];
    correctOption.classList.add("correct");
    const iconHTML = `<span class="material-symbols-rounded">check_circle</span>`;
    correctOption.insertAdjacentHTML("beforeend",iconHTML);
}
// Handle the user's answer option
const handleAnswer = (option,answerIndex) => {
  const isCorrect = currentQuestion.correctAnwer === answerIndex;
  option.classList.add(isCorrect ? "correct" : "incorrect") ;

  !isCorrect ? highlightCorrectAnswer() : "";

//   insert icon based on correctness
const iconHTML = `<span class="material-symbols-rounded">${isCorrect ? "check_circle" : "cancel"}</span>`
option.insertAdjacentHTML("beforeend",iconHTML)

//   Disable all answer after one answer selected
answerOptions.querySelectorAll(".answerOption").forEach(option => option.style.pointerEvents = "none");

nextQuestionBtn.style.visibility = "visible";

}

// Render the current question and its options in the quiz
const renderQuestion = () => {

 currentQuestion = getRandomQuestion();
if(!currentQuestion) return;
console.log(currentQuestion);

// Update UI
answerOptions.innerHTML = "";
nextQuestionBtn.style.visibility = "hidden";

document.querySelector(".questionText").textContent = currentQuestion.question;

// Create Option <li> element, append them and add click event listener
currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.classList.add("answerOption");
    li.textContent = option;
    answerOptions.appendChild(li); 
    li.addEventListener("click", () => handleAnswer(li, index));
});
}
renderQuestion();

nextQuestionBtn.addEventListener("click", renderQuestion);
