import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database";

export class WashLocation extends Model<
  InferAttributes<WashLocation>,
  InferCreationAttributes<WashLocation>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare phone: string;
  declare email: string;
  declare timezone: CreationOptional<string>;
  declare modificationLimitMinutes: number;
  declare cancellationLimitMinutes: number;
  declare active: CreationOptional<boolean>;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

WashLocation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    timezone: { type: DataTypes.STRING, allowNull: false, defaultValue: "America/Bogota" },
    modificationLimitMinutes: { type: DataTypes.INTEGER, allowNull: false },
    cancellationLimitMinutes: { type: DataTypes.INTEGER, allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "wash_locations",
    paranoid: true,
  },
);
