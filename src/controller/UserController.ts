import { Request } from "express";
import {User} from "../entity/User";
import { BaseController } from "./BaseController";
import * as md5 from 'md5';
import { sign } from 'jsonwebtoken';
import config from '../config/config';
import { FileHelper } from "../helpers/fileHelper";

export class UserController extends BaseController<User> {

    constructor() {
        super(User);
    }

    async auth(request: Request) {
        if (this.checkNotPermission(request)) return this.errorrRoot;

        let { email, password } = request.body;
        if (!email || !password) 
            return { status: 400, message: 'Informe o email e a senha para efetuar o login' };

        let user = await this.repostitory.findOne({ email: email, password: md5(password) });
        if (user) {
            let _payload = {
                uid: user.uid,
                firstName: user.firstName,
                email: user.email,
                photo: user.photo
            }
            return {
                status: 200,
                message: {
                    user: _payload,
                    token: sign({
                        ..._payload,
                        tm: new Date().getTime()
                    }, config.secretyKey)
                }
            }
        } else
            return { status: 404, message: 'E-mail ou senha inválidos' }
    }

    async createUser(request: Request) {
        let {firstName, photo, email, isRoot, password, confirm_password } = request.body;
        super.isRequired(firstName, 'Informe o nome');
        super.isRequired(photo, 'Informe a photo');
        super.isRequired(password, 'Informe a senha');
        super.isRequired(confirm_password, 'Informe a confirmação da senha');
        super.isRequired(email, 'Informe o email');

        let _user = new User();
        _user.firstName = firstName;
        _user.photo = photo;
        _user.email = email;

        if (_user.photo) {
            let pictureCreatedResult = await FileHelper.writePicture(_user.photo)
            if (pictureCreatedResult) 
                _user.photo = pictureCreatedResult
        }

        if (password != confirm_password)
            return {
                status: 400,
                errors: ['A senha  e a confirmação de senha são diferentes']
            }

            if (password)
                _user.password = md5(password);

        _user.isRoot = isRoot;
        return super.save(_user, request, true);
    }

    async save(request: Request) {
        let user = <User>request.body;
        // let {name, photo, email, isRoot, password } = request.body;
        super.isRequired(user.firstName, 'O nome do usuário é Obrigatório');
        super.isRequired(user.photo, 'A foto do usuário é Obrigatória');

        if (user.photo) {
            let pictureCreatedResult = await FileHelper.writePicture(user.photo)
            if (pictureCreatedResult) 
                user.photo = pictureCreatedResult
        }

        return super.save(user, request);
    }

}