"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const MongoDBHelper_1 = require("./MongoDBHelper");
var Server;
(function (Server) {
    const hostname = "127.0.0.1"; // localhost
    const port = 3000;
    const server = http.createServer(async (request, response) => {
        response.statusCode = 200;
        response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
        let url = new URL(request.url || "", `http://${request.headers.host}`);
        switch (url.pathname) {
            case "/concertevents":
                await concertEventsRoute(url, request, response);
                break;
            default:
                response.statusCode = 404;
        }
        response.end();
    });
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
    async function concertEventsRoute(_url, _request, _response) {
        await MongoDBHelper_1.default.connect();
        switch (_request.method) {
            case "GET":
                _response.setHeader("Content-Type", "application/json");
                const result = await MongoDBHelper_1.default.getConcertEvents();
                _response.write(JSON.stringify(result));
                break;
            case "POST":
                await new Promise((resolve) => {
                    let jsonString = "";
                    _request.on("data", data => {
                        jsonString += data;
                    }).on("end", async () => {
                        const concertEvent = JSON.parse(jsonString);
                        await MongoDBHelper_1.default.insertEvent(concertEvent);
                        resolve();
                    });
                });
                console.log("inserted");
                _response.write("inserted");
                break;
            case "DELETE":
                const deleteID = _url.searchParams.get("id");
                await MongoDBHelper_1.default.deleteEvent(deleteID);
                _response.write(`deleted: ${deleteID}`);
                break;
        }
    }
})(Server || (Server = {}));
//# sourceMappingURL=server.js.map