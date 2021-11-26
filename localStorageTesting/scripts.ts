namespace testNamespace{
    const inputIntpret: HTMLInputElement= <HTMLInputElement>document.getElementById("input-interpret");
    const inputPrice: HTMLInputElement= <HTMLInputElement>document.getElementById("input-price");
    const display: HTMLElement= <HTMLElement>document.querySelector("#display");
    const myButton: HTMLButtonElement= <HTMLButtonElement>document.querySelector("#mache-etwas");

    myButton.addEventListener("click", mybuttonHandler);

    console.log(inputIntpret);
    console.log(inputPrice);

    let array: number[]= [12, 15, 17, 20];
    let arrayString: string= JSON.stringify(array);

    localStorage.setItem("localStorageElement", arrayString);

    function mybuttonHandler(){
        let interpretValue= inputIntpret.value;
        let priceValue= inputPrice.value;
        //console.log("button click");
        let arrayFromStorageAsString: string= localStorage.getItem("localStorageElement");
        let numbersArray: number[]= JSON.parse(arrayFromStorageAsString);
        console.log(arrayFromStorageAsString);
        console.log(numbersArray);

        console.log(numbersArray[0] * numbersArray[2]);

        // display.textContent= interpretValue + "; " +priceValue;
        let newElement= document.createElement("div");
        newElement.textContent= interpretValue + "; "+ priceValue;
        display.appendChild(newElement);
    }
}