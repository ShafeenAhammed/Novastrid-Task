import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

export class ChatImport extends Model {
    public id!: number;
    public fileName!: string;
    public status!: string;
}

ChatImport.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            // defaultValue: 'pending'
        }
    },
    {sequelize, tableName: 'chat_imports'},
)