import "reflect-metadata";
import {createConnection, Entity} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import { Routes } from "./routes";
import config from './config/config';
import auth from './middleware/auth';
import { type } from "os";
import { User } from "./entity/User";
import { Category } from "./entity/Category";

const port = 3000;

// create express app
const app = express();
app.use(bodyParser.json());

app.use(auth);

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        if (result instanceof Promise) {
            result.then(d => {
                if (d && d.status)
                    res.status(d.status).send(d.message || d.errors);
                    else
                        res.json(d);
            });
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    });
});

app.listen(config.port, '0.0.0.0', async () => {
    console.log(`Api initialize in port ${port}`);
    try {
        await createConnection();
        console.log('Database connected');
    } catch (error) {
        console.error('Data base not connected', error);
    }
})