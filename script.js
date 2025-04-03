let currentLevel = 1;
let correctAnswer;
let startTime;
let timerInterval;

// Levels
const levels = [
    ['🍨'], ['🥘', '🎭', '🍛'], ['🎪', '🥑', '🍒', '🍊'],
    ['🎢', '🥕', '🥔', '🌽'], ['🍢', '🍡', '🍧', '🍨', '🍦'],
    ['🍋', '🎪', '🥭'], ['🍉', '🎡', '🥝'], ['🤹', '🥬', '🍮'],
    ['🍎', '🤹', '🎢'], ['🍠', '🎪', '🥖']
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

// Show instructions on load
window.onload = function() {
    instructionModal.style.display = "flex";
};

// Start game
startGameBtn.onclick = function() {
    instructionModal.style.display = "none";
    startNewLevel();
};

// Start level
function startNewLevel() {
    clearInterval(timerInterval);
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);

    itemContainer.innerHTML = '';
    optionsContainer.innerHTML = '';
    resultText.textContent = '';
    nextLevelBtn.classList.add('hidden');

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
    if (selected === correctAnswer) {
        resultText.textContent = 'Correct!';
        nextLevelBtn.classList.remove('hidden');
    } else {
        resultText.textContent = 'Incorrect. Try again!';
    }
}

// Next level
nextLevelBtn.addEventListener('click', () => {
    currentLevel++;
    if (currentLevel > levels.length) {
        alert("You completed the game! 🎉");
        currentLevel = 1;
    }
    startNewLevel();
});

// Timer update
function updateTimer() {
    let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    timeCounter.textContent = elapsedTime + 's';
}
