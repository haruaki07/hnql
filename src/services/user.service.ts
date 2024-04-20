import { TYPES } from "@/container/types";
import { User } from "@/generated/types";
import { UserRepository } from "@/repositories";
import { inject, injectable } from "inversify";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepo: UserRepository
  ) {}

  async getUser(id: string): Promise<User> {
    const user = await this._userRepo.getUserById(id);
    return {
      id: user._id,
      ...user,
    };
  }
}
