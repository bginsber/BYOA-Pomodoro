let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the document title with emoji
    const statusEmoji = isWorkTime ? '☕' : '🫖';
    document.title = `${statusEmoji} ${formattedTime}`;
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
                
                // Define the new status with emojis
                const newStatus = isWorkTime 
                    ? '☕ Work Time' 
                    : '🫖 Break Time';
                
                // Update status with animation
                statusText.classList.remove('status-change');
                void statusText.offsetWidth; // Trigger reflow
                statusText.textContent = newStatus;
                statusText.classList.add('status-change');
                updateDisplay();
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    statusText.textContent = isWorkTime ? '☕ Work Time' : '🫖 Break Time';
    updateDisplay();
}

function switchMode() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    statusText.textContent = isWorkTime ? '☕ Work Time' : '🫖 Break Time';
    updateDisplay();
    startTimer();
}

// Initialize
timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
document.getElementById('mode-toggle').addEventListener('change', function() {
    if (this.checked) {
        // Break mode
        isWorkTime = false;
        timeLeft = 5 * 60; // 5 minutes for break
        statusText.textContent = '🫖 Break Time';
        resetTimer();
    } else {
        // Work mode
        isWorkTime = true;
        timeLeft = 25 * 60; // 25 minutes for work
        statusText.textContent = '☕ Work Time';
        resetTimer();
    }
}); 