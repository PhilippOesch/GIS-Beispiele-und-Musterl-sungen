"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
var Server;
(function (Server) {
    const hostname = "127.0.0.1"; // localhost
    const port = 3000;
    const monthStrings = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const server = http.createServer((request, response) => {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
        let url = new URL(request.url || "", `http://${request.headers.host}`);
        routing(response, url);
        response.end();
    });
    function routing(response, url) {
        let dateString;
        switch (url.pathname) {
            case "/":
                response.write("Hello World");
                break;
            case "/dateConverter":
                dateString = convertDate(url.searchParams.get("date"));
                response.write(dateString);
                break;
            case "/countDays":
                let days = countDays(url.searchParams.get("date"));
                response.write(days);
                break;
            default:
                response.statusCode = 404;
        }
    }
    function countDays(dateString) {
        let date = new Date(dateString);
        let currentDate = new Date();
        let differenz = date.getTime() - currentDate.getTime();
        let days = Math.round(Math.abs(differenz / 1000 / 60 / 60 / 24));
        if (differenz < 0) {
            return `${days} Days in the past`;
        }
        return `${days} Days still to go`;
    }
    function convertDate(dateString) {
        let date = new Date(dateString);
        return `Month: ${monthStrings[date.getMonth()]}, Day: ${date.getDate()}, Year: ${date.getFullYear()}`;
    }
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
})(Server || (Server = {}));
//# sourceMappingURL=server.js.map