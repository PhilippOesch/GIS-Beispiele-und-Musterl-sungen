"use strict";
var testNamespace;
(function (testNamespace) {
    // Verweise auf die HTML Elemente im DOM
    const inputIntpret = document.getElementById("input-interpret"); //Verweis auf Interpret Input-Feld
    const inputPrice = document.getElementById("input-price"); //Verweis auf Preis Input-Feld
    const display = document.querySelector("#display"); //Verweis auf das Display-Elternelement
    const myButton = document.querySelector("#mache-etwas"); //Verweis auf den Button
    // Füge dem Button einen Eventlistener hinzu, der auf Click-Events lauschen soll
    myButton.addEventListener("click", mybuttonHandler); // Wenn ein Click-Event auf den Button ausgeführt wird, soll die Funktion "myButtonHandler" ausgeführt werden.
    // Kurzer Test, ob die Input-Element im Dom auch gefunden wurden
    console.log(inputIntpret);
    console.log(inputPrice);
    // Wenn alles klappt, sollten die entsprechenden HTML-Elemente in der Entwicklerkonsole angezeigt werden.
    // Handler-Funktion für den Oben definierten Event-Listener
    function mybuttonHandler() {
        //Holen der aktuellen Inhalte aus den Input-Elementen 
        let interpretValue = inputIntpret.value; //Das hier steht gerade im Interpret-Input
        let priceValue = Number(inputPrice.value); //Der Price-Input soll bitte einen Zahl sein
        let newElement = document.createElement("div"); // Erstelle ein Div-Element
        newElement.textContent = interpretValue + "; " + priceValue; //Fülle das Div-Element mit einem Text-Inhalt
        display.appendChild(newElement); //Füge nun noch Das erstellte Div-Element in das Display-Element als Kind-Objekt ein
        /* Da das Display Teil des DOMs ist und wir "newElement" dem Display-Element
        hinzugefügt haben ist das "newElement" nun auch Teil des DOMs und genaugenommen
        ein Kind(Child)-Objekt der Display-Elements */
    }
})(testNamespace || (testNamespace = {}));
//# sourceMappingURL=scripts.js.map