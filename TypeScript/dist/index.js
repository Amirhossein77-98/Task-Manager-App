"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const userController_1 = require("./controllers/userController");
const app = (0, express_1.default)();
const port = 3000;
// Middlewares
app.use((0, body_parser_1.json)());
app.use(express_1.default.static('public'));
// Routes
app.post('/register', userController_1.UserController.register);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
