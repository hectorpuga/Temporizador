let timerInterval;
let seconds = 0;
let isRunning = false;
let isPaused = false;

const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const finishButton = document.getElementById("finish-btn");

// Variables para rastrear el tiempo de cierre de la página
let exitTime;
let resumeTime;

// Función para cargar el estado previo desde el almacenamiento local
function loadTimerState() {
    const storedState = localStorage.getItem("timerState");
    const storedSeconds = localStorage.getItem("timerSeconds");
    exitTime = localStorage.getItem("exitTime");

    if (storedState === "running") {
        seconds = parseInt(storedSeconds, 10);
        if (exitTime) {
            const currentTime = new Date().getTime();
            const elapsedSeconds = Math.floor((currentTime - exitTime) / 1000);
            seconds += elapsedSeconds;
        }
        startTimer();
    } else if (storedState === "paused") {
        seconds = parseInt(storedSeconds, 10);
        updateTimerDisplay();
        pauseTimer();
    } else if (storedState === "finished") {
        seconds = 0;
        finishTimer();
    }
}

// Cargar el estado al cargar la página
loadTimerState();

function saveTimerState(state) {
    localStorage.setItem("timerState", state);
    localStorage.setItem("timerSeconds", seconds.toString());
    if (isRunning) {
        const currentTime = new Date().getTime();
        localStorage.setItem("exitTime", currentTime.toString());
    } else {
        localStorage.removeItem("exitTime");
    }
}

function updateTimerDisplay() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    timerElement.innerText = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startTimer() {
    startButton.style.display = "none";
    pauseButton.style.display = "block";
    finishButton.style.display = "block";
    isRunning = true;
    isPaused = false;
    saveTimerState("running");

    timerInterval = setInterval(function () {
        seconds++;
        updateTimerDisplay();
        saveTimerState("running");
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    pauseButton.style.display = "none";
    startButton.style.display = "block";
    finishButton.style.display = "block";
    isRunning = false;
    isPaused = true;
    saveTimerState("paused");
}

function finishTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    updateTimerDisplay(); // Actualizar la visualización del temporizador
    startButton.style.display = "block";
    pauseButton.style.display = "none";
    finishButton.style.display = "none";
    isRunning = false;
    isPaused = false;

    saveTimerState("finished");
}

// Calcular el tiempo transcurrido al cargar la página
window.addEventListener("load", function () {
    if (exitTime && resumeTime && !isPaused) {
        const elapsedSeconds = Math.floor((resumeTime - exitTime) / 1000);
        seconds += elapsedSeconds;
        if (isRunning) {
            startTimer();
        }
    }
});

startButton.addEventListener("click", function () {
    if (!isRunning) {
        startTimer();
    }
});

pauseButton.addEventListener("click", function () {
    if (isRunning) {
        pauseTimer();
        finishButton.style.display = "none";
    }
});

finishButton.addEventListener("click", finishTimer);

// Agregar evento para manejar la reanudación
window.addEventListener("focus", function () {
    if (isPaused) {
        finishButton.style.display = "block";
    }
});
