import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database";

export class Service extends Model<InferAttributes<Service>, InferCreationAttributes<Service>> {
  declare id: CreationOptional<number>;
  declare washLocationId: number;
  declare name: string;
  declare description: string;
  declare durationMinutes: number;
  declare price: string;
  declare imageUrl: CreationOptional<string | null>;
  declare active: CreationOptional<boolean>;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

Service.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    washLocationId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    durationMinutes: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    imageUrl: { type: DataTypes.TEXT, allowNull: true },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "services",
    paranoid: true,
  },
);
