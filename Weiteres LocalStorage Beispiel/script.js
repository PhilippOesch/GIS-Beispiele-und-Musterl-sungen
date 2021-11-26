"use strict";
var localStorageBeispiel;
(function (localStorageBeispiel) {
    // Variante 1
    // const inputFeld: HTMLInputElement = document.getElementById("input-element") as HTMLInputElement;
    // Variante 2
    const inputFeld = document.getElementById("input-element");
    const saveButton = document.getElementById("save-button");
    const loadButton = document.getElementById("load-button");
    const display = document.getElementById("display");
    saveButton.addEventListener("click", saveButtonHandler);
    loadButton.addEventListener("click", loadButtonHandler);
    console.log("Test");
    function saveButtonHandler() {
        console.log("Save Button clicked");
        console.log("aktuelle Input: " + inputFeld.value);
        localStorage.setItem("gis_praktikum_input", inputFeld.value);
    }
    function loadButtonHandler() {
        console.log("Load Button clicked");
        let valueFromLocalStorage = localStorage.getItem("gis_praktikum_input");
        console.log("aktuelle Wert im Local Storage: " + valueFromLocalStorage);
        display.textContent = valueFromLocalStorage;
    }
})(localStorageBeispiel || (localStorageBeispiel = {}));
//# sourceMappingURL=script.js.map