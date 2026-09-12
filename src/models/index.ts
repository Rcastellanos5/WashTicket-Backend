import { AIAuditLog } from "./AIAuditLog";
import { AvailabilityBlock } from "./AvailabilityBlock";
import { Category } from "./Category";
import { EmailVerificationToken } from "./EmailVerificationToken";
import { Notification } from "./Notification";
import { PasswordResetToken } from "./PasswordResetToken";
import { Product } from "./Product";
import { Reservation } from "./Reservation";
import { ReservationHistory } from "./ReservationHistory";
import { Service } from "./Service";
import { User } from "./User";
import { Vehicle } from "./Vehicle";
import { WashLocation } from "./WashLocation";

WashLocation.hasMany(User, { foreignKey: "washLocationId" });
User.belongsTo(WashLocation, { foreignKey: "washLocationId" });

WashLocation.hasMany(Service, { foreignKey: "washLocationId" });
Service.belongsTo(WashLocation, { foreignKey: "washLocationId" });

WashLocation.hasMany(Category, { foreignKey: "washLocationId" });
Category.belongsTo(WashLocation, { foreignKey: "washLocationId" });

WashLocation.hasMany(Product, { foreignKey: "washLocationId" });
Product.belongsTo(WashLocation, { foreignKey: "washLocationId" });

WashLocation.hasMany(Reservation, { foreignKey: "washLocationId" });
Reservation.belongsTo(WashLocation, { foreignKey: "washLocationId" });

WashLocation.hasMany(AvailabilityBlock, { foreignKey: "washLocationId" });
AvailabilityBlock.belongsTo(WashLocation, { foreignKey: "washLocationId" });

WashLocation.hasMany(AIAuditLog, { foreignKey: "washLocationId" });
AIAuditLog.belongsTo(WashLocation, { foreignKey: "washLocationId" });

User.hasMany(Vehicle, { foreignKey: "userId" });
Vehicle.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Reservation, { foreignKey: "userId", as: "reservations" });
Reservation.belongsTo(User, { foreignKey: "userId", as: "customer" });

User.hasMany(Reservation, { foreignKey: "employeeId", as: "assignedReservations" });
Reservation.belongsTo(User, { foreignKey: "employeeId", as: "employee" });

User.hasMany(EmailVerificationToken, { foreignKey: "userId" });
EmailVerificationToken.belongsTo(User, { foreignKey: "userId" });

User.hasMany(PasswordResetToken, { foreignKey: "userId" });
PasswordResetToken.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Notification, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "userId" });

User.hasMany(AvailabilityBlock, { foreignKey: "createdBy", as: "availabilityBlocks" });
AvailabilityBlock.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

User.hasMany(ReservationHistory, { foreignKey: "userId" });
ReservationHistory.belongsTo(User, { foreignKey: "userId" });

User.hasMany(AIAuditLog, { foreignKey: "userId", as: "aiAuditLogs" });
AIAuditLog.belongsTo(User, { foreignKey: "userId", as: "actor" });

User.hasMany(AIAuditLog, { foreignKey: "confirmedBy", as: "confirmedAiAuditLogs" });
AIAuditLog.belongsTo(User, { foreignKey: "confirmedBy", as: "confirmer" });

Service.hasMany(Reservation, { foreignKey: "serviceId" });
Reservation.belongsTo(Service, { foreignKey: "serviceId" });

Vehicle.hasMany(Reservation, { foreignKey: "vehicleId" });
Reservation.belongsTo(Vehicle, { foreignKey: "vehicleId" });

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

Reservation.hasMany(ReservationHistory, { foreignKey: "reservationId" });
ReservationHistory.belongsTo(Reservation, { foreignKey: "reservationId" });

export {
  AIAuditLog,
  AvailabilityBlock,
  Category,
  EmailVerificationToken,
  Notification,
  PasswordResetToken,
  Product,
  Reservation,
  ReservationHistory,
  Service,
  User,
  Vehicle,
  WashLocation,
};
