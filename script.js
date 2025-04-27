let currentLevel = 1;
let correctAnswer;
let score = 0;
let startTime;
let timerInterval;
let gameEnded = false;

// Levels
const levels = [
    ['🍨'],                 //1
    ['🍋', '🥭', '🎪'],        //3    
    ['🥘', '🎭'],              //2
    ['🍛','🍉', '🎡', '🥝', '🤹','🥬', '🍮', '🍎'],  //8    
    ['🍒', '🍊', '🥕', '🥔', '🎪', '🥑'],  //6
    ['🌽', '🍢', '🍡','🍨', '🍦'],   //5     
    ['🍧','🤹', '🎢', '🍠', '🥖','🍋', '🥭', '🎪','🍨'], //9        
    ['🍉', '🎡', '🥝', '🤹','🥬', '🍮', '🍎'], //7       
    ['🤹', '🎢', '🍠', '🥖']  , //4
    ['🥘', '🎭','🌽', '🍢', '🍡','🍨', '🍦']//7

];


// Elements
const instructionModal = document.getElementById('instruction-modal');
const startGameBtn = document.getElementById('start-game-btn');
const itemContainer = document.getElementById('item-container');
const optionsContainer = document.getElementById('options-container');
const levelCounter = document.getElementById('level-counter');
const timeCounter = document.getElementById('time-counter');
const resultText = document.getElementById('result');
const nextLevelBtn = document.getElementById('next-level-btn');
const restartBtn = document.getElementById('restart-btn');

// Show instructions on load
window.onload = function() {
    instructionModal.style.display = "flex";
};

// Start game
startGameBtn.onclick = function() {
    instructionModal.style.display = "none";
    score = 0; // Reset score
    currentLevel = 1; // Start at level 1
    gameEnded = false; // Game hasn't ended yet
    startNewLevel();
};

// Start level
function startNewLevel() {
    if (gameEnded) return; // Prevent starting new levels after the game ends

    // Set the timer only if it's the first level
    if (currentLevel === 1) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 1000);
    }

    itemContainer.innerHTML = '';
    optionsContainer.innerHTML = '';
    resultText.textContent = '';
    nextLevelBtn.classList.add('hidden');
    restartBtn.classList.add('hidden');

    const items = levels[currentLevel - 1];
    correctAnswer = items.length;
    levelCounter.textContent = currentLevel;

    items.forEach(item => {
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.textContent = item;
        itemContainer.appendChild(newItem);
    });

    for (let i = 1; i <= 9; i++) {
        let option = document.createElement('button');
        option.classList.add('option');
        option.textContent = i;
        option.onclick = () => checkAnswer(i);
        optionsContainer.appendChild(option);
    }
}

// Check answer (Automatically progresses if correct)
function checkAnswer(selected) {
    if (gameEnded) return; // Prevent further interaction after game ends

    if (selected === correctAnswer) {
        score++;
        resultText.textContent = 'Correct!';
        nextLevelBtn.classList.remove('hidden');
    } else {
        resultText.textContent = 'Incorrect. Game Over!';
        gameOver();
    }
}

// Next level
nextLevelBtn.addEventListener('click', () => {
    if (currentLevel === levels.length) {
        gameOver(true); // Game finished, show score
    } else {
        currentLevel++;
        startNewLevel();
    }
});

// Timer update
function updateTimer() {
    if (gameEnded) return; // Stop updating time after game ends
    let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    timeCounter.textContent = elapsedTime + 's';
}

// Game over logic
function gameOver(completed = false) {
    gameEnded = true; // Mark the game as ended

    clearInterval(timerInterval); // Stop the timer

    const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000); // Calculate final time

    // Show final message with score and time
    const reason = completed ? "You completed the game!" : "You selected the wrong count!";
    const finalMessage = `
        <h2>${reason}</h2>
        <p>Score: ${Math.min(score, 10)}/10</p>
        <p>Time: ${elapsedTime}s</p>
    `;

    // Display the final message in a modal window
    const finalMessageModal = document.createElement('div');
    finalMessageModal.classList.add('modal');
    finalMessageModal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            ${finalMessage}
            <button id="restart-game-btn" class="primary-btn">Restart</button>
        </div>
    `;
    document.body.appendChild(finalMessageModal);

    const closeBtn = finalMessageModal.querySelector('.close');
    const restartGameBtn = finalMessageModal.querySelector('#restart-game-btn');

    closeBtn.onclick = () => finalMessageModal.remove();
    restartGameBtn.onclick = () => {
        finalMessageModal.remove();
        startGameBtn.click(); // Restart the game by clicking the start button
    };

    nextLevelBtn.classList.add('hidden'); // Hide the "Next Level" button when the game is over
    restartBtn.classList.remove('hidden'); // Show the "Restart" button when the game ends
}
