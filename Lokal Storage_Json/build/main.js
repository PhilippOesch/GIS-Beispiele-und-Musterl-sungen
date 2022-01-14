"use strict";
var domAndEvents;
(function (domAndEvents) {
    // HTMLElement Definitionen
    const enterbutton = document.querySelector("#enter-button");
    // HTML Inputs
    const interpretInput = document.querySelector("#interpret-input");
    const priceInput = document.querySelector("#price-input");
    const dateInput = document.querySelector("#datetime-input");
    // Verweis auf Tabellen-Körper Objekt
    const tableBody = document.querySelector("#table-body");
    // EventHandler für Enter-Button
    enterbutton.addEventListener("click", enterEvent);
    //Init-Funktion aufrufen
    init();
    // Funktion für die Eventlistner der einzelnen Lösch-Buttons
    function handleDelete(_evt, _parentElement) {
        tableBody.removeChild(_parentElement);
        //update data and localstorage
        saveConcertEvents();
    }
    // Bauplan für die Zeile des Löschbuttons
    function createDeleteButtonCell(_parentElement) {
        // lege eine neue Tabellenzelle und einen neuen Button an
        const tablecell = document.createElement("td");
        const deleteButton = document.createElement("button");
        // Füllen des Buttons mit Inhalt
        deleteButton.textContent = "Delete Event";
        // gib dem Button die passenden HTML-Klassen
        deleteButton.classList.add("delete-button", "ui", "button", "negative");
        // Füge einen Eventlistener dem Löschbutton hinzu
        deleteButton.addEventListener("click", function (evt) {
            evt.preventDefault();
            handleDelete(evt, _parentElement);
        });
        // füge in die Tabellenzelle den Löschbutton ein
        tablecell.appendChild(deleteButton);
        // gebe die Tabellenzelle zurück
        return tablecell;
    }
    // Funktion erstellt eine einzelnen Tabellenzelle mit der entsprechenden Value
    function createTableCell(_value, name) {
        const tablecell = document.createElement("td");
        tablecell.setAttribute(name, _value);
        tablecell.textContent = _value;
        return tablecell;
    }
    function createNewEventEntry(object) {
        // Element für Tabellenreihe anlegen
        const tableEntry = document.createElement("tr");
        // Addressierung durch eine entsprechende Klasse
        tableEntry.classList.add("table-entry");
        let interpret;
        let price;
        let datetime;
        // Auslesen der Input-Werte
        if (object) {
            interpret = object.interpret;
            price = object.price;
            datetime = object.datetime;
        }
        else {
            interpret = interpretInput.value;
            price = Number(priceInput.value);
            datetime = dateInput.value;
        }
        // Validierung der Input-Werte
        if (!validation(interpret, price, datetime))
            return;
        // lege die einzelnen Tabellenzellen an
        let cells = [
            createTableCell(interpret, "data-interpret"),
            createTableCell(price.toString(), "data-price"),
            createTableCell(datetime, "data-date"),
            createDeleteButtonCell(tableEntry)
        ];
        // füge die einzelnen Tabellenzellen der Tabellenreihe hinzu
        for (const cell of cells) {
            tableEntry.appendChild(cell);
        }
        // pflege die gesamte Tabellenreihe in die Tabellenstruktur ein
        tableBody.appendChild(tableEntry);
    }
    // Funktion zur Validierung der Inputs
    // Es wird True zurückgegeben, wenn die Validierung erfolgreich war. Ansonsten wird False zurückgegeben
    function validation(_interpret, _price, _dateTime) {
        // Schaue, dass alle Inputfelder befüllt sind
        if (!_interpret || !_price || !_dateTime) {
            alert("Please fill out all input fields!");
            return false;
        }
        // Schaue, dass der Preis vom Typ Number ist
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
        saveConcertEvents();
    }
    // Funktion zum aktualisieren des Events-Arrays
    function saveConcertEvents() {
        // suche zuächst die TabellenEinträge aus dem DOM heraus.
        const tableEntries = document.querySelectorAll(".table-entry");
        // initialisiere das Events-Array neu  
        let currentTableEntries = [];
        //lese für jeden Tabelleneintrag die Werte aus
        for (const entry of tableEntries) {
            // Sinnvoll ist es für Zellenelement z.B. ein entprechendes Data-Attribut zu definieren
            /* Damit es keine Verwechselungen gibt. Suche ich nur für die aktuelle Tabellenzeile
               das Element mit dem entsprechenden Data-Attribut heraus */
            const interpretElement = entry.querySelector("[data-interpret]");
            const priceElement = entry.querySelector("[data-price]");
            const dateElement = entry.querySelector("[data-date]");
            // auslesen der Werte, der einzelnen Zellen
            const interpret = interpretElement.dataset.interpret;
            const price = Number(priceElement.dataset.price);
            const date = dateElement.dataset.date;
            // Speicher der Attribute, im Events-Array
            currentTableEntries.push({
                interpret: interpret,
                price: price,
                datetime: date
            });
        }
        // Nachdem diese For-Schleife durchgelaufen ist, ist das Events-Array wieder auf dem aktuellsten Stand
        localStorage.setItem("event_storage", JSON.stringify(currentTableEntries));
    }
    // Funktion zum aktuallisieren der Tabelle
    function updateView() {
        // Hole die Daten aus dem LocalStorage
        const storageString = localStorage.getItem("event_storage");
        // konvertiere die Daten zurück in ein Objekt und ersätz damit das Events-Array
        const currentTableEntries = JSON.parse(storageString);
        // schaue zunächst ob es Einträge gibt, wenn Nein, springe aus der Funktion
        if (!currentTableEntries) {
            return;
        }
        // interiere die Tabellenelemente und erstelle für jedes Element einen Tabelleneintrag
        for (const element of currentTableEntries) {
            createNewEventEntry(element);
        }
    }
    // update anschließend mit dem aus dem Storage geladenen Daten die Tabelle
    function init() {
        updateView();
    }
})(domAndEvents || (domAndEvents = {}));
//# sourceMappingURL=main.js.map