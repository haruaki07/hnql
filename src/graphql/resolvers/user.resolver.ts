import { Resolvers, User } from "@/generated/types";

export const UserResolvers: Resolvers = {
  Query: {
    user: async (_, { id }, { userService }) => {
      return await userService.getUser(id);
    },
  },
  User: {
    submissions: async (_) => {
      return [];
    },
  },
};
