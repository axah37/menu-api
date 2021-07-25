import { MongoClient, Db } from "mongodb";


const client = new MongoClient("mongodb://localhost:27017")

export let db:Db;

export const connect = async(dbName: string = "menu") =>{
    const conn = await client.connect();
    db = conn.db(dbName);
    return client;
}