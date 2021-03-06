import { Request } from "express";
import { Customer } from "../entity/Customer";
import { BaseController } from "./BaseController";
import * as md5 from 'md5';
import { ServiceProvider } from "../entity/ServiceProvider";
import { FileHelper } from "../helpers/fileHelper";

export class ServiceProviderController extends BaseController<ServiceProvider> {

    constructor() {
        super(ServiceProvider, true);
    }

    private validationDefault(serviceProvider: ServiceProvider): void {
        super.isRequired(serviceProvider.name, 'O nome Obrigatório');
        super.isRequired(serviceProvider.photo, 'A foto é Obrigatória');
        super.isRequired(serviceProvider.email, 'O E-mail é obrigatório');
        super.isRequired(serviceProvider.phone, 'Telefone é obrigatório');
        super.isRequired(serviceProvider.categoriesCare, 'Informe as categorias atendidas');
        super.isRequired(serviceProvider.citiesCare, 'Informe as cidades atendidas');
        super.isRequired(serviceProvider.zipCode, 'Informe o seu CEP');
        super.isRequired(serviceProvider.state, 'Informe o seu estado');
    }

    async save(request: Request) {
        const serviceProvider = <ServiceProvider>request.body;
        const { confirmPassword } = request.body;

        this.validationDefault(serviceProvider);

        if (serviceProvider.photo) {
            let pictureCreatedResult = await FileHelper.writePicture(serviceProvider.photo)
            if (pictureCreatedResult) 
                serviceProvider.photo = pictureCreatedResult
        }

        if (!serviceProvider.uid) {
            super.isRequired(serviceProvider.password, 'A é obrigatório');
            super.isRequired(confirmPassword, 'A confirmação da senha é obrigatório');
            super.isTrue((serviceProvider.password != confirmPassword), 'A senha e a confirmação de senha estão diferentes');
        } else {
            delete serviceProvider.password;
        }

        return super.save(serviceProvider, request);
    }

    async createServiceProvider(request: Request) {
        let serviceProvider = <ServiceProvider>request.body;
        let { confirmPassword } = request.body;

        this.validationDefault(serviceProvider);
        super.isRequired(serviceProvider.password, 'Informe sua senha');
        super.isRequired(confirmPassword, 'A confirmação da senha é obrigatório');
        super.isTrue((serviceProvider.password != confirmPassword), 'A senha e a confirmação de senha estão diferentes');

        if (serviceProvider.photo) {
            let pictureCreatedResult = await FileHelper.writePicture(serviceProvider.photo)
            if (pictureCreatedResult) 
                serviceProvider.photo = pictureCreatedResult
        }
        
        if (serviceProvider.password)
            serviceProvider.password = md5(serviceProvider.password);
        
        return super.save(serviceProvider, request, true);
    }

}