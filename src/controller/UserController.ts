import { Request } from "express";
import {User} from "../entity/User";
import { BaseController } from "./BaseController";

export class UserController extends BaseController<User> {

    constructor() {
        super(User);
    }

    async createUser(request: Request) {
        let {name, photo, email, isRoot, password, confirm_password } = request.body;
        super.isRequired(name, 'Informe o nome');
        super.isRequired(photo, 'Informe a photo');
        super.isRequired(password, 'Informe a senha');
        super.isRequired(confirm_password, 'Informe a confirmação da senha');
        super.isRequired(email, 'Informe o email');
        let _user = new User();
        _user.name = name;
        _user.photo = photo;
        _user.email = email;
        _user.password = password;
        _user.isRoot = isRoot;
        return super.save(_user);
    }

    async save(request: Request) {
        let user = <User>request.body;
        // let {name, photo, email, isRoot, password } = request.body;
        super.isRequired(user.name, 'O nome do usuário é Obrigatório');
        super.isRequired(user.photo, 'A foto do usuário é Obrigatória');
        return super.save(user);
    }

}