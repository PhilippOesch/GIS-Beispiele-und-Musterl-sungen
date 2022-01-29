const formular: HTMLFormElement = <HTMLFormElement>document.getElementById("formular");
const button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("create");

button.addEventListener("click", function (evt: Event) {
    evt.preventDefault();
    sendPost();
});

interface User {
    firstname: string,
    surname: string,
}

async function sendPost(): Promise<void> {
    const user: User = {
        firstname: formular.firstname.value,
        surname: formular.surname.value
    }
    console.log(user)

    await fetch("http://127.0.0.1:3000/user", {
        method: "post",
        body: JSON.stringify(user),
    });
}