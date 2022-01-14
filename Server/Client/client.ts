module Client {
    const url: string = "http://localhost:3000/";

    const countDaysPath: string= "countDays";
    const convertDatePath: string= "dateConverter";

    const form: HTMLFormElement = <HTMLFormElement>document.getElementById("dateForm");
    const convertDateButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("conv-button");
    const getDayButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("days-button");
    const display: HTMLDivElement = <HTMLDivElement>document.getElementById("display");

    convertDateButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        sendForm(convertDatePath);
    });
    getDayButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        sendForm(countDaysPath);
    });

    async function sendForm(path: String): Promise<void> {
        let formData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let urlWithQuery: string = url + path + "?" + query.toString();

        let response: Response = await fetch(urlWithQuery);
        let text: string = await response.text();
        display.textContent = text;
    }
}

const convertDatePath: string = "";