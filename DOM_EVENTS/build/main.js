"use strict";
// HTMLElement Definitionen
const enterbutton = document.querySelector("#enter-button");
// HTML Inputs
const interpretInput = document.querySelector("#interpret-input");
const priceInput = document.querySelector("#price-input");
const dateInput = document.querySelector("#datetime-input");
// TabellenObjekt Objekt
const tableBody = document.querySelector("#table-body");
// EventHandler für Enter-Button
enterbutton.addEventListener("click", enterEvent);
// Addressierung durch eine entsprechende Klasse
// Funktion für die Eventlistner der einzelnen Lösch-Buttons
const handleDelete = (_evt, _parentElement) => {
    tableBody.removeChild(_parentElement);
};
// Bauplan für die Zeile des Löschbuttons
const createDeleteButtonCell = (_parentElement) => {
    // lege eine neue Tabellenzelle und einen neuen Button an
    const tablecell = document.createElement("td");
    const deleteButton = document.createElement("button");
    // Füllen des Buttons mit Inhalt
    deleteButton.textContent = "Delete Event";
    // gib dem Button die passenden HTML-Klassen
    deleteButton.classList.add("delete-button", "ui", "button", "negative");
    // Füge einen Eventlistener dem Löschbutton hinzu
    deleteButton.addEventListener("click", function (evt) {
        handleDelete(evt, _parentElement);
    });
    // füge in die Tabellenzelle den Löschbutton ein
    tablecell.appendChild(deleteButton);
    // gebe die Tabellenzelle zurück
    return tablecell;
};
// Funktion erstellt eine einzelnen Tabellenzelle mit der entsprechenden Value
function createTableCell(_value, _name) {
    const tablecell = document.createElement("td");
    tablecell.setAttribute(_name, _value);
    tablecell.textContent = _value;
    return tablecell;
}
const createNewEventEntry = () => {
    // Element für Tabellenreihe anlegen
    const tableEntry = document.createElement("tr");
    // Addressierung durch eine entsprechende Klasse
    tableEntry.classList.add("table-entry");
    // Auslesen der Input-Werte
    const interpret = interpretInput.value;
    const price = Number(priceInput.value);
    const datetime = dateInput.value;
    // Validierung der Input-Werte
    if (!validierung(interpret, price, datetime)) {
        return;
    }
    // lege die einzelnen Tabellenzellen an
    let cells = [
        createTableCell(interpret, "data-interpret"),
        createTableCell(price.toString(), "data-price"),
        createTableCell(datetime, "data-date"),
        createDeleteButtonCell(tableEntry),
    ];
    // füge die einzelnen Tabellenzellen der Tabellenreihe hinzu
    for (const cell of cells) {
        tableEntry.appendChild(cell);
    }
    // pflege die gesamte Tabellenreihe in die Tabellenstruktur ein
    tableBody.appendChild(tableEntry);
};
function validierung(_interpret, _price, _datetime) {
    if (!_interpret || !_price || !_datetime) {
        alert("Please fill out all input fields!");
        return false;
    }
    if (isNaN(_price)) {
        alert("Price Input is not a Number");
        return false;
    }
    return true;
}
// EventHandler für Enter-Button
function enterEvent(_evt) {
    _evt.preventDefault();
    createNewEventEntry();
}
//# sourceMappingURL=main.js.map