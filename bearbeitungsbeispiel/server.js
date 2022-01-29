"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const mongo = require("mongodb");
const hostname = "127.0.0.1"; // localhost
const port = 3000;
const mongoUrl = "mongodb://localhost:27017"; // für lokale MongoDB
let mongoClient = new mongo.MongoClient(mongoUrl);
async function dbFind(db, collection, requestObject, response) {
    await mongoClient.connect();
    let result = await mongoClient
        .db(db)
        .collection(collection)
        .find(requestObject)
        .toArray();
    // console.log(result, requestObject); // bei Fehlern zum Testen
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(result));
}
async function dbAddOrEdit(db, collection, request) {
    let jsonString = "";
    request.on("data", data => {
        jsonString += data;
    });
    request.on("end", async () => {
        await mongoClient.connect();
        // console.log(jsonString); // bei Fehlern zum Testen
        let student = JSON.parse(jsonString);
        if (student._id && student._id !== "") {
            student._id = new mongo.ObjectId(student._id);
            mongoClient.db(db).collection(collection).replaceOne({
                _id: student._id,
            }, student);
        }
        else {
            student._id = undefined;
            mongoClient.db(db).collection(collection).insertOne(student);
        }
    });
}
async function addEntry(db, collection, entry) {
    await mongoClient.connect();
    mongoClient.db(db).collection(collection).insertOne(entry);
}
const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
    let url = new URL(request.url || "", `http://${request.headers.host}`);
    switch (url.pathname) {
        case "/user":
            switch (request.method) {
                case "POST":
                    let jsonString = "";
                    request.on("data", (data) => {
                        jsonString += data;
                    });
                    request.on("end", () => {
                        let user = JSON.parse(jsonString);
                        addEntry("usersDB", "users", user);
                    });
                    break;
                case "GET":
                    const id = url.searchParams.get("_id");
                    console.log(id);
                    await dbFind("usersDB", "users", { _id: new mongo.ObjectId(id) }, response);
            }
            break;
        default:
            response.statusCode = 404;
    }
    response.end();
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=server.js.map