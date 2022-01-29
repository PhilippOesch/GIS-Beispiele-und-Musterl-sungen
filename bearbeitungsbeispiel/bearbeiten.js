"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(urlParams.get("_id"));
async function getEntryWithID() {
    let url = "http://127.0.0.1:3000/user?_id=" + urlParams.get("_id");
    console.log(url);
    let result = await fetch(url, {
        method: "GET"
    });
    let text = await result.text();
    console.log(text);
}
getEntryWithID();
//# sourceMappingURL=bearbeiten.js.map