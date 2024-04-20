import { TYPES } from "@/container/types";
import {
  ChangePasswordInput,
  UpdateProfileInput,
  User,
} from "@/generated/types";
import { UserRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import argon2 from "argon2";

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

  async updateProfile(id: string, input: UpdateProfileInput): Promise<User> {
    await this._userRepo.updateUser(id, input);
    const user = await this._userRepo.getUserById(id);

    return { id: user._id, ...user };
  }

  async changePassword(id: string, input: ChangePasswordInput) {
    const user = await this._userRepo.getUserById(id);

    const valid = await argon2.verify(user.password, input.old_password);
    if (!valid) throw new Error("invalid old password");

    await this._userRepo.updateUser(id, {
      password: await argon2.hash(input.new_password),
    });

    return true;
  }
}
