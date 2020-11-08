import { Request } from "express";
import { RequestStatus } from "../entity/enum/RequestStatus";
import { RequesOrder } from "../entity/RequesOrder";
import { BaseController } from "./BaseController";

export class RequestController extends BaseController<RequesOrder> {

    constructor() {
        super(RequesOrder, false);
    }

    async save(request: Request) {
        let requesOrder = <RequesOrder>request.body;
        
        super.isRequired(requesOrder.title, 'Informe o titulo do seu pedido');
        super.isRequired(requesOrder.description, 'Informe o que precisa');
        super.isRequired(requesOrder.customer, 'Preciso saber quem é você');
        super.isRequired(requesOrder.longlat, 'Preciso saberonde você está');

        if (!requesOrder.uid)
            requesOrder.statusOrder = RequestStatus.pending;

        return super.save(requesOrder, request);
    }

}