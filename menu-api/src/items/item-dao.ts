import { Item } from "./item.interface";
import { db } from "../database/connection";
import { UpdateResult } from "mongodb";

const collectionName = "items";

export interface IItemDao {
    saveItem(item: Item): Promise<void>;
    getItem(id: number): Promise<Item | undefined>;
    getAllItems(): Promise<Item[]>;
    updateItem(id: number, item: Item): Promise<void>;
    deleteItem(id: number): Promise<null | void>;
}

export class ItemDao implements IItemDao {
    async updateItem(id: number, item: Item): Promise<void> {
        await db.collection<Item>(collectionName).updateOne({ id }, item, { upsert: true });
        return;
    }
    async deleteItem(id: number): Promise<void | null> {
        await db.collection<Item>(collectionName).deleteOne({ id });
        return;
    }
    async saveItem(item: Item): Promise<void> {
        await db.collection<Item>(collectionName).insertOne(item);
        return;
    }
    async getItem(id: number): Promise<Item | undefined> {
        const result = await db.collection<Item>(collectionName).findOne({ id })
        return result;
    }
    async getAllItems(): Promise<Item[]> {
        const cursor = await db.collection<Item>(collectionName).find({});
        const result = await cursor.toArray();
        return result;
    }

}