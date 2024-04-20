import { Resolvers, User } from "@/generated/types";

export const UserResolvers: Resolvers = {
  Query: {
    user: async (_, { id }, { userService }) => {
      return await userService.getUser(id);
    },
  },
  Mutation: {
    updateProfile: async (_, { input }, { userId, userService }) => {
      if (!userId) throw new Error("unauthorized");

      return await userService.updateProfile(userId, input);
    },
    changePassword: async (_, { input }, { userId, userService }) => {
      if (!userId) throw new Error("unauthorized");

      return await userService.changePassword(userId, input);
    },
  },
  User: {
    submissions: async (_) => {
      return [];
    },
  },
};
