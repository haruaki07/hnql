import { ItemType, Resolvers } from "@/generated/types";

export const ItemResolver: Resolvers = {
  Query: {
    item: async (_, { id }, { itemService }) => {
      return await itemService.getItem(id);
    },
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
    upvoteItem: async (_, { itemId }, { userId, itemService }) => {
      if (!userId) {
        throw new Error("unauthorized");
      }

      return await itemService.upvoteItem(userId, itemId);
    },
    unvoteItem: async (_, { itemId }, { userId, itemService }) => {
      if (!userId) {
        throw new Error("unauthorized");
      }

      return await itemService.unvoteItem(userId, itemId);
    },
    submitComment: async (_, { input }, { userId, itemService }) => {
      if (!userId) {
        throw new Error("unauthorized");
      }

      return await itemService.submitComment(userId, input);
    },
  },
  Item: {
    score: async ({ id }, __, { itemService }) => {
      return await itemService.getItemScores(id);
    },
    descendants: async ({ id }, __, { itemService }) => {
      return await itemService.getItemDescendants(id);
    },
    kids: async ({ id }, { limit }, { itemService }) => {
      return await itemService.getItemKids(id, limit);
    },
  },
};
