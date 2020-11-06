import { Request } from "express";
import { QuestionType } from "../entity/enum/QuestionType";
import { Question } from "../entity/Question";
import { BaseController } from "./BaseController";

export class QuestionController extends BaseController<Question> {

    constructor() {
        super(Question);
    }

    async save(request: Request) {
        let question = <Question>request.body;

        super.isRequired(question.options, 'A pergunta é Obrigatória');
        super.isRequired(question.type, 'O tipo da pergunta é Obrigatória');
        super.isRequired(question.subCategory, 'Informe a SubCategoria da questão');

        if (question.type && parseInt(question.type.toString()) === QuestionType.Select) {
            super.isRequired(question.options, 'Para o tipo Selecione, você deve informar quais são as opções.');
        }

        return super.save(question);
    }

}