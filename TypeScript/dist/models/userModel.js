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
exports.UserModel = void 0;
const db_1 = require("../database/db");
class UserModel {
    static create(username, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield db_1.Database.getInstance();
            yield db.execute(`CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            PRIMARY KEY (username)
            );`);
            yield db.execute("INSERT INTO users (username, password, name) VALUES (?, ?, ?)", [username, password, name]);
        });
    }
    ;
    static findByUsernameAndPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield db_1.Database.getInstance();
            const [rows] = yield db.execute("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
            const users = rows;
            return users.length > 0 ? users[0] : null;
        });
    }
    ;
}
exports.UserModel = UserModel;
