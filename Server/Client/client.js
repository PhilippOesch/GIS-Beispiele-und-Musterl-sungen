"use strict";
var Client;
(function (Client) {
    const url = "http://localhost:3000/";
    const countDaysPath = "countDays";
    const convertDatePath = "dateConverter";
    const form = document.getElementById("dateForm");
    const convertDateButton = document.getElementById("conv-button");
    const getDayButton = document.getElementById("days-button");
    const display = document.getElementById("display");
    convertDateButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        sendForm(convertDatePath);
    });
    getDayButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        sendForm(countDaysPath);
    });
    async function sendForm(path) {
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        let urlWithQuery = url + path + "?" + query.toString();
        let response = await fetch(urlWithQuery);
        let text = await response.text();
        display.textContent = text;
    }
})(Client || (Client = {}));
const convertDatePath = "";
//# sourceMappingURL=client.js.map