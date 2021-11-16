namespace namespace1 {
  // hole den Zähler Display durch dessen ID aus dem DOM
  const count_display: HTMLElement = document.getElementById("count-display");

  // hole den Button durch dessen ID aus dem DOM
  const count_button: HTMLElement = document.getElementById("count-button");

  //Füge dem Button die Funktion "incrementCount" als Zähler hinzu
  count_button.addEventListener("click", incrementCount);

  //Variable zum Speichern des aktuellen Zählers
  let count: number = 0;

  //Funktion zum Höchzählen
  function incrementCount() {
    count++; //hochzählen
    console.log(count); //aktuellen Count ausgeben
    const newButton = document.createElement("button"); //Button Element erstellen
    newButton.textContent = "Zähler hochzählen"; //Button mit Textinhalt befüllen
    newButton.addEventListener("click", incrementCount); //Dem Button die Funktion incrementCount als Click Eventlistener hinzufügem
    document.body.appendChild(newButton); //Button in den Body einfügen
    count_display.textContent = "Zähler: " + count; //Zähler-Display updaten
  }
}
