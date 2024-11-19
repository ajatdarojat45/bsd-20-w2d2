import { Db, MongoClient } from "mongodb";

const uri: string = process.env.DB_URL;

const client: MongoClient = new MongoClient(uri);

const db: Db = client.db("w2");

export { client, db };
