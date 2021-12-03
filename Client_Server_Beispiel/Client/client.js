"use strict";
var Client;
(function (Client) {
    console.log("Client läuft");
    const url = "http://127.0.0.1:3000";
    const path = "/greetings";
    const myForm = document.getElementById("myform");
    const sendButton = document.getElementById("send-button");
    sendButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        sendForm();
    });
    console.log(myForm, sendButton);
    async function sendForm() {
        let formData = new FormData(myForm);
        let query = new URLSearchParams(formData);
        let urlWithQuery = url + path + "?" + query.toString();
        let response = await fetch(urlWithQuery);
        let responseText = await response.text();
        console.log(responseText);
    }
})(Client || (Client = {}));
//# sourceMappingURL=client.js.map