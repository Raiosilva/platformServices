import { Request } from "express";
import { RequestStatus } from "../entity/enum/RequestStatus";
import { RequestOrder } from "../entity/RequestOrder";
import { BaseController } from "./BaseController";

export class RequestOrderController extends BaseController<RequestOrder> {

    constructor() {
        super(RequestOrder, false);
    }

    async save(request: Request) {
        let requestOrder = <RequestOrder>request.body;
        
        super.isRequired(requestOrder.title, 'Informe o titulo do seu pedido');
        super.isRequired(requestOrder.description, 'Informe o que precisa');
        super.isRequired(requestOrder.customer, 'Preciso saber quem é você');
        super.isRequired(requestOrder.longlat, 'Preciso saberonde você está');

        if (!requestOrder.uid)
            requestOrder.statusOrder = RequestStatus.pending;

        return super.save(requestOrder, request);
    }

}