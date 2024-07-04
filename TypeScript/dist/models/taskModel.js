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
exports.TaskModel = void 0;
const db_1 = require("../database/db");
class TaskModel {
    static createTask(title, description, category, due_date, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield db_1.Database.getInstance();
            try {
                yield db.execute("INSERT INTO tasks (title, dscription, category, due_date, user)", [title, description, category, due_date, user]);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    static readTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.TaskModel = TaskModel;
