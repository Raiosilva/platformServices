import { Request } from "express";
import { getRepository } from "typeorm";
import { Category } from "../entity/Category";
import { SubCategory } from "../entity/SubCategory";
import { BaseController } from "./BaseController";

export class CategoryController extends BaseController<Category> {

    private _subCategoryRepository = getRepository(SubCategory);

    constructor() {
        super(Category);
    }

    async save(request: Request) {
        let category = <Category>request.body;
        super.isRequired(category.name, 'O nome da categoria é Obrigatório');
        return super.save(category, request);
    }

    getAllSubCategorys(request: Request) {
        const { id: categoryId } = request.params;
        return this._subCategoryRepository.find({
            where: {
                category: categoryId,
                deleted: false
            }
        })
    }
}