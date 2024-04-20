import { Container } from "inversify";
import { TYPES } from "./types";
import { Context } from "@/graphql/context";
import { DbConnection } from "@/data/common/db-connection";
import { Logger, createLogger } from "@/data/common/logger";

const container = new Container();

container.bind<Context>(TYPES.Context).to(Context);
container.bind<DbConnection>(TYPES.DbConnetion).to(DbConnection);
container.bind<Logger>(TYPES.Logger).toDynamicValue((_ctx) => {
  return createLogger();
});

export default container;
