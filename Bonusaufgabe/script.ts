namespace stopwatch{

    const timerDisplay: HTMLElement = <HTMLElement>document.getElementById("timer-display");
    const startButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("start-button");
    const stopButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("stop-button");
    const resetButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("reset-button");

    const timerStorageKey: string = "currentTimer";

    let timer: number;
    let fulltime: number = 0;
    let timeTaken: number = 0;
    let isTimerRunning: boolean = false;

    loadTimerFromLocalStorage();

    startButton.addEventListener("click", startButtonHandler);
    stopButton.addEventListener("click", stopButtonHandler);
    resetButton.addEventListener("click", resetButtonHandler);

    function startButtonHandler(): void {
        if (!isTimerRunning) {
            isTimerRunning = true;
            const starttime: Date = new Date();
            timer = setInterval(function (): void {
                const currentTime: Date = new Date(); 
                timeTaken = currentTime.getTime() - starttime.getTime();
                updateDisplay(fulltime + timeTaken);
            },10 );
        }
    }

    function stopButtonHandler(): void{
        isTimerRunning = false;
        clearInterval(timer);
        fulltime += timeTaken;
        timeTaken = 0;
        saveTimerInLocalStorage();
    }

    function updateDisplay(_timerNumber: number): void {
        let optionsSec: Object = {
            minimumIntegerDigits: 2,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };

        let optionsMin: Object = {
            minimumIntegerDigits: 2,
        };
        const timerHours: number = Math.floor(_timerNumber / 3600000);
        const timerSec: number = (_timerNumber / 1000 % 60);
        const minutes: number = Math.floor(_timerNumber / 60000 % 60);

        const formatedHours: string = `${(timerHours != 0) ? timerHours + "." : ""}`;
        const formatedMinutes: string = `${(timerHours != 0 && minutes == 0) ? "00." : ""}${(timerHours == 0 && minutes != 0) ? minutes + "." : ""}${(timerHours != 0 && minutes != 0) ? new Intl.NumberFormat("en-IT", optionsMin).format(minutes) + "." : ""}`;
        const formatedSeconds: string = new Intl.NumberFormat("en-IT", optionsSec).format(timerSec);
        timerDisplay.textContent = `${formatedHours}${formatedMinutes}${formatedSeconds}`;
    }

    function resetButtonHandler(): void {
        stopButtonHandler();
        fulltime = 0;
        saveTimerInLocalStorage();
        updateDisplay(fulltime);
    }

    function saveTimerInLocalStorage(): void {
        localStorage.setItem(timerStorageKey, JSON.stringify(fulltime));
    }

    function loadTimerFromLocalStorage(): void {
        fulltime = Number(localStorage.getItem(timerStorageKey));
        updateDisplay(fulltime);
    }
}