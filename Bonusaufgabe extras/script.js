"use strict";
var stopwatch;
(function (stopwatch) {
    const timerDisplay = document.getElementById("timer-display");
    const checkpointDisplayContainer = document.querySelector(".checkpoint-container");
    let checkpointDisplay = document.getElementById("checkpoint-display");
    const startButton = document.getElementById("start-button");
    const stopButton = document.getElementById("stop-button");
    const resetButton = document.getElementById("reset-button");
    const checkpointButton = document.getElementById("checkpoint-button");
    let checkpoints = [];
    const circleElement = getSvgCircleById("circle-object");
    let radius = Number(circleElement.getAttribute("r"));
    let circumference = Math.ceil(2 * Math.PI * radius);
    circleElement.style.strokeDasharray = String(circumference);
    const timerStorageKey = "currentTimer";
    const checkpointStorageKey = "checkpoints";
    let timer;
    let fulltime = 0;
    let timeTaken = 0;
    let isTimerRunning = false;
    loadTimerFromLocalStorage();
    startButton.addEventListener("click", startButtonHandler);
    stopButton.addEventListener("click", stopButtonHandler);
    resetButton.addEventListener("click", resetButtonHandler);
    checkpointButton.addEventListener("click", checkpointButtonHandler);
    function checkpointButtonHandler() {
        const newCheckPoint = fulltime + timeTaken;
        checkpoints.push(newCheckPoint);
        displayNewCheckpoint(newCheckPoint);
        saveTimerInLocalStorage();
    }
    function displayNewCheckpoint(_checkpoint) {
        const newCheckpointElement = document.createElement("div");
        newCheckpointElement.textContent = convertNumberToTimeString(_checkpoint);
        checkpointDisplay.prepend(newCheckpointElement);
    }
    function startButtonHandler() {
        if (!isTimerRunning) {
            isTimerRunning = true;
            const starttime = new Date();
            timer = setInterval(function () {
                const currentTime = new Date();
                timeTaken = currentTime.getTime() - starttime.getTime();
                updateCircleStroke(fulltime + timeTaken);
                updateDisplay(fulltime + timeTaken);
            }, 10);
            toggleElementVisibility(startButton, false);
            toggleElementVisibility(stopButton, true);
            toggleElementVisibility(resetButton, false),
                toggleElementVisibility(checkpointButton, true);
        }
    }
    function toggleElementVisibility(element, bool) {
        if (bool === true) {
            element.style.display = "inline-block";
        }
        else {
            element.style.display = "none";
        }
    }
    function stopButtonHandler() {
        toggleElementVisibility(startButton, true);
        toggleElementVisibility(stopButton, false);
        toggleElementVisibility(resetButton, true),
            toggleElementVisibility(checkpointButton, false);
        isTimerRunning = false;
        clearInterval(timer);
        fulltime += timeTaken;
        timeTaken = 0;
        saveTimerInLocalStorage();
    }
    function updateDisplay(_timerNumber) {
        timerDisplay.textContent = convertNumberToTimeString(_timerNumber);
    }
    function convertNumberToTimeString(_timerNumber) {
        let optionsSec = {
            minimumIntegerDigits: 2,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };
        let optionsMin = {
            minimumIntegerDigits: 2
        };
        const timerHours = Math.floor(_timerNumber / 3600000);
        const timerSec = (_timerNumber / 1000) % 60;
        const minutes = Math.floor((_timerNumber / 60000) % 60);
        const formatedHours = `${timerHours != 0 ? timerHours + "." : ""}`;
        const formatedMinutes = `${timerHours != 0 && minutes == 0 ? "00." : ""}${timerHours == 0 && minutes != 0 ? minutes + "." : ""}${timerHours != 0 && minutes != 0
            ? new Intl.NumberFormat("en-IT", optionsMin).format(minutes) + "."
            : ""}`;
        const formatedSeconds = new Intl.NumberFormat("en-IT", optionsSec).format(timerSec);
        return `${formatedHours}${formatedMinutes}${formatedSeconds}`;
    }
    function resetButtonHandler() {
        stopButtonHandler();
        fulltime = 0;
        saveTimerInLocalStorage();
        updateDisplay(fulltime);
        updateCircleStroke(fulltime);
        resetCheckpoints();
    }
    function resetCheckpoints() {
        checkpoints = [];
        localStorage.setItem(checkpointStorageKey, JSON.stringify(checkpoints));
        checkpointDisplayContainer.removeChild(checkpointDisplay);
        checkpointDisplay = document.createElement("div");
        checkpointDisplay.id = "checkpoint-display";
        checkpointDisplayContainer.appendChild(checkpointDisplay);
    }
    function updateCircleStroke(_timerSec) {
        let currentOffset = circumference - (circumference / 60 * ((_timerSec / 1000) % 60));
        circleElement.style.strokeDashoffset = String(currentOffset);
    }
    function saveTimerInLocalStorage() {
        localStorage.setItem(timerStorageKey, JSON.stringify(fulltime + timeTaken));
        localStorage.setItem(checkpointStorageKey, JSON.stringify(checkpoints));
    }
    function loadTimerFromLocalStorage() {
        fulltime = Number(localStorage.getItem(timerStorageKey));
        checkpoints = JSON.parse(localStorage.getItem(checkpointStorageKey));
        updateDisplay(fulltime);
        updateCircleStroke(fulltime);
        if (!checkpoints) {
            checkpoints = [];
            return;
        }
        for (const checkpoint of checkpoints) {
            displayNewCheckpoint(checkpoint);
        }
    }
    function getSvgCircleById(id) {
        const element = document.getElementById(id);
        if (!element)
            return null;
        if (isHTMLCircle(element)) {
            return element;
        }
        return null;
    }
    function isHTMLCircle(something) {
        if (!something)
            return false;
        return something instanceof SVGCircleElement;
    }
})(stopwatch || (stopwatch = {}));
//# sourceMappingURL=script.js.map