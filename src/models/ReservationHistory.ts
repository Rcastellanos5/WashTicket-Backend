import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database";

export class ReservationHistory extends Model<
  InferAttributes<ReservationHistory>,
  InferCreationAttributes<ReservationHistory>
> {
  declare id: CreationOptional<number>;
  declare reservationId: number;
  declare userId: number;
  declare action: string;
  declare previousValue: CreationOptional<Record<string, unknown> | null>;
  declare newValue: CreationOptional<Record<string, unknown> | null>;
  declare readonly createdAt: CreationOptional<Date>;
}

ReservationHistory.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    reservationId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    previousValue: { type: DataTypes.JSONB, allowNull: true },
    newValue: { type: DataTypes.JSONB, allowNull: true },
    createdAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "reservation_history",
    updatedAt: false,
  },
);
