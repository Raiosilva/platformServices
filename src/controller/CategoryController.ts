import { Request } from "express";
import { Category } from "../entity/Category";
import { BaseController } from "./BaseController";

export class CategoryController extends BaseController<Category> {

    constructor() {
        super(Category);
    }

    async save(request: Request) {
        let category = <Category>request.body;
        super.isRequired(category.name, 'O nome da categoria é Obrigatório');
        return super.save(category);
    }

}