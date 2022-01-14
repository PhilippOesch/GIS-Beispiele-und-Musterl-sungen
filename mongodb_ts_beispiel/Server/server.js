"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const mongo = require("mongodb");
const hostname = "127.0.0.1"; // localhost
const port = 3002;
const mongoUrl = "mongodb://localhost:27017"; // für lokale MongoDB
let mongoClient = new mongo.MongoClient(mongoUrl);
async function dbFind(db, collection, requestObject, response) {
    let result = await mongoClient
        .db(db)
        .collection(collection)
        .find(requestObject)
        .toArray();
    // console.log(result, requestObject); // bei Fehlern zum Testen
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(result));
}
const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    // response.setHeader("Content-Type", "text/plain");
    response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
    let url = new URL(request.url || "", `http://${request.headers.host}`);
    switch (url.pathname) {
        case "/insert":
            await mongoClient.connect();
            switch (request.method) {
                case "GET":
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
                    await dbFind("mongodb_test", "test_eintraege", {}, response);
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
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=server.js.map