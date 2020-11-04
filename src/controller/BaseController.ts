import {getRepository, Repository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Notifications } from "../entity/Notifications";
import { request } from "http";

export abstract class BaseController<T> extends Notifications {

    private repository: Repository<T>;

    constructor(entity: any) {
        super();
        this.repository = getRepository<T>(entity);
    }

    async all() {
        return this.repository.find({
            where: {
                deleted: false,
            }
        });
    }

    async one(request: Request) {
        return this.repository.findOne(request.params.id);
    }

    async save(model: any) {

        if (model.uid) {
            let _modelInDB = await this.repository.findOne(model.uid);
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

        let uid = request.params.id;
        let model: any = await this.repository.findOne(uid);
        if (model) {
            model.deleted = true;
        }
        return await this.repository.save(model);
    }

    get repostitory(): Repository<T> {
        return this.repository;
    }

}