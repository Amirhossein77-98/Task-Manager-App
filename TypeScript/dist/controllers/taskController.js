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
exports.TaskController = void 0;
const taskRepository_1 = require("../repository/taskRepository");
const taskView_1 = require("../views/taskView");
const userController_1 = require("./userController");
class TaskController {
    static newTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, category, due_date } = req.body;
            if (userController_1.currentUser !== null) {
                const createTaskResult = yield taskRepository_1.TaskRepository.createNewTask(title, description, category, due_date, userController_1.currentUser.username);
                if (createTaskResult) {
                    taskView_1.TaskView.displayMessage(res, 'Task created successfully.');
                }
                else {
                    taskView_1.TaskView.displayMessage(res, 'Task creation failed.');
                }
            }
            else {
                taskView_1.TaskView.displayMessage(res, 'You should login first');
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
exports.TaskController = TaskController;
