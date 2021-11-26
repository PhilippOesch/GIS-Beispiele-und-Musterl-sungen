namespace LocalStorageInput{
    const inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("input-element");
    const saveButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("save-button");
    const loadButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("load-button");
    const display: HTMLHeadingElement = <HTMLHeadingElement>document.getElementById("display");

    saveButton.addEventListener("click", saveInLocalStorage);
    loadButton.addEventListener("click", loadFromLocalStorage);

    loadFromLocalStorage();

    function saveInLocalStorage(): void {
        let value: string = inputElement.value;
        localStorage.setItem("currentInput", value);
    }

    function loadFromLocalStorage(): void {
        let valueFromLocalStorage: string = JSON.parse(localStorage.getItem("currentInput"));
        if (valueFromLocalStorage !== null) {
            display.textContent = `${valueFromLocalStorage}`;
        }
    }
}