import { config } from "@/config";
import { injectable } from "inversify";
import { Db, MongoClient } from "mongodb";

@injectable()
export class DbConnection {
  private _client: MongoClient;
  private _db: Db;

  constructor() {
    this._client = new MongoClient(config.mongo.url);
    this._db = this._client.db(config.mongo.db);
  }

  public async connect() {
    await this._client.connect();
  }

  public get db() {
    return this._db;
  }
}
