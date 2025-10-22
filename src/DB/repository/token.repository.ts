import { Injectable } from "@nestjs/common";
import { DatabaseRepository } from "./database.repository";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Token, TokenDocument } from "../model";


@Injectable()
export class TokenRepository extends DatabaseRepository<Token>{
    constructor(@InjectModel(Token.name) protected override readonly model:Model<TokenDocument>){
      super(model)
    }
}