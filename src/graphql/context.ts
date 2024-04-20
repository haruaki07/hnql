import { TYPES } from "@/container/types";
import { User } from "@/generated/types";
import { UserService } from "@/services";
import { inject, injectable } from "inversify";

@injectable()
export class Context {
  public user?: User;

  @inject(TYPES.UserService)
  public readonly userService!: UserService;
}
