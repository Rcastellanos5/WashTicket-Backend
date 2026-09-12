import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database";
import {
  RESERVATION_STATUSES,
  SERVICE_STATUSES,
  type ReservationStatus,
  type ServiceStatus,
} from "./enums";

export class Reservation extends Model<
  InferAttributes<Reservation>,
  InferCreationAttributes<Reservation>
> {
  declare id: CreationOptional<number>;
  declare washLocationId: number;
  declare userId: number;
  declare vehicleId: number;
  declare serviceId: number;
  declare employeeId: CreationOptional<number | null>;
  declare startAt: Date;
  declare endAt: Date;
  declare reservationStatus: CreationOptional<ReservationStatus>;
  declare serviceStatus: CreationOptional<ServiceStatus>;
  declare servicePrice: string;
  declare amountCharged: CreationOptional<string | null>;
  declare tipAmount: CreationOptional<string>;
  declare totalAmount: CreationOptional<string | null>;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

Reservation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    washLocationId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    vehicleId: { type: DataTypes.INTEGER, allowNull: false },
    serviceId: { type: DataTypes.INTEGER, allowNull: false },
    employeeId: { type: DataTypes.INTEGER, allowNull: true },
    startAt: { type: DataTypes.DATE, allowNull: false },
    endAt: { type: DataTypes.DATE, allowNull: false },
    reservationStatus: {
      type: DataTypes.ENUM(...RESERVATION_STATUSES),
      allowNull: false,
      defaultValue: "PENDING",
    },
    serviceStatus: {
      type: DataTypes.ENUM(...SERVICE_STATUSES),
      allowNull: false,
      defaultValue: "PENDING",
    },
    servicePrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    amountCharged: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
    tipAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    totalAmount: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "reservations",
    paranoid: true,
    indexes: [
      { fields: ["wash_location_id", "start_at", "end_at"] },
      { fields: ["wash_location_id", "reservation_status", "start_at"] },
      { fields: ["employee_id", "start_at"] },
    ],
  },
);
