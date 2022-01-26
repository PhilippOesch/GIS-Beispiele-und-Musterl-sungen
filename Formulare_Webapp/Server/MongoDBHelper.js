"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
var MongoDBHelper;
(function (MongoDBHelper) {
    const mongoUrl = "mongodb://localhost:27017";
    const databaseName = "gis_praktikum";
    const collectionName = "concert_events";
    let concerEventCollection;
    let mongoClient = new mongodb_1.MongoClient(mongoUrl);
    let db;
    async function connect() {
        await mongoClient.connect();
        db = mongoClient.db(databaseName);
        concerEventCollection = db.collection(collectionName);
    }
    MongoDBHelper.connect = connect;
    async function getConcertEvents() {
        return await concerEventCollection.find().toArray();
    }
    MongoDBHelper.getConcertEvents = getConcertEvents;
    async function insertEvent(_concertEvent) {
        await concerEventCollection.insertOne(_concertEvent);
    }
    MongoDBHelper.insertEvent = insertEvent;
    async function deleteEvent(_id) {
        const objectId = new mongodb_1.ObjectId(_id);
        await concerEventCollection.deleteOne({ _id: objectId });
    }
    MongoDBHelper.deleteEvent = deleteEvent;
})(MongoDBHelper || (MongoDBHelper = {}));
exports.default = MongoDBHelper;
//# sourceMappingURL=MongoDBHelper.js.map