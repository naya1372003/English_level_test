const questions = [
    {
        question: "Choose the correct sentence:",
        answers: [
            { text: "She go to school everyday.", correct: false },
            { text: "She goes to school every day.", correct: true },
            { text: "She going to school every day.", correct: false },
            { text: "She gone to school every day.", correct: false }
        ]
    },
    {
        question: "If I ___ rich, I would travel the world.",
        answers: [
            { text: "am", correct: false },
            { text: "was", correct: false },
            { text: "were", correct: true },
            { text: "be", correct: false }
        ]
    },
    {
        question: "What is the past tense of 'Buy'?",
        answers: [
            { text: "Buyed", correct: false },
            { text: "Bought", correct: true },
            { text: "Buying", correct: false },
            { text: "Buys", correct: false }
        ]
    },
    {
        question: "By the time we arrived, the movie ___.",
        answers: [
            { text: "already started", correct: false },
            { text: "had already started", correct: true },
            { text: "has already started", correct: false },
            { text: "was already starting", correct: false }
        ]
    },
    {
        question: "What does 'Reliable' mean?",
        answers: [
            { text: "Someone you can trust", correct: true },
            { text: "Someone who is lazy", correct: false },
            { text: "A type of food", correct: false },
            { text: "To run fast", correct: false }
        ]
    },
    {
        question: "Choose the correct preposition: 'I am good ___ math.'",
        answers: [
            { text: "in", correct: false },
            { text: "on", correct: false },
            { text: "at", correct: true },
            { text: "for", correct: false }
        ]
    },
    {
        question: "She has been working here ___ 2015.",
        answers: [
            { text: "for", correct: false },
            { text: "since", correct: true },
            { text: "from", correct: false },
            { text: "during", correct: false }
        ]
    },
    {
        question: "Which word is a synonym for 'Difficult'?",
        answers: [
            { text: "Easy", correct: false },
            { text: "Simple", correct: false },
            { text: "Challenging", correct: true },
            { text: "Boring", correct: false }
        ]
    },
    {
        question: "Passive voice: 'They built the house.'",
        answers: [
            { text: "The house was built.", correct: true },
            { text: "The house is built.", correct: false },
            { text: "The house has built.", correct: false },
            { text: "The house built.", correct: false }
        ]
    },
    {
        question: "I look forward to ___ from you.",
        answers: [
            { text: "hear", correct: false },
            { text: "hearing", correct: true },
            { text: "heard", correct: false },
            { text: "hears", correct: false }
        ]
    }
        ,
    {
        question: "Choose the correct word: He is interested ___ learning German.",
        answers: [
            { text: "on", correct: false },
            { text: "in", correct: true },
            { text: "at", correct: false },
            { text: "for", correct: false }
        ]
    },
    {
        question: "What is the comparative form of 'Good'?",
        answers: [
            { text: "Gooder", correct: false },
            { text: "More good", correct: false },
            { text: "Better", correct: true },
            { text: "Best", correct: false }
        ]
    },
    {
        question: "She ___ to the gym every Monday.",
        answers: [
            { text: "go", correct: false },
            { text: "goes", correct: true },
            { text: "going", correct: false },
            { text: "gone", correct: false }
        ]
    },
    {
        question: "Which word means 'Very big'?",
        answers: [
            { text: "Tiny", correct: false },
            { text: "Huge", correct: true },
            { text: "Small", correct: false },
            { text: "Narrow", correct: false }
        ]
    },
    {
        question: "I have lived in this city ___ 2010.",
        answers: [
            { text: "for", correct: false },
            { text: "since", correct: true },
            { text: "from", correct: false },
            { text: "at", correct: false }
        ]
    }
];
const quizContainer= document.getElementById('quiz-container');
const resultContainer=document.getElementById('result-container');
const progressBar=document.getElementById('progress-bar');
let currentQuestionIndex=0;
let score=0;

function showQuestion(){
    let progressPercentage=(currentQuestionIndex/questions.length)*100;
    progressBar.style.width=progressPercentage + "%";
    quizContainer.innerHTML='';
    const currentQuestion=questions[currentQuestionIndex];
    const questionElement=document.createElement('h2');
    questionElement.textContent=currentQuestion.question;
    quizContainer.appendChild(questionElement);
    currentQuestion.answers.forEach(answer => {
    const button=document.createElement('button');
    button.textContent=answer.text;
    button.classList.add('answer-btn');
    button.addEventListener('click',() => checkAnswer(button,answer.correct));
    quizContainer.appendChild(button);
 });
}


function showResult(){
    quizContainer.innerHTML='';
    let level="";
    let message="";
    let percentage=(score/questions.length)*100;
    if(percentage===100){
        level="c1 (Advanced)"
         message = "🏆 Excellent! Your English is highly professional.";

    }
    else if(percentage >= 80){
        level="B2 (Upper-Intermediate)"
     message = "🌟 Great job! Your level is high and ready for work or study.";
    } else if (percentage >= 60) {
        level = "B1 (Intermediate)";
        message = "👍 Good! Your level is intermediate, but you need some practice.";
    } else if (percentage >= 40) {
        level = "A2 (Elementary)";
        message = "💪 Not bad! You need to work on your grammar and vocabulary.";
    } else {
        level = "A1 (Beginner)";
        message = "📚 You are at the beginning, but with practice, you will improve!";
    }
resultContainer.innerHTML=`
<h2>Test Completed 🎉</h2>
<p>You answered <strong>${score}</strong> out of <strong>${questions.length}</strong> correctly. </p>
<h3 style="margin-top: 15px;">Your Estimated Level:${level}</h3>
<p style="margin-top: 10px;">${message}</p>
<button onclick="location.reload()" class="restart-btn">Restart Test</button>
`
}
 function playSound(type){
    const audioCtx=new(window.AudioContext||window.webkitAudioContext)();
    const oscillator=audioCtx.createOscillator();
    const gainNode=audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if(type==='correct'){
        oscillator.type='sine';
        oscillator.frequency.value=800;
    }else{
        oscillator.type='sawtooth';
        oscillator.frequency.value=200;
    }
    oscillator.start();
    oscillator.stop(audioCtx.currentTime+0.15);
 }
 function checkAnswer(buttonElement,isCorrect){
    if(isCorrect){
        score++;
        playSound('correct');
        buttonElement.style.background="#4ade80";
    }else{
        playSound('wrong');
        buttonElement.style.background="#f87171";

    }
    const allButtons=document.querySelectorAll('.answer-btn');
    allButtons.forEach(btn => btn.disabled=true);
    setTimeout(() => {
        currentQuestionIndex++;
        if(currentQuestionIndex<questions.length){
            showQuestion();
        }else{
            showResult();
        }
        
    }, 1000);
 }

showQuestion();






