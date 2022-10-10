import { Item } from "./Item";

export class ItemOrder {
    item: Item;
    quantity: number;
    constructor(){
        this.item = new Item()
        this.quantity = 1
    }
}