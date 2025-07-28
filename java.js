let quizCatagory = "HTML";

// fetch a random question from based on selected catagory
const getRandomQuestion = () => {
    const catagoryQuestions = questions.find(cat => cat.catagory.toLowerCase() === 
    quizCatagory.toLowerCase()).questions || [];

    const randomQuestion = catagoryQuestions[Math.floor(Math.random() * catagoryQuestions.length)];

   return randomQuestion;
}

const renderQuestion = () => {

const currentQuestion = getRandomQuestion();
if(!currentQuestion) return;

document.querySelector(".questionText").textContent = currentQuestion.question;
}
renderQuestion();
