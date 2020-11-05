import { Request } from "express";
import { SubCategory } from "../entity/SubCategory";
import { BaseController } from "./BaseController";

export class SubCategoryController extends BaseController<SubCategory> {

    constructor() {
        super(SubCategory);
    }

    async save(request: Request) {
        let subCategory = <SubCategory>request.body;
        super.isRequired(subCategory.name, 'O nome da SubCategoria é Obrigatória');
        super.isRequired(subCategory.category, 'A Categoria é Obrigatória');
        super.isRequired(subCategory.cost, 'O custo é Obrigatório');
        // super.isTrue(isNaN(subCategory.cost), 'O custo deve ser um número');
        // super.isTrue(subCategory.cost <= 0, 'O custo deve ser maior que zero');
        return super.save(subCategory);
    }

}