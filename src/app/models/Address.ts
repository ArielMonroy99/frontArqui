import { UserModel } from "./User";

export class AddressModel{
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    user: UserModel;
    constructor(){
        this.user = new UserModel();
    }

}