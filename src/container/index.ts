import { Container } from "inversify";
import { TYPES } from "./types";
import { Context } from "@/graphql/context";

const container = new Container();

container.bind<Context>(TYPES.Context).to(Context);

export default container;
