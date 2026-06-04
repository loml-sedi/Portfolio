const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('nav-links--open');
        menuIcon.textContent = navLinks.classList.contains('nav-links--open') ? '✕' : '☰';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-links--open');
            menuIcon.textContent = '☰';
        });
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('nav-links--open') &&
            !navLinks.contains(e.target) &&
            !menuIcon.contains(e.target)) {
            navLinks.classList.remove('nav-links--open');
            menuIcon.textContent = '☰';
        }
    });
}

const gameArea = document.getElementById('gameArea');
const startBtn = document.getElementById('startBtn');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const statusText = document.getElementById('statusText');

let score = 0;
let timeLeft = 60;
let timerInterval = null;
let gameActive = false;

let currentTarget = null;
let targetTimeout = null;
let nextSpawnTimeout = null;

let combo = 0;
let targetResolved = false;

const TARGET_LIFESPAN = 1500;
const SPAWN_DELAY = 800;
const POINTS_PER_HIT = 10;
const TIME_PENALTY_MISS = 2;

function updateUI() {
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
}

function removeTarget() {
    if (targetTimeout) {
        clearTimeout(targetTimeout);
        targetTimeout = null;
    }
    
    if (currentTarget) {
        currentTarget.remove();
        currentTarget = null;
    }
}

function showScoreFeedback(points) {
    const feedback = document.createElement('div');
    feedback.className = 'score-feedback';
    feedback.textContent = `+${points}`;

    Object.assign(feedback.style, {
        position: 'absolute',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: 'var(--accent)',
        textShadow: '0 0 4px white',
        pointerEvents: 'none',
        zIndex: '100',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)',
        animation: 'floatUp 0.6s ease-out forwards'
    });

    gameArea.appendChild(feedback);
    setTimeout(() => feedback.remove(), 600);
}

function showMissFeedback() {
    const msg = document.createElement('div');
    msg.className = 'miss-feedback';
    msg.textContent = `-${TIME_PENALTY_MISS}s`;

    Object.assign(msg.style, {
        position: 'absolute',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#e74c3c',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: '4px 10px',
        borderRadius: '20px',
        pointerEvents: 'none',
        zIndex: '100',
        left: '50%',
        top: '60%',
        transform: 'translate(-50%, -50%)',
        animation: 'floatUp 0.6s ease-out forwards'
    });

    gameArea.appendChild(msg);
    setTimeout(() => msg.remove(), 500);
}

function handleMiss() {
    if (!gameActive || targetResolved) return;
    targetResolved = true;

    combo = 0;
    timeLeft = Math.max(0, timeLeft - TIME_PENALTY_MISS);
    updateUI();
    showMissFeedback();

    statusText.textContent = `Miss! -${TIME_PENALTY_MISS}s`;

    setTimeout(() => {
        if (gameActive) {
            statusText.textContent = 'Game active! Click the stars!';
        }
    }, 800);

    if (timeLeft <= 0) endGame();
}

function createTarget() {
    const target = document.createElement('div');
    target.className = 'game-target';

    const rect = gameArea.getBoundingClientRect();
    const x = Math.random() * (rect.width - 80);
    const y = Math.random() * (rect.height - 80);

    Object.assign(target.style, {
        position: 'absolute',
        left: `${Math.max(10, x)}px`,
        top: `${Math.max(10, y)}px`,
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        backgroundColor: 'var(--accent-warm)',
        border: '3px solid white',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        color: 'white',
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        transition: 'transform 0.1s ease, opacity 0.2s ease'
    });

    target.textContent = '⭐';

    const clickHandler = (e) => {
        e.stopPropagation();
        if (!gameActive || targetResolved) return;
        targetResolved = true;

        combo++;

        let points = POINTS_PER_HIT;
       // if (combo >= 5) points += Math.floor(combo / 5) * 5;

        score += points;
        updateUI();
        showScoreFeedback(points);

        target.style.transform = 'scale(0.9)';
        target.style.opacity = '0.5';

        setTimeout(() => {
            if (currentTarget === target) {
                removeTarget();
            }
        }, 100);
        
        scheduleNextTarget(Math.max(300, SPAWN_DELAY - Math.floor(score / 50) * 50));
    };

    target.addEventListener('click', clickHandler);
    target.addEventListener('touchstart', clickHandler, { passive: false });

    return target;
}

function spawnTarget() {
    if (!gameActive) return;

    removeTarget();

    currentTarget = createTarget();
    gameArea.appendChild(currentTarget);

    targetResolved = false;

    targetTimeout = setTimeout(() => {
        if (gameActive && currentTarget && !targetResolved) {
            handleMiss();
            removeTarget();
            scheduleNextTarget(SPAWN_DELAY);
        }
    }, TARGET_LIFESPAN);
}

function scheduleNextTarget(delay) {
    if (nextSpawnTimeout) clearTimeout(nextSpawnTimeout);
    if (!gameActive) return;

    nextSpawnTimeout = setTimeout(() => {
        if (gameActive) spawnTarget();
    }, delay);
}

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!gameActive) return;

        timeLeft--;
        updateUI();

        if (timeLeft <= 10) {
            timerElement.style.color = '#e74c3c';
            timerElement.style.fontWeight = 'bold';
        } else {
            timerElement.style.color = '';
            timerElement.style.fontWeight = '';
        }

        if (timeLeft <= 0) {
            timeLeft = 0;
            updateUI();
            endGame();
        }
    }, 1000);
}

function endGame() {
    if (!gameActive) return;
    gameActive = false;

    clearInterval(timerInterval);
    clearTimeout(nextSpawnTimeout);
    clearTimeout(targetTimeout);

    removeTarget();

    startBtn.disabled = false;
    startBtn.textContent = 'Play Again';

    if (score >= 300) {
        statusText.innerHTML = `🎉 Amazing! Final score: ${score}`;
    } else if (score >= 150) {
        statusText.innerHTML = `👍 Great job! Final score: ${score}`;
    } else {
        statusText.innerHTML = `📊 Game over! Score: ${score}`;
    }

    timerElement.style.color = '';
}

function resetGame() {
    clearInterval(timerInterval);
    clearTimeout(nextSpawnTimeout);
    clearTimeout(targetTimeout);

    score = 0;
    timeLeft = 60;
    combo = 0;
    gameActive = false;

    removeTarget();
    updateUI();

    statusText.textContent = 'Ready! Press Start Game to begin.';
    startBtn.textContent = 'Start Game';
    startBtn.disabled = false;

    gameArea.innerHTML = '<p class="game-placeholder">Press start to begin</p>';
}

function initGame() {
    if (gameActive) return;

    resetGame();
    gameArea.innerHTML = '';

    gameActive = true;
    statusText.textContent = 'Game active! Click the stars!';
    startBtn.disabled = true;

    startTimer();
    setTimeout(spawnTarget, 300);
}

startBtn.addEventListener('click', initGame);

const style = document.createElement('style');
style.textContent = `
@keyframes floatUp {
    0% { opacity: 1; transform: translate(-50%, -50%) scale(0.8); }
    100% { opacity: 0; transform: translate(-50%, -100%) scale(1.2); }
}

.game-target {
    animation: subtlePop 0.2s ease-out;
}

@keyframes subtlePop {
    0% { transform: scale(0.7); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
`;
document.head.appendChild(style);

console.log("Game loaded - cleaned and improved version");