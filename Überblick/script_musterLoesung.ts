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
  let maxPrice: number = 0;
  for (const entry of array) {
    if (maxPrice < entry[1]) {
      maxPrice = entry[1];
    }
  }
  return maxPrice;
}
console.log("Max Price:", maxPrice(events)); // Max Price: 25.2

// d)
function hasInterpret(array: any[][], interpret: string): boolean {
  for (const entry of array) {
    if (entry[0].toLowerCase() === interpret.toLowerCase()) {
      return true;
    }
  }
  return false;
}

console.log("Metallica", hasInterpret(events, "Metallica")); // Ausgabe: "Metallica" true
console.log("jürgen drew", hasInterpret(events, "jürgen drew")); // Ausgabe: "jürgen drew" false
console.log("mETALLICA", hasInterpret(events, "mETALLICA")); // Ausgabe: "mETALLICA" true

// e)
function factorial(n: number): void {
  let idx: number = 1;
  let result: number = 1;
  while (idx <= n) {
    result *= idx;
    idx++;
  }
  console.log(`${n}!: ${result}`);
}

factorial(4); // 4!: 24
factorial(5); // 5!: 120
factorial(10); // 10!: 3628800

// f)
let count: number = 0;
for (let i: number = 1; i <= 100; i++) {
  if (i % 3 === 0) {
    console.log(i);
    count++;
  }
}
// Ergebnis: 33

console.log("Numbers devidable by 3:", count);

// g)
class ConcertEvent {
  private interpret: string;
  private price: number;

  constructor(interpret: string, price: number) {
    this.interpret = interpret;
    this.price = price;
  }

  show(): void {
    console.log(`Interpret: ${this.interpret}, Price: ${this.price}`);
  }
}

// h)
let concertEventsArray: ConcertEvent[] = [];

for (const event of events) {
  concertEventsArray.push(new ConcertEvent(event[0], event[1]));
}

for (const concertEvent of concertEventsArray) {
  concertEvent.show(); // Ausgaben z.B.: "Interpret: Helene Fischer, Price: 3.1"
}
