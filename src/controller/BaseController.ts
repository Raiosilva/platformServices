import { getRepository, Repository } from "typeorm";
import { Request } from "express";
import { Notifications } from "../entity/Notifications";

export abstract class BaseController<T> extends Notifications {

    private repository: Repository<T>;
    private onlyRootController: boolean = false;
    public errorrRoot: any = {
        status: 401,
        errors: [ 'Você não está autoriado a executar essa funcinalidade!' ]
    }

    constructor(entity: any, onlyRoot: boolean = false) {
        super();
        this.repository = getRepository<T>(entity);
        this.onlyRootController = onlyRoot;

    }

    public checkNotPermission(request: Request) {
        // return (this.onlyRootController && !request.IsRoot);
        return false;
    }

    async all(request: Request) { 

        if (this.checkNotPermission(request)) return this.errorrRoot;

        return await this.repository.find({
            where: {
                deleted: false,
            }
        });
    }

    async one(request: Request) {
        if (this.checkNotPermission(request)) return this.errorrRoot;
        const uid = request.params.id as string;
        // const id = <String>request.params.id
        return this.repository.findOne(uid);
    }

    async save(model: any, request: Request, ignorePermissions: boolean = false) {
        if (!ignorePermissions)
            if (this.checkNotPermission(request)) return this.errorrRoot;

        if (model.uid) {
            
            delete model['createAt'];
            delete model['updateAt'];
            delete model['deleted'];

            const uid = model.uid as string;

            let _modelInDB = await this.repository.findOne(uid);
            if (_modelInDB) {
                Object.assign(_modelInDB, model);
            }
        }

        if (this.valid())
            return await this.repository.save(model);
        else
            return {
                status: 400,
                errors: this.notifications
            }
    }

    async update(request: Request) {
        if (this.checkNotPermission(request)) return this.errorrRoot;

        let uid = request.params.id;
        let model: any = await this.repository.findOne(uid);

        if (model) {            
                return this.repository.save(model);
            } else
                return {
                    status: 400,
                    errors: this.notifications
                }
    }

    async remove(request: Request) {
        this.checkNotPermission(request);

        let uid = request.params.id as string;
        let model: any = await this.repository.findOne(uid);
        if (model) {
            model.deleted = true;
            return await this.repository.save(model);
        } else {
            return {
                status: 404,
                errors: [
                    'Item não encontrado no banco de dados.'
                ]
            }
        }
    }

    get repostitory(): Repository<T> {
        return this.repository;
    }

}