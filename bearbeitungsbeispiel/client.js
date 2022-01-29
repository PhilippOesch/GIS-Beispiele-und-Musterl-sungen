"use strict";
const formular = document.getElementById("formular");
const button = document.getElementById("create");
button.addEventListener("click", function (evt) {
    evt.preventDefault();
    sendPost();
});
async function sendPost() {
    const user = {
        firstname: formular.firstname.value,
        surname: formular.surname.value
    };
    console.log(user);
    await fetch("http://127.0.0.1:3000/user", {
        method: "post",
        body: JSON.stringify(user),
    });
}
//# sourceMappingURL=client.js.map