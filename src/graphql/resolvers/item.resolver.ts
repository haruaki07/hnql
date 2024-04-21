import { ItemType, Resolvers } from "@/generated/types";

export const ItemResolver: Resolvers = {
  Mutation: {
    submitItem: async (_, { input }, { itemService, userId }) => {
      if (!userId) {
        throw new Error("unauthorized");
      }

      return await itemService.submitItem(userId, input, ItemType.Story);
    },
  },
};
