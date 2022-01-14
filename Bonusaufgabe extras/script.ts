namespace stopwatch {
  const timerDisplay: HTMLElement = <HTMLElement>document.getElementById("timer-display");
  const checkpointDisplayContainer: HTMLDivElement = <HTMLDivElement>document.querySelector(".checkpoint-container");
  let checkpointDisplay: HTMLDivElement = <HTMLDivElement>document.getElementById("checkpoint-display");

  const startButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start-button");
  const stopButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("stop-button");
  const resetButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("reset-button");
  const checkpointButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("checkpoint-button");

  let checkpoints: number[] = [];

  const circleElement: SVGCircleElement | null = getSvgCircleById("circle-object");

  let radius: number = Number(circleElement.getAttribute("r"));
  let circumference: number = Math.ceil(2 * Math.PI * radius);
  circleElement.style.strokeDasharray = String(circumference);

  const timerStorageKey: string = "currentTimer";
  const checkpointStorageKey: string = "checkpoints";

  let timer: number;
  let fulltime: number = 0;
  let timeTaken: number = 0;
  let isTimerRunning: boolean = false;

  loadTimerFromLocalStorage();

  startButton.addEventListener("click", startButtonHandler);
  stopButton.addEventListener("click", stopButtonHandler);
  resetButton.addEventListener("click", resetButtonHandler);
  checkpointButton.addEventListener("click", checkpointButtonHandler);

  function checkpointButtonHandler(): void {
    const newCheckPoint: number = fulltime + timeTaken;
    checkpoints.push(newCheckPoint);
    displayNewCheckpoint(newCheckPoint);
    saveTimerInLocalStorage();
  }

  function displayNewCheckpoint(_checkpoint: number): void {
    const newCheckpointElement: HTMLDivElement = <HTMLDivElement >document.createElement("div");
    newCheckpointElement.textContent = convertNumberToTimeString(_checkpoint);
    checkpointDisplay.prepend(newCheckpointElement);
  }

  function startButtonHandler(): void {
    if (!isTimerRunning) {
      isTimerRunning = true;
      const starttime: Date = new Date();
      timer = setInterval(function (): void {
        const currentTime: Date = new Date();
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

  function toggleElementVisibility(element: HTMLElement, bool: boolean): void {
    if (bool === true) {
      element.style.display = "inline-block";
    } else {
      element.style.display = "none";
    }
  }

  function stopButtonHandler(): void {
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

  function updateDisplay(_timerNumber: number): void {
    timerDisplay.textContent = convertNumberToTimeString(_timerNumber);
  }

  function convertNumberToTimeString(_timerNumber: number): string {
    let optionsSec: Object = {
      minimumIntegerDigits: 2,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    let optionsMin: Object = {
      minimumIntegerDigits: 2
    };
    const timerHours: number = Math.floor(_timerNumber / 3600000);
    const timerSec: number = (_timerNumber / 1000) % 60;
    const minutes: number = Math.floor((_timerNumber / 60000) % 60);

    const formatedHours: string = `${timerHours != 0 ? timerHours + "." : ""}`;
    const formatedMinutes: string = `${
      timerHours != 0 && minutes == 0 ? "00." : ""
    }${timerHours == 0 && minutes != 0 ? minutes + "." : ""}${
      timerHours != 0 && minutes != 0
        ? new Intl.NumberFormat("en-IT", optionsMin).format(minutes) + "."
        : ""
    }`;
    const formatedSeconds: string = new Intl.NumberFormat(
      "en-IT",
      optionsSec
    ).format(timerSec);

    return `${formatedHours}${formatedMinutes}${formatedSeconds}`;
  }

  function resetButtonHandler(): void {
    stopButtonHandler();
    fulltime = 0;
    saveTimerInLocalStorage();
    updateDisplay(fulltime);
    updateCircleStroke(fulltime);
    resetCheckpoints();
  }

  function resetCheckpoints(): void {
    checkpoints = [];
    localStorage.setItem(checkpointStorageKey, JSON.stringify(checkpoints));
    checkpointDisplayContainer.removeChild(checkpointDisplay);
    checkpointDisplay = document.createElement("div");
    checkpointDisplay.id = "checkpoint-display";
    checkpointDisplayContainer.appendChild(checkpointDisplay);
  }

  function updateCircleStroke(_timerSec: number): void{
    let currentOffset: number = circumference - (circumference / 60 * ((_timerSec / 1000) % 60));
    circleElement.style.strokeDashoffset = String(currentOffset);
  }

  function saveTimerInLocalStorage(): void {
    localStorage.setItem(timerStorageKey, JSON.stringify(fulltime + timeTaken));
    localStorage.setItem(checkpointStorageKey, JSON.stringify(checkpoints));
  }

  function loadTimerFromLocalStorage(): void {
    fulltime = Number(localStorage.getItem(timerStorageKey));
    checkpoints = JSON.parse(localStorage.getItem(checkpointStorageKey));
    updateDisplay(fulltime);
    updateCircleStroke(fulltime);

    if (!checkpoints) {
      checkpoints = [];
      return;
    }
    for (const checkpoint of checkpoints){
      displayNewCheckpoint(checkpoint);
    }
  }

  function getSvgCircleById (id: string): SVGCircleElement | null {
    const element: HTMLElement = document.getElementById(id);
    if (!element) return null;
    if (isHTMLCircle(element)) {
      return element;
    }
    return null;
  }

  function isHTMLCircle (
    something: HTMLElement | SVGCircleElement
  ): something is SVGCircleElement {
    if (!something) return false;
    return something instanceof SVGCircleElement;
  }
}
