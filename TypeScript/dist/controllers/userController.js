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
exports.UserController = void 0;
const userRepository_1 = require("../repository/userRepository");
const userView_1 = require("../views/userView");
const userRepository = new userRepository_1.UserRepositoryImpl;
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, name } = req.body;
            yield userRepository.create(username, password, name);
            userView_1.UserView.displayMessage(res, `User ${username} registered successfully.`);
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const user = userRepository.findByUsernameAndPassword(username, password);
            if (user) {
                // @ts-ignore
                userView_1.UserView.displayMessage(res, `Welcome ${user.username}!`);
            }
            else {
                res.status(401).json({ message: `Login failed. Please check your username and password.` });
            }
        });
    }
}
exports.UserController = UserController;
