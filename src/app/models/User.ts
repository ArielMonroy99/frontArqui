import { RoleModel } from "./Role";

export class UserModel{
    id: number;
    username: string;
    password: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    role: RoleModel[]
    constructor(){
        
    }
}