import * as http from "http";
import * as mongo from "mongodb";

const hostname: string = "127.0.0.1"; // localhost
const port: number = 3002;

const mongoUrl: string = "mongodb://localhost:27017"; // URL zur MongoDB-Datenbank
let mongoClient: mongo.MongoClient = new mongo.MongoClient(mongoUrl); // Inszanziierung de MongoClients


// Funktion zu auslesen der Datenbank
async function dbFind(
    db: string,
    collection: string,
    requestObject: any,
    response: http.ServerResponse
) {
    let result = await mongoClient
        .db(db)
        .collection(collection)
        .find(requestObject)
        .toArray();
    // console.log(result, requestObject); // bei Fehlern zum Testen
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(result));
}

const server: http.Server = http.createServer(
    async (request: http.IncomingMessage, response: http.ServerResponse) => {
        response.statusCode = 200;
        // response.setHeader("Content-Type", "text/plain");
        response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
        let url: URL = new URL(request.url || "", `http://${request.headers.host}`);

        switch (url.pathname) {
            case "/insert":
                await mongoClient.connect();
                switch (request.method) {
                    case "GET":
                        // einlesen von Einträgen in DB
                        mongoClient.db("mongodb_test").collection("test_eintraege").insertOne({
                            "name": "testtest",
                            "age": 30
                        });
                        response.write("Hello World");
                        break;
                }
                break;
            case "/auslesen":
                await mongoClient.connect();
                switch (request.method) {
                    case "GET":
                        // let result = await mongoClient.db("mongodb_test").collection("test_eintraege").find({}).toArray();
                        // response.setHeader("Content-Type", "application/json");
                        // response.write(JSON.stringify(result));

                        await dbFind("mongodb_test", "test_eintraege", {}, response); //auslesen der Datenbank
                        break;
                }
            case "/deleteCollection":
                await mongoClient.connect();
                switch (request.method) {
                    case "GET":
                        await mongoClient.db("mongodb_test").collection("test_eintraege").drop();
                        break;
                    default:
                        response.statusCode = 404;
                }
                response.end();
        }
    }
);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});