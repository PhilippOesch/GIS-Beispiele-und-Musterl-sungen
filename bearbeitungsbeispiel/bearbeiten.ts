//auslesen des Parameters über den Parametername
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(urlParams.get("_id")); //auslesen des Parameters über den Parametername

async function getEntryWithID() {
    //den ID-Parameter gebe ich hier an den Server weiter:
    let url = "http://127.0.0.1:3000/user?_id=" + urlParams.get("_id");
    console.log(url)
    let result = await fetch(url, {
        method: "GET"
    })

    let text: string = await result.text()
    // die Rückgabe ist der Datenbank-Eintrag mit der entsprechenden ID
    // wenn ich z.B. folgende Adresse Anfrage: "http://127.0.0.1:3000/user?_id=abcdef" bekomme ich den Datenbankeintrag mit der ID "abcdef"
    console.log(text)
}

getEntryWithID();