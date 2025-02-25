"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const userModel_1 = require("../models/userModel");
class UserRepositoryImpl {
    create(username, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userModel_1.UserModel.create(username, password, name);
        });
    }
    findByUsernameAndPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.UserModel.findByUsernameAndPassword(username, password);
            return user;
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
