import { Resolvers, User } from "@/generated/types";

export const UserResolvers: Resolvers = {
  Query: {
    user: async (_, { id }) => {
      return {
        id,
        created: new Date(),
        karma: 1,
      } as User;
    },
  },
  User: {
    submissions: async (_) => {
      return [];
    },
  },
};
