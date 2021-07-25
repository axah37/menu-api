
/**
 * Data Model Interfaces
 */
import { BaseItem, Item } from "./item.interface";
import { ItemDao } from "./item-dao";

import { IItemDao } from "./item-dao";

export interface IItemService{
findAll(): Promise<Item[]>;
findItem(id:number): Promise<Item|undefined>;
createItem(newItem: BaseItem): Promise<Item|undefined>;
updateItem(id: number, itemUpdate: BaseItem): Promise<Item|undefined>;
deleteItem(id:number): Promise<null|void>;
}

export class ItemService implements IItemService{
  private itemDao: IItemDao;

  constructor(){
    this.itemDao = new ItemDao();
  }

/**
 * Service Methods
 */

  findAll(): Promise<Item[]> {
    return this.itemDao.getAllItems();
  }
  findItem(id: number): Promise<Item | undefined> {
    const item = this.itemDao.getItem(id);
    return item;
  }
  createItem(newItem: BaseItem): Promise<Item | undefined> {
    const id = new Date().valueOf();
    this.itemDao.saveItem({id, ...newItem})
    return this.findItem(id);
  }
  updateItem(id: number, itemUpdate: BaseItem): Promise<Item | undefined> {
    const result = this.itemDao.updateItem(id, {id, ...itemUpdate})
    return this.findItem(id);
  }
  deleteItem(id: number): Promise<void | null> {
    const result = this.itemDao.deleteItem(id);
    return result;
  }
  
}