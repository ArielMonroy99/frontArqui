import { Category } from "./Category";

export class Item{
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category;
    stock: number;
}