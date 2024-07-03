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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from a .env file into process.env
dotenv_1.default.config();
class Database {
    // Private constructor to prevent direct instantiation
    constructor() { }
    // Static method to get the single instance of the database connection
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Database.instance) {
                Database.instance = yield promise_1.default.createConnection({
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT || '3306', 10),
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                });
            }
            return Database.instance;
        });
    }
}
exports.Database = Database;
Database.instance = null; // Static property to hold the single instance of the database connection
