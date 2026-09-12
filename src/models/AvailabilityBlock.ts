import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database";

export class AvailabilityBlock extends Model<
  InferAttributes<AvailabilityBlock>,
  InferCreationAttributes<AvailabilityBlock>
> {
  declare id: CreationOptional<number>;
  declare washLocationId: number;
  declare startAt: Date;
  declare endAt: Date;
  declare reason: string;
  declare createdBy: number;
  declare readonly createdAt: CreationOptional<Date>;
}

AvailabilityBlock.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    washLocationId: { type: DataTypes.INTEGER, allowNull: false },
    startAt: { type: DataTypes.DATE, allowNull: false },
    endAt: { type: DataTypes.DATE, allowNull: false },
    reason: { type: DataTypes.STRING, allowNull: false },
    createdBy: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "availability_blocks",
    updatedAt: false,
  },
);
