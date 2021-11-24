// -- [Aufgabe 1]

/**
 * @var {number} age: Bitte anstatt der 24 dein Alter eintragen
 */
let age: number = 26;

/**
 * @var {string} firstName: Bitte anstatt 'Max' deinen Vornamen eintragen
 */
let firstName: string = `Lutz`;

function func1(age: number): number {
  return 2021 - age;
}

let output: string = func2(firstName);

function func3(meal?: string): string {
  console.log(`Ich esse gerne ${meal || "Pizza"}.`);
  return func1(age) > 1995
    ? `Ich gehöre zur Generation Z`
    : `Ich gehöre zur Generation Y`;
}

console.log(output);

function func2(name: string): string {
  console.log(`Ich heiße ${name}.`);
  return func3();
}

/* -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 1 EINTRAGEN
 * Ich heiße Max
 * Ich esse gerne Pizza
 * Ich gehöre zur Generation Z
 */

let events: any[][] = [
  ["Mark Knopfler", 10.1],
  ["Pink Floyd", 15.9],
  ["Metallica", 20.1],
  ["Michael Bublé", 11.1],
  ["Dire Straits", 12.2],
  ["Mariah Carey", 1.1],
  ["Cat Stevens", 12.99],
  ["Mark Forster", 2.1],
  ["Helene Fischer", 3.1],
  ["Bee Gees", 25.2]
];

// -- [Aufgabe 2]

// a)
console.log("Array Length: ", events.length); //Ergebnis: 10

// b)
for (const entry of events) {
  console.log(`interpret: ${entry[0]}, ticket price: ${entry[1]}$`); //Ausgabe z.B. : "interpret: Cat Stevens, ticket price: 12.99$"
}

// c)
function maxPrice(array: any[][]): number {
  let maxPrice: number = 0; //Maximalpreis mit 0 initialisieren
  for (const entry of array) { //Iteration
    if (maxPrice < entry[1]) {
      maxPrice = entry[1]; // Wenn der aktuell Wert größer als der aktuelle Maximapreis ist, überschreibe den Aktuelle Maximalwert
    }
  }
  return maxPrice; //Gibt am Ende der Iteration den Maximalpreis zurück
}
console.log("Max Price:", maxPrice(events)); // Max Price: 25.2

// d)
function hasInterpret(array: any[][], interpret: string): boolean {
  for (const entry of array) { //Iteration
    if (entry[0].toLowerCase() === interpret.toLowerCase()) { //mache beide Strings zu Kleinbuchstaben
      return true; //Wenn beide Strings gleich sind, wurde der Interpret gefunden und es kann "true" zurückgegeben werden
    }
  }
  return false; //Wenn die Interation bis zum Ende durchgelaufen ist, wurde Der Interpret nicht gefunden und es kann "false" zurüchgegeben werden
}

console.log("Metallica", hasInterpret(events, "Metallica")); // Ausgabe: "Metallica" true
console.log("jürgen drew", hasInterpret(events, "jürgen drew")); // Ausgabe: "jürgen drew" false
console.log("mETALLICA", hasInterpret(events, "mETALLICA")); // Ausgabe: "mETALLICA" true

// e)
function factorial(n: number): void {
  let idx: number = 1; // lege eine Index an und setze ihn auf 1
  let result: number = 1; //lege die Rückgabevariable an
  while (idx <= n) { //solane der Index kleiner/ gleich n ist
    result *= idx; // mulipliziere den Index mit dem aktuelle Resultat
    idx++; //zähle den Index hoch
  }
  console.log(`${n}!: ${result}`); //Ausgabe der Fakultät
}

factorial(4); // 4!: 24
factorial(5); // 5!: 120
factorial(10); // 10!: 3628800

// f)
let count: number = 0; //Zähler mit 0 initialisieren
for (let i: number = 1; i <= 100; i++) { // Durch alle Zahlen von 1 bis 100 durchiterieren
  if (i % 3 === 0) { //Wenn die Zahl durch 3 teilbar ist und kein Rest (Modulo) überbleibt
    console.log(i); // Ausgabe des Aktuelle Wertes
    count++; // Zähler hochzählen
  }
}
// Ergebnis: 33

console.log("Numbers devidable by 3:", count); // Zähler Ausgabe

// g)
class ConcertEvent {
  // Attribute anlegen
  private interpret: string;
  private price: number;

  //Konstruktor
  constructor(interpret: string, price: number) {
    // Werte mithilfe der Parameter initialisieren
    this.interpret = interpret; 
    this.price = price;
  }

  //Funktion für die Ausgabe
  show(): void {
    console.log(`Interpret: ${this.interpret}, Price: ${this.price}`);
  }
}

// h)
let concertEventsArray: ConcertEvent[] = []; //Array initialisieren

for (const event of events) { //durch altes Array durchiterieren
  concertEventsArray.push(new ConcertEvent(event[0], event[1])); //mit den Werten Objekte vom Typ "ConcertEvent" instanziieren
}

for (const concertEvent of concertEventsArray) {
  concertEvent.show(); // Ausgaben z.B.: "Interpret: Helene Fischer, Price: 3.1"
}
