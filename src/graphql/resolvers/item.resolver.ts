import { ItemType, Resolvers } from "@/generated/types";

export const ItemResolver: Resolvers = {
  Query: {
    news: async (_, { limit }, { itemService }) => {
      return await itemService.getNewsItem(limit ?? 30);
    },
  },
  Mutation: {
    submitItem: async (_, { input }, { itemService, userId }) => {
      if (!userId) {
        throw new Error("unauthorized");
      }

      return await itemService.submitItem(userId, input, ItemType.Story);
    },
  },
};
