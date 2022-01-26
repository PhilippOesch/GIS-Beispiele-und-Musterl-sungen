"use strict";
const enterbutton = document.getElementById("enter-button");
const concertEventform = document.getElementById("concertevent-form");
const tableBody = document.getElementById("table-body");
const url = "http://127.0.0.1:3000";
const path = "/concertevents";
enterbutton.addEventListener("click", function (_evt) {
    _evt.preventDefault();
    sendNewEntry();
});
async function handleDelete(_elementId) {
    const queryUrl = `${url}${path}?id=${_elementId}`;
    const response = await fetch(queryUrl, {
        method: "DELETE"
    });
    console.log("delete");
    let text = await response.text();
    console.log(text);
    loadCurrentEntries();
}
function createDeleteButtonCell(_parentElement, _elementid) {
    const tablecell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Event";
    deleteButton.classList.add("delete-button", "ui", "button", "negative");
    deleteButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        handleDelete(_elementid);
    });
    tablecell.appendChild(deleteButton);
    return tablecell;
}
function createTableCell(_value, _name) {
    const tablecell = document.createElement("td");
    tablecell.setAttribute(_name, _value);
    tablecell.textContent = _value;
    return tablecell;
}
// const createNewEventEntry: () => void = (): void => {
//   const tableEntry: HTMLTableRowElement = document.createElement("tr");
//   tableEntry.classList.add("table-entry");
//   // const interpret: string | null = interpretInput.value;
//   // const price: number | null = Number(priceInput.value);
//   // const datetime: string | null = dateInput.value;
//   if (!validierung(interpret, price, datetime)) {
//     return;
//   }
//   let cells: HTMLTableCellElement[] = [
//     createTableCell(interpret, "data-interpret"),
//     createTableCell(price.toString(), "data-price"),
//     createTableCell(datetime, "data-date"),
//     createDeleteButtonCell(tableEntry)
//   ];
//   for (const cell of cells) {
//     tableEntry.appendChild(cell);
//   }
//   tableBody.appendChild(tableEntry);
// };
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
async function sendNewEntry() {
    let formData = new FormData(concertEventform);
    const newEntry = {
        interpret: formData.get("interpret"),
        price: Number(formData.get("price")),
        datetime: formData.get("datetime")
    };
    if (!validierung(newEntry.interpret, newEntry.price, newEntry.datetime)) {
        return;
    }
    const response = await fetch(`${url}${path}`, {
        method: "post",
        body: JSON.stringify(newEntry)
    });
    let text = await response.text();
    console.log(text);
    loadCurrentEntries();
}
async function loadCurrentEntries() {
    const response = await fetch(`${url}${path}`, {
        method: "get"
    });
    const result = await response.json();
    console.log(result);
    updateView(result);
}
function updateView(_concertEvents) {
    tableBody.textContent = "";
    for (const concertEvent of _concertEvents) {
        const tableEntry = document.createElement("tr");
        tableEntry.classList.add("table-entry");
        let cells = [
            createTableCell(concertEvent.interpret, "data-interpret"),
            createTableCell(concertEvent.price.toString(), "data-price"),
            createTableCell(concertEvent.datetime, "data-date"),
            createDeleteButtonCell(tableEntry, concertEvent._id)
        ];
        for (const cell of cells) {
            tableEntry.appendChild(cell);
        }
        tableBody.appendChild(tableEntry);
    }
}
loadCurrentEntries();
//# sourceMappingURL=main.js.map