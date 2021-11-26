"use strict";
var LocalStorageInput;
(function (LocalStorageInput) {
    const inputElement = document.getElementById("input-element");
    const saveButton = document.getElementById("save-button");
    const loadButton = document.getElementById("load-button");
    const display = document.getElementById("display");
    saveButton.addEventListener("click", saveInLocalStorage);
    loadButton.addEventListener("click", loadFromLocalStorage);
    loadFromLocalStorage();
    function saveInLocalStorage() {
        let value = inputElement.value;
        localStorage.setItem("currentInput", value);
    }
    function loadFromLocalStorage() {
        let valueFromLocalStorage = JSON.parse(localStorage.getItem("currentInput"));
        if (valueFromLocalStorage !== null) {
            display.textContent = `${valueFromLocalStorage}`;
        }
    }
})(LocalStorageInput || (LocalStorageInput = {}));
//# sourceMappingURL=main.js.map