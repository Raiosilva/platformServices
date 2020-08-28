"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BaseEntity = void 0;
var typeorm_1 = require("typeorm");
var BaseEntity = /** @class */ (function () {
    function BaseEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], BaseEntity.prototype, "uid");
    __decorate([
        typeorm_1.Column({ "default": false })
    ], BaseEntity.prototype, "isRoot");
    __decorate([
        typeorm_1.Column({ "default": true })
    ], BaseEntity.prototype, "active");
    __decorate([
        typeorm_1.Column({ "default": false })
    ], BaseEntity.prototype, "deleted");
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp' })
    ], BaseEntity.prototype, "creatAt");
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'timestamp' })
    ], BaseEntity.prototype, "updateAt");
    return BaseEntity;
}());
exports.BaseEntity = BaseEntity;
