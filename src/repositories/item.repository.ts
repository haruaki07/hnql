import { TYPES } from "@/container/types";
import { DbConnection } from "@/data/common/db-connection";
import { ItemDbObject } from "@/generated/types";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";

@injectable()
export class ItemRepository {
  constructor(
    @inject(TYPES.DbConnetion)
    private _dbConn: DbConnection
  ) {}

  private getCollection() {
    return this._dbConn.db.collection<ItemDbObject>("items");
  }

  async getItemById(id: string) {
    const item = await this.getCollection().findOne({ _id: new ObjectId(id) });

    if (!item) {
      throw new Error("invalid item id");
    }

    return item;
  }

  async getItems(limit: number = 30) {
    const items = await this.getCollection()
      .find({})
      .sort({ time: -1 })
      .limit(limit)
      .toArray();

    return items;
  }

  async insertItem(item: Omit<ItemDbObject, "_id">) {
    const { acknowledged, insertedId } = await this.getCollection().insertOne(
      item as ItemDbObject
    );

    if (!acknowledged) {
      throw new Error("could not create item");
    }

    return insertedId;
  }
}
