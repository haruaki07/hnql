import { TYPES } from "@/container/types";
import { DbConnection } from "@/data/common/db-connection";
import { UserDbObject } from "@/generated/types";
import { inject, injectable } from "inversify";
import { MongoError } from "mongodb";

@injectable()
export class UserRepository {
  constructor(
    @inject(TYPES.DbConnetion)
    private readonly _dbConn: DbConnection
  ) {}

  private getCollection() {
    return this._dbConn.db.collection<UserDbObject>("users");
  }

  async getUserById(id: string): Promise<UserDbObject> {
    const user = await this.getCollection().findOne({ _id: id });

    if (!user) {
      throw new Error("invalid user id");
    }

    return user;
  }

  async insertUser(user: Omit<UserDbObject, "about" | "email">) {
    try {
      const { acknowledged, insertedId } = await this.getCollection().insertOne(
        user
      );

      if (!acknowledged) {
        throw new Error("could not create user");
      }

      return insertedId;
    } catch (e) {
      if (e instanceof MongoError && e.code == "11000") {
        throw new Error("user already exists");
      }

      throw e;
    }
  }

  async updateUser(id: string, newUser: Partial<UserDbObject>) {
    const { acknowledged, modifiedCount } =
      await this.getCollection().updateOne({ _id: id }, { $set: newUser });

    if (!acknowledged) {
      throw new Error("could not update profile");
    }

    return modifiedCount;
  }
}
