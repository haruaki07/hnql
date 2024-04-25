import { TYPES } from "@/container/types";
import { DbConnection } from "@/data/common/db-connection";
import { ItemDbObject, ItemScoreDbObject } from "@/generated/types";
import { inject, injectable } from "inversify";
import { Filter, ObjectId, Sort } from "mongodb";

@injectable()
export class ItemRepository {
  constructor(
    @inject(TYPES.DbConnetion)
    private _dbConn: DbConnection
  ) {}

  private getCollection() {
    return this._dbConn.db.collection<ItemDbObject>("items");
  }

  private getScoreCollection() {
    return this._dbConn.db.collection<ItemScoreDbObject>("item_scores");
  }

  async countItems(filter: Filter<ItemDbObject>) {
    return await this.getCollection().countDocuments(filter);
  }

  async getItemById(id: string) {
    const item = await this.getCollection().findOne({ _id: new ObjectId(id) });

    if (!item) {
      throw new Error("invalid item id");
    }

    return item;
  }

  async getItems(limit: number = 30, filter: Filter<ItemDbObject> = {}) {
    const items = await this.getCollection()
      .find(filter)
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

  async addItemScore(userId: string, itemId: string) {
    const count = await this.getScoreCollection().countDocuments({
      by: userId,
      item: new ObjectId(itemId),
    });
    if (count > 0) {
      throw new Error("user already voted");
    }

    const { acknowledged, insertedId } =
      await this.getScoreCollection().insertOne({
        _id: new ObjectId(),
        by: userId,
        item: new ObjectId(itemId),
        time: new Date(),
      });

    if (!acknowledged) {
      throw new Error("could not add item score");
    }

    return insertedId;
  }

  async countItemScore(itemId: string) {
    const count = await this.getScoreCollection().countDocuments({
      item: new ObjectId(itemId),
    });

    return count;
  }

  async deleteItemScore(userId: string, itemId: string) {
    const score = await this.getScoreCollection().findOne({
      by: userId,
      item: new ObjectId(itemId),
    });
    if (!score) {
      throw new Error("item is not voted");
    }

    const { acknowledged } = await this.getScoreCollection().deleteOne({
      _id: score._id,
    });

    if (!acknowledged) {
      throw new Error("could not unvote item");
    }

    return true;
  }
}
