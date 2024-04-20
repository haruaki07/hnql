import { Resolvers } from "@/generated/types";

export const AuthResolver: Resolvers = {
  Query: {
    me: async (_, __, { userId, userService }) => {
      if (!userId) {
        throw new Error("unauthorized");
      }

      return await userService.getUser(userId);
    },
  },
  Mutation: {
    signIn: async (_, { input }, { res, authService }) => {
      return await authService.signIn(input);
    },
    signUp: async (_, { input }, { authService }) => {
      return await authService.signUp(input);
    },
  },
};
