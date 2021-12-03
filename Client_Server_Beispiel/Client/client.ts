namespace Client {
    console.log("Client läuft"); //Testausgabe

    const url: string = "http://127.0.0.1:3000"; //URL Adresse, auf der der Server aktiv ist.
    const path: string = "/greetings"; //Spezifischer Pfad, an den die Anfrage gehen soll.

    const myForm: HTMLFormElement = <HTMLFormElement>document.getElementById("myform"); //Referenzieren des Formulars
    const sendButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("send-button"); //Referenzieren des Send-Buttons

    //EventListener für ein Click-Event aud den sendButton
    sendButton.addEventListener("click", function(evt: Event){
        evt.preventDefault(); //Vermeiden, dass Event wie gewöhlich ausgeführt wird
        sendForm(); // sendForm-Funktion aufrufen.
    });

    console.log(myForm, sendButton); //Konsole-Log zum testen der HTML-Referenzen

    /* 
    wenn wir das "await"-Stichwort in der Funktion verwenden müssen wir diese Funktion als "async" kennzeichnen.
    Auserdem ist der Rückgabewert dann immer vom Typ: Promise;
    */
    async function sendForm(): Promise<void> {

        //Vorbereiten der Formulardaten zum Sende-Prozess
        let formData: FormData= new FormData(myForm); //Formulardaten mit unserem Formular initialisieren.
        let query: URLSearchParams = new URLSearchParams(<any>formData); //Get-Parameter vorbereiten
        let urlWithQuery: string = url + path + "?" + query.toString(); //Formatierung der URL zum Senden an den Server
        /* 
        Die QueryURL besteht aus der url selbst, 
        aus dem gewünschten Pfad, 
        einem Fragezeichen um zu kennzeichnen das jetzt Getparameter angehengt werden
        und der Get-Parametern (query.toString())
        */

        let response: Response = await fetch(urlWithQuery); // Senden der Anfrage und warten auf Antwort
        let responseText: string = await response.text(); // Warten auf den Response-Text;
        console.log(responseText); // Ausgabe der Server-Antwort in der Konsole
    }
}