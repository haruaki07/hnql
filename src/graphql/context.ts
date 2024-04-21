import { TYPES } from "@/container/types";
import { User } from "@/generated/types";
import { AuthService, UserService } from "@/services";
import { ItemService } from "@/services/item.service";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class Context {
  public req!: Request;
  public res!: Response;
  public userId?: User["id"];

  @inject(TYPES.UserService)
  public readonly userService!: UserService;

  @inject(TYPES.AuthService)
  public readonly authService!: AuthService;

  @inject(TYPES.ItemService)
  public readonly itemService!: ItemService;
}
