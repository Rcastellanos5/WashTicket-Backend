import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database";

export class AIAuditLog extends Model<
  InferAttributes<AIAuditLog>,
  InferCreationAttributes<AIAuditLog>
> {
  declare id: CreationOptional<number>;
  declare washLocationId: number;
  declare userId: CreationOptional<number | null>;
  declare feature: string;
  declare inputSummary: Record<string, unknown>;
  declare outputSummary: Record<string, unknown>;
  declare actionTaken: CreationOptional<string | null>;
  declare confirmationRequired: CreationOptional<boolean>;
  declare confirmedBy: CreationOptional<number | null>;
  declare readonly createdAt: CreationOptional<Date>;
}

AIAuditLog.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    washLocationId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    feature: { type: DataTypes.STRING, allowNull: false },
    inputSummary: { type: DataTypes.JSONB, allowNull: false },
    outputSummary: { type: DataTypes.JSONB, allowNull: false },
    actionTaken: { type: DataTypes.STRING, allowNull: true },
    confirmationRequired: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    confirmedBy: { type: DataTypes.INTEGER, allowNull: true },
    createdAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "ai_audit_logs",
    updatedAt: false,
  },
);
