//ⓜⓘⓔⓩⓔ
const questions = [
    {
        question: "Qual é a capital do Brasil?",
        options: [" São Paulo", "B. Rio de Janeiro", "C. Brasília", "D. Belo Horizonte"],
        answer: "C"
    },
    {
        question: "Quem escreveu 'Dom Quixote'?",
        options: ["A. William Shakespeare", "B. Miguel de Cervantes", "C. Charles Dickens", "D. Jane Austen"],
        answer: "B"
    },
    {
        question: "Quem é o criador deste jogo?",
        options: ["A. Mieze Eduardo", "B. Miguel de Cervantes", "C. Mieze Mpata", "D. Jane Austen"],
        answer: "C"
    },
    {
        question: "Onde se situa a floresta do Maiombe?",
        options: ["A. Huila", "B. Malanje", "C. Zaire", "D. Cabinda"],
        answer: "A"
    },
    {
        question: "Mais de 50% da população angolana é:",
        options: ["A. Protestante", "B. Testemunhas de Jeová", "C. Ateu", "D. Catálicos"],
        answer: "D"
    },
    {
        question: "Quem foi o terceiro presidente de Angola?",
        options: ["A. Jonas Savimbi", "B. João Lourenço", "C. Agustinho Neto", "D. Jose E. dos Santos"],
        answer: "B"
    },
    {
        question: "Quem é o criador deste jogo?",
        options: ["A. Mieze Eduardo", "B. Miguel de Cervantes", "C. Mieze Mpata", "D. Jane Austen"],
        answer: "C"
    },
];

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');

    questionElement.innerHTML = `
        <h2>${currentQuestionIndex + 1}ª Pergunta:</h2>
        <p>${currentQuestion.question}</p>
    `;

    optionsElement.innerHTML = currentQuestion.options.map((option, index) => `
        <button data-option="${String.fromCharCode(65 + index)}" onclick="checkAnswer('${String.fromCharCode(65 + index)}')">${option}</button>
    `).join('');
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedButton = document.querySelector(`button[data-option="${selectedOption}"]`);
    const correctButton = document.querySelector(`button[data-option="${currentQuestion.answer}"]`);
    const feedbackElement = document.getElementById('feedback');

    if (selectedOption === currentQuestion.answer) {
        score += 100; 
        alert("Resposta Certa!!");
    } else {
        
        selectedButton.style.backgroundColor = '#f44336';
       
        correctButton.style.backgroundColor = '#00ff4c';
        
        feedbackElement.innerHTML = `
            <p style="color: #f44336; font-weight: bold; margin-top: 10px; text-align: center;">Resposta Errada!</p>
            <button onclick="restartGame()">Reiniciar Jogo</button>
        `;
        
        document.querySelectorAll('.options button').forEach(button => {
            button.disabled = true;
        });
        
        return;
    }

    currentQuestionIndex++;

    document.getElementById('score').textContent = score;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {

        feedbackElement.innerHTML = `
            <p style="color: #4caf50; font-weight: bold; margin-top: 10px;">Parabéns! Você completou o jogo com ${score} pontos.</p>
            <button onclick="restartGame()">Reiniciar Jogo</button>
        `;
    }
}

function restartGame() {
    location.reload(); 
}

function startGame() {

    currentQuestionIndex = 0;
    score = 0;

    displayQuestion();
}

window.onload = startGame;

let skipUsed = false;

function skipQuestion() {
    if (currentQuestionIndex < questions.length - 1 && !document.querySelector('.options button[disabled]')) {
        currentQuestionIndex++;
        displayQuestion(); 

        document.querySelector('.lifelines button:nth-child(1)').disabled = true;
    }
}


let timer;

function startTimer() {
    let timeLeft = 10;
    const timerElement = document.getElementById('timer');

    timerElement.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        
        if (timeLeft === 0) {
            clearInterval(timer); 
            checkAnswer(''); 
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer); 
    startTimer();
}

