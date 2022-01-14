"use strict";
var stopwatch;
(function (stopwatch) {
    const timerDisplay = document.getElementById("timer-display");
    const startButton = document.getElementById("start-button");
    const stopButton = document.getElementById("stop-button");
    const resetButton = document.getElementById("reset-button");
    const timerStorageKey = "currentTimer";
    let timer;
    let fulltime = 0;
    let timeTaken = 0;
    let isTimerRunning = false;
    loadTimerFromLocalStorage();
    startButton.addEventListener("click", startButtonHandler);
    stopButton.addEventListener("click", stopButtonHandler);
    resetButton.addEventListener("click", resetButtonHandler);
    function startButtonHandler() {
        if (!isTimerRunning) {
            isTimerRunning = true;
            const starttime = new Date();
            timer = setInterval(function () {
                const currentTime = new Date();
                timeTaken = currentTime.getTime() - starttime.getTime();
                updateDisplay(fulltime + timeTaken);
            }, 10);
        }
    }
    function stopButtonHandler() {
        isTimerRunning = false;
        clearInterval(timer);
        fulltime += timeTaken;
        timeTaken = 0;
        saveTimerInLocalStorage();
    }
    function updateDisplay(_timerNumber) {
        let optionsSec = {
            minimumIntegerDigits: 2,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
        let optionsMin = {
            minimumIntegerDigits: 2,
        };
        const timerHours = Math.floor(_timerNumber / 3600000);
        const timerSec = (_timerNumber / 1000 % 60);
        const minutes = Math.floor(_timerNumber / 60000 % 60);
        const formatedHours = `${(timerHours != 0) ? timerHours + "." : ""}`;
        const formatedMinutes = `${(timerHours != 0 && minutes == 0) ? "00." : ""}${(timerHours == 0 && minutes != 0) ? minutes + "." : ""}${(timerHours != 0 && minutes != 0) ? new Intl.NumberFormat("en-IT", optionsMin).format(minutes) + "." : ""}`;
        const formatedSeconds = new Intl.NumberFormat("en-IT", optionsSec).format(timerSec);
        timerDisplay.textContent = `${formatedHours}${formatedMinutes}${formatedSeconds}`;
    }
    function resetButtonHandler() {
        stopButtonHandler();
        fulltime = 0;
        saveTimerInLocalStorage();
        updateDisplay(fulltime);
    }
    function saveTimerInLocalStorage() {
        localStorage.setItem(timerStorageKey, JSON.stringify(fulltime));
    }
    function loadTimerFromLocalStorage() {
        fulltime = Number(localStorage.getItem(timerStorageKey));
        updateDisplay(fulltime);
    }
})(stopwatch || (stopwatch = {}));
//# sourceMappingURL=script.js.map