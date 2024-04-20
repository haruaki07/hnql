import { TYPES } from "@/container/types";
import { DbConnection } from "@/data/common/db-connection";
import { UserDbObject } from "@/generated/types";
import { inject, injectable } from "inversify";

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
}
