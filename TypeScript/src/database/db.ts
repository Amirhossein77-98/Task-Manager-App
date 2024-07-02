import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from a .env file into process.env
dotenv.config();

export class Database {
    private static instance: mysql.Connection | null = null; // Static property to hold the single instance of the database connection

    // Private constructor to prevent direct instantiation
    private constructor() {}

    // Static method to get the single instance of the database connection
    static async getInstance(): Promise<mysql.Connection> {
        if (!Database.instance) {
            Database.instance = await mysql.createConnection({
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '3306', 10),
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
        }
        return Database.instance;
    }
}