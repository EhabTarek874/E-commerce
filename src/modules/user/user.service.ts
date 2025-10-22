import { Injectable } from "@nestjs/common";
import { IUser } from "src/common";


@Injectable()
export class UserService {
    constructor(){}
    

    profile(){
        return {message:"done"}
    }
}