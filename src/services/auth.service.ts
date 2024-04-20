import { TYPES } from "@/container/types";
import { Credentials, SignInInput, SignUpInput, User } from "@/generated/types";
import { UserRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import argon2 from "argon2";
import { sign } from "jsonwebtoken";
import { config } from "@/config";

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepo: UserRepository
  ) {}

  async signIn(input: SignInInput): Promise<Credentials> {
    try {
      const user = await this.userRepo.getUserById(input.id);

      const valid = await argon2.verify(user.password, input.password);
      if (!valid) {
        throw new Error("invalid credentials");
      }

      const access_token = sign({ uid: user._id }, config.jwt.secret, {
        expiresIn: config.jwt.expiry,
      });

      return {
        access_token,
      };
    } catch (e) {
      if (e instanceof Error && e.message === "invalid user id") {
        throw new Error("invalid credentials");
      }

      throw e;
    }
  }

  async signUp(input: SignUpInput): Promise<string> {
    return await this.userRepo.insertUser({
      _id: input.id,
      created: Date.now(),
      karma: 1,
      password: await argon2.hash(input.password),
    });
  }
}
