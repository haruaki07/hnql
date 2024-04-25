import { TYPES } from "@/container/types";
import {
  Item,
  ItemDbObject,
  ItemType,
  Maybe,
  SubmitCommentInput,
  SubmitItemInput,
} from "@/generated/types";
import { ItemRepository } from "@/repositories/item.repository";
import { inject, injectable } from "inversify";
import { ObjectId } from "mongodb";

@injectable()
export class ItemService {
  constructor(
    @inject(TYPES.ItemRepository)
    private _itemRepo: ItemRepository
  ) {}

  async submitItem(
    userId: string,
    input: SubmitItemInput,
    type: ItemType
  ): Promise<Item> {
    const newItem: Omit<ItemDbObject, "_id"> = {
      by: userId,
      type,
      title: input.title,
      text: input.text,
      url: input.url,
      time: new Date(),
    };

    const itemId = await this._itemRepo.insertItem(newItem);
    const item = (await this._itemRepo.getItemById(
      itemId.toString()
    )) as unknown as Item;

    return {
      ...item,
      id: itemId.toString(),
    };
  }

  async getItem(id: string) {
    const item = (await this._itemRepo.getItemById(id)) as unknown as Item;

    return {
      ...item,
      id,
    };
  }

  async getNewsItem(limit: number): Promise<Item[]> {
    const items = await this._itemRepo.getItems(limit, {
      type: { $in: [ItemType.Story, ItemType.Poll] },
    });

    return items.map((item) => ({
      id: item._id.toString(),
      ...item,
      type: item.type as ItemType,
      score: 0,
      kids: null,
      parent: null,
      poll: null,
    }));
  }

  async upvoteItem(userId: string, itemId: string): Promise<number> {
    await this._itemRepo.addItemScore(userId, itemId);

    return await this._itemRepo.countItemScore(itemId);
  }

  async getItemScores(itemId: string): Promise<number> {
    return await this._itemRepo.countItemScore(itemId);
  }

  async unvoteItem(userId: string, itemId: string): Promise<number> {
    await this._itemRepo.deleteItemScore(userId, itemId);

    return await this._itemRepo.countItemScore(itemId);
  }

  async submitComment(
    userId: string,
    input: SubmitCommentInput
  ): Promise<Item> {
    // this will check if parent is exists or not
    await this._itemRepo.getItemById(input.parent);

    const itemId = await this._itemRepo.insertItem({
      by: userId,
      text: input.text,
      type: ItemType.Comment,
      parent: new ObjectId(input.parent),
      time: new Date(),
    });

    const comment = await this._itemRepo.getItemById(itemId.toString());

    return {
      ...comment,
      id: comment._id.toString(),
      type: comment.type as ItemType,
      score: 0,
      kids: null,
      parent: null,
      poll: null,
    };
  }

  async getItemDescendants(parentId: string): Promise<Maybe<number>> {
    const count = await this._itemRepo.countItems({
      parent: new ObjectId(parentId),
      type: { $not: { $eq: ItemType.Pollopt } },
    });

    return count;
  }

  /**
   * Story's comments
   */
  async getItemKids(parentId: string, limit?: Maybe<number>): Promise<Item[]> {
    const items = await this._itemRepo.getItems(limit ?? undefined, {
      parent: new ObjectId(parentId),
    });

    return items.map(
      (item: ItemDbObject) =>
        ({
          ...item,
          id: item._id.toString(),
        } as unknown as Item)
    );
  }
}
