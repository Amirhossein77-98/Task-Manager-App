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
exports.TaskRepository = void 0;
const taskModel_1 = require("../models/taskModel");
class TaskRepository {
    static createNewTask(title, description, category, due_date, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const createTaskResult = yield taskModel_1.TaskModel.createTask(title, description, category, due_date, username);
            return createTaskResult;
        });
    }
}
exports.TaskRepository = TaskRepository;
