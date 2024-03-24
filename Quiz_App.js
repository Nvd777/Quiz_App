          /* Quiz App */
         /* JavaScript */

const container=document.querySelector('.container');
const questionBox=document.querySelector('.question');
const choicesBox=document.querySelector('.choices');
const nextBtn=document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');



// Make an array of objects that stores questions,choices of questions & Answers.
const quiz=[
    {
        question:"Q. Which of the following is not a CSS box model property?",
        choices:["margin", "padding", "border-radius", "border-collapse"],
        answer:"border-collapse"
    },
    {
        question:"Q. Which event occurs when the user clicks on an HTML element?",
        choices:["onchange", "onmouseover", "onclick", "onsubmit"],
        answer:"onclick"
    },
    {
        question:"Q. Which of the following is not a JavaScript DataType?",
        choices:["string", "boolean", "object", "float"],
        answer:"float"
    },
    {
        question:"Q. What is the correct syntax for a single-line comment in JavaScript?",
        choices:["** This is a comment **", "<!-- This is a comment -->", "/* This is a comment */", "// This is a comment"],
        answer:"// This is a comment"
    }       
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () =>{
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent=questionDetails.question;
    
    choicesBox.textContent = "";
    for(let i=0; i<questionDetails.choices.length; i++)
    {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click',()=>{
            if(choiceDiv.classList.contains('selected'))
            {
                choiceDiv.classList.remove('selected');
            }
            else
            {
                choiceDiv.classList.add('selected');
            }
        });
    }
    if(currentQuestionIndex < quiz.length)
    {
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer)
    {
        // alert("Correct Answer!");
        displayAlert(`Correct Answer!`);
        alert.style.backgroundColor = "#4caf50";
        alert.style.color = 'white';
        score++;
    }
    else
    {
        // alert("Wrong Answer!");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
        alert.style.backgroundColor = "#f44336";
        alert.style.color = 'white';
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length)
    {
        showQuestions();
    }  
    else
    {
        showScore();
        stopTimer();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true; 
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) =>{
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    },2000);
}

// Function to Start Timer 
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === -1)
        {
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser)
            {
                timeLeft = 15;
                startQuiz();
            }
            else
            {
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer 
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question 
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--)
    {
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[[i]]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to start quiz 
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button 
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click',()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next")
    {
        // alert("Slect your Answer");
        displayAlert("Select your Answer!");
        alert.style.backgroundColor = 'grey';
        alert.style.color = 'yellow';
        return;
    }
    if(quizOver)
    {
            nextBtn.textContent = "Next";
            scoreCard.textContent = "";
            currentQuestionIndex = 0;          
            quizOver = false;
            score = 0;
            startQuiz();
    }
    else
    {
        checkAnswer();
    }
});

