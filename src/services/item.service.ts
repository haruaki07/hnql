import { TYPES } from "@/container/types";
import {
  Item,
  ItemDbObject,
  ItemType,
  SubmitItemInput,
} from "@/generated/types";
import { ItemRepository } from "@/repositories/item.repository";
import { inject, injectable } from "inversify";

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
}
