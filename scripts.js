// script.js
const questions = [
    {
        question: "How many teeth does an adult human have?",
        options: ["28", "32", "30", "26"],
        answer: "32"
    },
    {
        question: "How many bones are there in the adult human body?",
        options: ["206", "256", "232", "216"],
        answer: "206"
    },
    {
        question: "What is a baby Pig called?",
        options: ["Puppy", "Piglet", "Kid", "Kitten"],
        answer: "Piglet"
    },
    {
        question: "What is a baby Cat called?",
        options: ["Puppy", "Piglet", "Kid", "Kitten"],
        answer: "Kitten"
    },
    {
        question: "What is a baby Dog called?",
        options: ["Puppy", "Piglet", "Kid", "Kitten"],
        answer: "Puppy"
    },
    {
        question: "What is 5 - 2 + (10 ÷ 2)?",
        options: ["2", "8", "6", "5"],
        answer: "8"
    },
    {
        question: "What is 10 + 2 - (3 x 2)?",
        options: ["2", "8", "6", "5"],
        answer: "6"
    },
    {
        question: "Who is the president of Nigeria?",
        options: ["Bola Tinubu", "Joe Biden", "Nana Akufo-Addo", "Paul Biya"],
        answer: "Bola Tinubu"
    },
    {
        question: "What is the capital city of Nigeria?",
        options: ["Lagos", "Abuja", "Anambra", "Kaduna"],
        answer: "Abuja"
    },
    {
        question: "Which of this is a primary color?",
        options: ["Purple", "Orange", "Black", "Blue"],
        answer: "Blue"
    }
];
const header = document.querySelector('.header')
const quizQuestion = document.querySelector('.question');
const answerButtons = document.querySelectorAll('.btn');
const nextButton = document.querySelector('.next-btn');
const questionIndicator = document.querySelector('.question-indicator')
const currentQuestionSpan = document.querySelector('.current-question');
const totalQuestionsSpan = document.querySelector('.total-questions');
const restartButton = document.getElementById('restart');
const totalScoreButton = document.getElementById('total-score');
const finalScore = document.getElementById('final-score');
const resultText = document.querySelector('.result');

let currentQuestionIndex = 0;
let correctCount = 0;

totalQuestionsSpan.textContent = questions.length;

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    quizQuestion.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    currentQuestion.options.forEach((option, i) => {
    answerButtons[i].textContent = option;
    answerButtons[i].classList.remove('correct', 'incorrect');
    answerButtons[i].disabled = false;
    });
    nextButton.style.display = 'none';
    resultText.classList.add('hidden');
    finalScore.classList.add('hidden');
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
}

answerButtons.forEach(button => {
    button.addEventListener('click', (choose) => {
        const selectedAnswer = choose.target.textContent;
        const correctAnswer = questions[currentQuestionIndex].answer;
        if (selectedAnswer === correctAnswer) {
            choose.target.classList.add('correct');
            resultText.textContent = 'Correct!';
            correctCount++;
        } else {
            choose.target.classList.add('incorrect');
            resultText.textContent = `Incorrect!. The correct answer is ${correctAnswer}`;
        }
        resultText.classList.remove('hidden');
        answerButtons.forEach(btn => btn.disabled = true);
        nextButton.style.display = 'block';
    });
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
});

restartButton.addEventListener('click', () => {
    if (currentQuestionIndex === questions.length) {
        currentQuestionIndex = 0;
        correctCount = 0;
        showQuestion();
        answerButtons.forEach(button => button.style.display = 'block');
        restartButton.classList.add('disabled');
        restartButton.disabled = true;
    }
});

totalScoreButton.addEventListener('click', () => {
    finalScore.textContent = `Total Score: ${correctCount} / ${questions.length}`;
    finalScore.classList.remove('hidden');
});

function showFinalScore() {
    header.textContent = '';
    quizQuestion.textContent = 'Quiz Completed!';
    questionIndicator.textContent = '';
    answerButtons.forEach(button => button.style.display = 'none');
    resultText.textContent = '';
    nextButton.style.display = 'none';
    finalScore.textContent = `Total Score: ${correctCount} out of ${questions.length}`;
    finalScore.classList.remove('hidden');
    restartButton.classList.remove('disabled');
    restartButton.disabled = false;
}

showQuestion();
