import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import ConcertEvent from "./ConcertEvent";

module MongoDBHelper {
    const mongoUrl: string = "mongodb://localhost:27017";
    const databaseName: string = "gis_praktikum";
    const collectionName: string = "concert_events";
    let concerEventCollection: Collection<ConcertEvent>;
    let mongoClient: MongoClient = new MongoClient(mongoUrl);
    let db: Db;

    export async function connect(): Promise<void> {
        await mongoClient.connect();
        db = mongoClient.db(databaseName);
        concerEventCollection = db.collection(collectionName);
    }

    export async function getConcertEvents(): Promise<ConcertEvent[]> {
        return <ConcertEvent[]>await concerEventCollection.find().toArray();
    }

    export async function insertEvent(_concertEvent: ConcertEvent): Promise<void> {
        await concerEventCollection.insertOne(_concertEvent);
    }

    export async function deleteEvent(_id: string): Promise<void> {
        const objectId: ObjectId = new ObjectId(_id);
        await concerEventCollection.deleteOne({ _id: objectId });
    }
}

export default MongoDBHelper;