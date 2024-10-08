import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!,
    {host: process.env.DB_HOST, dialect: 'mysql',}
)

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB connected.");
    } catch(err) {
        console.error('Failed to connect to db', err);
        
    }
}