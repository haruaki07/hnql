import { User } from "@/generated/types";
import { injectable } from "inversify";

@injectable()
export class Context {
  public user?: User;
}
