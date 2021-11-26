"use strict";
var localStorageBeispiel;
(function (localStorageBeispiel) {
    // Variante 1
    // const inputFeld: HTMLInputElement = document.getElementById("input-element") as HTMLInputElement;
    // Variante 2
    const inputFeld = document.getElementById("input-element"); //input-Element aus dem Dom referenzieren
    const saveButton = document.getElementById("save-button"); //Save-Button aus dem Dom referenzieren
    const loadButton = document.getElementById("load-button"); //Load-Button aus dem Dom referenzieren
    const display = document.getElementById("display"); //Display-Div-Element aus dem Dom referenzieren
    saveButton.addEventListener("click", saveButtonHandler); //füge dem Save-Button bei dem Event "click" die Funktion "saveButtonHandler" hinzu
    loadButton.addEventListener("click", loadButtonHandler); //füge dem Load-Button bei dem Event "click" die Funktion "loadButtonHandler" hinzu
    // Handler für das Save-button-Event
    function saveButtonHandler() {
        console.log("Save Button clicked"); // Konsolenausgabe zum Test der Funktion
        console.log("aktuelle Input: " + inputFeld.value); // geben den Aktuellen Wert im Inputfeld in der Konsole aus
        localStorage.setItem("gis_praktikum_input", inputFeld.value); //Speichere im Lokal Storage den Wert im Inputfeld (inputFeld.value) mit dem Key; "gis_praktikum_input" ab
    }
    // Handler für das Load-button-Event
    function loadButtonHandler() {
        console.log("Load Button clicked"); // Konsolenausgabe zum Test der Funktion
        let valueFromLocalStorage = localStorage.getItem("gis_praktikum_input"); //Suche im LocalStorage nach dem Wert mit dem Key; "gis_praktikum_input"
        console.log("aktuelle Wert im Local Storage: " + valueFromLocalStorage); //gebe den aus dem LocalStorage gezogenen Wert in der Konsole aus
        display.textContent = valueFromLocalStorage; //Überschreibe den Inhalt des Display-Elements mit dem aus dem LokalStorage gezogenen Wert.
    }
})(localStorageBeispiel || (localStorageBeispiel = {}));
//# sourceMappingURL=script.js.map