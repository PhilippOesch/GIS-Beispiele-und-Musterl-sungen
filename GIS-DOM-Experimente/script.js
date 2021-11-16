"use strict";
var namespace1;
(function (namespace1) {
    const count_display = document.getElementById("count-display");
    const count_button = document.getElementById("count-button");
    count_button.addEventListener("click", incrementCount);
    let count = 0;
    function incrementCount() {
        count++;
        console.log(count);
        const newButton = document.createElement("button");
        newButton.textContent = "Zähler hochzählen";
        newButton.addEventListener("click", incrementCount);
        document.body.appendChild(newButton);
        count_display.textContent = "Zähler: " + count;
    }
})(namespace1 || (namespace1 = {}));
//# sourceMappingURL=script.js.map