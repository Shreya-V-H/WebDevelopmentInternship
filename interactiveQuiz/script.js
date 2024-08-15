/* 
This JavaScript file contains the logic for a quiz game.
It defines an array of quiz questions and answers, as well as functions to load, display, and evaluate the quiz.
*/

// Array of quiz questions and answers
const quizData = [
    {
        // Question 1
        question: "1. Which of the following is a correct way to declare a variable of type int named 'age' and assign it the value 25?",
        a: "int age = 25;",
        b: "age int = 25",
        c: "25 = int age",
        d: "int 25 = age;",
        correct: "a",
    },
    {
        // Question 2
        question: "2. Which keyword is used to declare a variable in Java?",
        a: "var",
        b: "int",
        c: "let",
        d: "define",
        correct: "b",
    },
    {
        // Question 3
        question: "3. What is the data type for storing whole numbers in Java?",
        a: "float",
        b: "double",
        c: "int",
        d: "char",
        correct: "c",
    },
    {
        // Question 4
        question: "4. What is the correct way to write a single-line comment in Java?",
        a: "// This is a comment",
        b: "/* This is a comment */",
        c: "This is a comment",
        d: "! This is a comment",
        correct: "a",
    },
    {
        // Question 5
        question: "5. Which operator is used for concatenation (joining) strings in Java?",
        a: "=",
        b: "-",
        c: "*",
        d: "+",
        correct: "d",
    },
];

// DOM elements
const quiz = document.getElementById('quiz') // Quiz container
const time = document.getElementById('time') // Timer display
const answerEls = document.querySelectorAll('.answer') // Answer options
const questionEl = document.getElementById('question') // Question display
const a_text = document.getElementById('a_text') // Answer option A text
const b_text = document.getElementById('b_text') // Answer option B text
const c_text = document.getElementById('c_text') // Answer option C text
const d_text = document.getElementById('d_text') // Answer option D text
const submitBtn = document.getElementById('submit') // Submit button
const startBtn = document.getElementById('startBtn') // Start button
const startDiv = document.querySelector('.start') // Start screen
const containerDiv = document.querySelector('.container') // Quiz container

// Quiz variables
let currentQuiz = 0 // Current quiz question index
let score = 0 // Correct answer count
let timeLeft = 30 // Timer duration in seconds
let timeInterval // Timer interval ID

// Function to start the timer
function startTimer() {
    // Set the timer interval to decrement the time every second
    timeInterval = setInterval(() => {
        timeLeft--;
        time.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timeInterval)
            endQuiz()
        }
    }, 1000)
}

// Function to load the current quiz data
function loadQuiz() {
    deselectAnswers() // Deselect all answer options
    const currentQuizData = quizData[currentQuiz] // Get the current quiz question data
    questionEl.innerText = currentQuizData.question // Display the question
    a_text.innerText = currentQuizData.a // Display answer option A
    b_text.innerText = currentQuizData.b // Display answer option B
    c_text.innerText = currentQuizData.c // Display answer option C
    d_text.innerText = currentQuizData.d // Display answer option D
}

// Function to deselect all answer options
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

// Function to get the selected answer option
function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

// Event listener for start button
startBtn.addEventListener('click', () => {
    startDiv.style.display = 'none' // Hide the start screen
    containerDiv.style.display = 'block' // Show the quiz container
    startTimer() // Start the timer
    loadQuiz() // Load the first quiz question
})

// Event listener for submit button
submitBtn.addEventListener('click', () => {
    const answer = getSelected() // Get the selected answer option
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++ // Increment the score if the answer is correct
        }
        currentQuiz++ // Move to the next question
        if (currentQuiz < quizData.length) {
            loadQuiz() // Load the next question
        } else {
            clearInterval(timeInterval) // End the quiz if all questions have been answered
            displayResult() // Display the quiz result
        }
    }
})

// Function to display the quiz result
function displayResult() {
    if (score > 3) {
        quiz.innerHTML = `
            <h2>Congratulations!!</h2>
            <h3>You answered ${score} out of ${quizData.length} questions correctly</h3>
            <button onclick="location.reload()">Reload</button>
        `
    } else {
        quiz.innerHTML = `
            <h2>Well done, but you can do better</h2>
            <h3>You answered ${score} out of ${quizData.length} questions correctly</h3>
            <button onclick="location.reload()">Reload</button>
        `
    }
}

// Function to end the quiz
function endQuiz() {
    quiz.innerHTML = `<h2>Time Out!! Better luck next time</h2>
        <h3>You answered ${score} out of ${quizData.length}</h3>
        <button onclick="location.reload()">Reload</button>`
}
