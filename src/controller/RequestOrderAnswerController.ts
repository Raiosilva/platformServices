import { Request } from "express";
import { RequestOrderAnswer } from "../entity/RequestOrderAnswer";
import { BaseController } from "./BaseController";

export class RequestOrderAnswerController extends BaseController<RequestOrderAnswer> {

    constructor() {
        super(RequestOrderAnswer, false);
    }

    async all(request: Request) {
        let { orderUid } = request.params;
        if (!orderUid)
        return { status: 400, message: 'informe o código da requisição' };
        this.repostitory.find({
            requesOrder: orderUid
        })
    }

    async save(request: Request) {
        let requestOrderAnswer = <RequestOrderAnswer>request.body;

        super.isRequired(requestOrderAnswer.answer, 'Informe a resposta da pergunta');
        super.isRequired(requestOrderAnswer.question, 'A questão precisa ser informada');
        super.isRequired(requestOrderAnswer.requesOrder, 'Informe a requisição');

        return super.save(requestOrderAnswer, request);
    }

}