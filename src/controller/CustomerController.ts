import { Request } from "express";
import { Customer } from "../entity/Customer";
import { BaseController } from "./BaseController";
import * as md5 from 'md5';
import { FileHelper } from "../helpers/fileHelper";

export class CustomerController extends BaseController<Customer> {

    constructor() {
        super(Customer, true);
    }

    async save(request: Request) {
        let customer = <Customer>request.body;

        super.isRequired(customer.name, 'O nome Obrigatório');
        super.isRequired(customer.photo, 'A foto é Obrigatória');
        super.isRequired(customer.email, 'O E-mail é obrigatório');
        super.isRequired(customer.phone, 'Telefone é obrigatório');

        if (customer.photo) {
            let pictureCreatedResult = await FileHelper.writePicture(customer.photo)
            if (pictureCreatedResult) 
                customer.photo = pictureCreatedResult
        }

        delete customer.password;

        return super.save(customer, request);
    }

    async createCustomer(request: Request) {
        let customer = <Customer>request.body;
        let { confirmPassword } = request.body;

        super.isRequired(customer.name, 'O nome Obrigatório');
        super.isRequired(customer.photo, 'A foto é Obrigatória');
        super.isRequired(customer.email, 'O E-mail é obrigatório');
        super.isRequired(customer.phone, 'Telefone é obrigatório');
        super.isRequired(customer.password, 'A senha é obrigatório');
        super.isRequired(request.body.confirmPassword, 'A confirmação da senha é obrigatório');
        super.isTrue((customer.password != confirmPassword), 'A senha e a confirmação de senha estão diferentes');

        if (customer.photo) {
            let pictureCreatedResult = await FileHelper.writePicture(customer.photo)
            if (pictureCreatedResult) 
                customer.photo = pictureCreatedResult
        }

        if (customer.password)
            customer.password = md5(customer.password);
        
        return super.save(customer, request, true);
    }

}