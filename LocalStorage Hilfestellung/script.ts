namespace localStorageHilfestellung{
    /*Der LocalStorage ermöglicht mir, Daten Lokal auf eine Rechner zu speicher,
    So das ich beim neuladen der Seite z.B. immer noch die gleichen Daten vorliegen habe. */

    let array: number[]= [14, 16, 20, 22]; //Hier habe ich ein Array angelegt
    let arrayIGotFromLocalStorage: number[]; //in dieser Variable will ich später das aus dem LocalStorage geholte Array wieder abspeichern

    /* Um das Array im Lokal storage abzulegen, muss ich
    muss ich zunächst einen String daraus machen. Das geht mit JSON.stringify */ 
    let arrayString: string = JSON.stringify(array);

    /* Nun speichere ich das Array als String mit dem eindeutigen Key "myArray" im LocalStorage ab. */
    localStorage.setItem("myArray", arrayString); // So speichere ich Werte im LocalStorage ab!
    //Ich kann nur Strings im LocalStorage speichern.

    let stringFromLocalStorage: string= localStorage.getItem("myArray"); // So hole ich Werte wieder aus dem LocalStorage heraus. Dafür brauche ich den passenden Key!
    // Der Wert den ich aus dem LocalStorage geholt habe, ist bisher noch ein String

    arrayIGotFromLocalStorage = JSON.parse(stringFromLocalStorage); // So mache ich aus dem String wieder ein Array.
    // Das geht nicht nur mit Arrays, sonder auch mit beliebigen anderen Datentypen in TypeScript

    console.log("Das Array mit dem Key 'myArray' aus dem LocalStorage:", arrayIGotFromLocalStorage); // Gebe das aus dem Storage geholte Array in der Konsole aus.

    // Da ich jetzt wieder ein Numbers-Array vorliegen habe, kann ich mit den Werten dort drinne jetzt z. B. auch wieder Berechnungen durchführen.
    console.log("Der Wert an der Stelle[0] mal den Wert an der Stelle[2]=", arrayIGotFromLocalStorage[0] * arrayIGotFromLocalStorage[2]);
}