
const enterbutton: HTMLElement = <HTMLElement>document.getElementById("enter-button");
const concertEventform = <HTMLFormElement>document.getElementById("concertevent-form");
const tableBody: HTMLElement = document.getElementById("table-body");

const url = "http://127.0.0.1:3000";
const path = "/concertevents";

interface ConcertEvent {
  _id?: string;
  interpret?: string;
  price?: number;
  datetime?: string;
}

enterbutton.addEventListener("click", function (_evt: Event): void {
  _evt.preventDefault();
  sendNewEntry();
});

async function handleDelete(_elementId: string): Promise<void> {
  const queryUrl: string = `${url}${path}?id=${_elementId}`;
  const response: Response = await fetch(queryUrl, {
    method: "DELETE"
  });
  console.log("delete");
  let text: string = await response.text();
  console.log(text);
  loadCurrentEntries();
}

function createDeleteButtonCell(_parentElement: HTMLElement, _elementid: string): HTMLTableCellElement {
  const tablecell: HTMLTableCellElement = document.createElement("td");
  const deleteButton: HTMLButtonElement = document.createElement("button");
  deleteButton.textContent = "Delete Event";

  deleteButton.classList.add("delete-button", "ui", "button", "negative");

  deleteButton.addEventListener("click", function (evt: Event): void {
    evt.preventDefault();
    handleDelete(_elementid);
  });

  tablecell.appendChild(deleteButton);

  return tablecell;
}

function createTableCell(_value: string, _name: string): HTMLTableCellElement {
  const tablecell: HTMLTableCellElement = document.createElement("td");
  tablecell.setAttribute(_name, _value);
  tablecell.textContent = _value;
  return tablecell;
}

function validierung(_interpret?: string, _price?: number, _datetime?: string): boolean {
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

async function sendNewEntry(): Promise<void> {
  let formData: FormData = new FormData(concertEventform);

  const newEntry: ConcertEvent = {
    interpret: <string>formData.get("interpret"),
    price: Number(formData.get("price")),
    datetime: <string>formData.get("datetime")
  };

  if (!validierung(newEntry.interpret, newEntry.price, newEntry.datetime)) {
    return;
  }

  const response: Response = await fetch(`${url}${path}`, {
    method: "post",
    body: JSON.stringify(newEntry)
  });
  let text: string = await response.text();
  console.log(text);
  loadCurrentEntries();
}

async function loadCurrentEntries(): Promise<void> {
  const response: Response = await fetch(`${url}${path}`, {
    method: "get"
  });
  const result: ConcertEvent[] = await response.json();
  console.log(result);
  updateView(result);
}

function updateView(_concertEvents: ConcertEvent[]): void {
  tableBody.textContent = "";
  for (const concertEvent of _concertEvents) {
    const tableEntry: HTMLTableRowElement = document.createElement("tr");
    tableEntry.classList.add("table-entry");

    let cells: HTMLTableCellElement[] = [
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

