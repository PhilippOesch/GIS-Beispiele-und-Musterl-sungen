import * as http from "http";
import MongoDBHelper from "./MongoDBHelper";
import ConcertEvent from "./ConcertEvent";

module Server {
    const hostname: string = "127.0.0.1"; // localhost
    const port: number = 3000;

    const server: http.Server = http.createServer(
        async (request: http.IncomingMessage, response: http.ServerResponse) => {
            response.statusCode = 200;
            response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
            let url: URL = new URL(request.url || "", `http://${request.headers.host}`);
            switch (url.pathname) {
                case "/concertevents":
                    await concertEventsRoute(url, request, response);
                    break;
                default:
                    response.statusCode = 404;
            }
            response.end();
        }
    );

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });

    async function concertEventsRoute(_url: URL, _request: http.IncomingMessage, _response: http.ServerResponse): Promise<void> {
        await MongoDBHelper.connect();
        switch (_request.method) {
            case "GET":
                _response.setHeader("Content-Type", "application/json");
                const result: ConcertEvent[] = await MongoDBHelper.getConcertEvents();
                _response.write(JSON.stringify(result));
                break;
            case "POST":
                // Promise damit die Antwort erst gesendet wird, nachdem der Eintrag in MongoDB eingefügt wurde.
                await new Promise<void>((resolve) => {
                    let jsonString: string = "";
                    _request.on("data", data => {
                        jsonString += data;
                    }).on("end", async () => {
                        const concertEvent: ConcertEvent = JSON.parse(jsonString);
                        await MongoDBHelper.insertEvent(concertEvent);
                        resolve();
                    });
                });
                console.log("inserted");
                _response.write("inserted");
                break;
            case "DELETE":
                const deleteID: string = _url.searchParams.get("id");
                await MongoDBHelper.deleteEvent(deleteID);
                _response.write(`deleted: ${deleteID}`);
                break;
        }
    }
}