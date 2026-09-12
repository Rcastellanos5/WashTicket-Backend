import { sequelize } from "../config/database";
import { resetIntegrationDatabase, setupIntegrationDatabase } from "../test/integrationSetup";
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
import "./index";

describe("modelos y asociaciones", () => {
  beforeAll(async () => {
    await setupIntegrationDatabase();
  }, 30000);

  beforeEach(async () => {
    await resetIntegrationDatabase();
  });

  it("persiste el contrato de datos del Technical Design", async () => {
    const location = await WashLocation.create({
      name: "Lavadero de prueba",
      address: "Calle 1",
      phone: "3000000000",
      email: "test@washticket.local",
      timezone: "America/Bogota",
      modificationLimitMinutes: 60,
      cancellationLimitMinutes: 60,
      active: true,
    });

    const customer = await User.create({
      washLocationId: location.id,
      name: "Cliente",
      email: "cliente@test.local",
      passwordHash: "hash-placeholder",
      role: "CLIENT",
      emailVerified: false,
      active: true,
      failedLoginCount: 0,
      lockedUntil: null,
    });

    const employee = await User.create({
      washLocationId: location.id,
      name: "Empleado",
      email: "empleado@test.local",
      passwordHash: "hash-placeholder",
      role: "EMPLOYEE",
      emailVerified: true,
      active: true,
      failedLoginCount: 0,
      lockedUntil: null,
    });

    const vehicle = await Vehicle.create({
      userId: customer.id,
      plate: "ABC123",
      brand: "Toyota",
      model: "Corolla",
      color: "Blanco",
    });

    const service = await Service.create({
      washLocationId: location.id,
      name: "Lavado básico",
      description: "Lavado exterior",
      durationMinutes: 30,
      price: "25000.00",
      imageUrl: null,
      active: true,
    });

    const category = await Category.create({
      washLocationId: location.id,
      name: "Cera",
      active: true,
    });

    const product = await Product.create({
      washLocationId: location.id,
      categoryId: category.id,
      name: "Cera líquida",
      description: "Cera de mantenimiento",
      price: "18000.00",
      stock: 10,
      minimumStock: 2,
      imageUrl: null,
      active: true,
    });

    const reservation = await Reservation.create({
      washLocationId: location.id,
      userId: customer.id,
      vehicleId: vehicle.id,
      serviceId: service.id,
      employeeId: employee.id,
      startAt: new Date("2026-09-12T13:00:00.000Z"),
      endAt: new Date("2026-09-12T13:30:00.000Z"),
      reservationStatus: "PENDING",
      serviceStatus: "PENDING",
      servicePrice: "25000.00",
      amountCharged: null,
      tipAmount: "0.00",
      totalAmount: null,
    });

    await EmailVerificationToken.create({
      userId: customer.id,
      tokenHash: "verify-hash",
      expiresAt: new Date("2026-09-12T14:00:00.000Z"),
      usedAt: null,
    });

    await PasswordResetToken.create({
      userId: customer.id,
      tokenHash: "reset-hash",
      expiresAt: new Date("2026-09-12T14:00:00.000Z"),
      usedAt: null,
    });

    await Notification.create({
      userId: customer.id,
      type: "RESERVATION_CREATED",
      title: "Reserva creada",
      message: "Tu reserva quedó registrada",
      read: false,
    });

    await AvailabilityBlock.create({
      washLocationId: location.id,
      startAt: new Date("2026-09-13T13:00:00.000Z"),
      endAt: new Date("2026-09-13T15:00:00.000Z"),
      reason: "Mantenimiento",
      createdBy: employee.id,
    });

    await ReservationHistory.create({
      reservationId: reservation.id,
      userId: customer.id,
      action: "CREATED",
      previousValue: null,
      newValue: { reservationStatus: "PENDING" },
    });

    await AIAuditLog.create({
      washLocationId: location.id,
      userId: employee.id,
      feature: "recommend-schedule",
      inputSummary: { day: "saturday" },
      outputSummary: { slots: 2 },
      actionTaken: null,
      confirmationRequired: false,
      confirmedBy: null,
    });

    const storedCustomer = await User.findByPk(customer.id);
    const storedReservation = await Reservation.findByPk(reservation.id, {
      include: [
        { association: "customer" },
        { association: "employee" },
        Service,
        Vehicle,
        WashLocation,
      ],
    });
    const storedProduct = await Product.findByPk(product.id, { include: [Category] });

    expect(storedCustomer?.role).toBe("CLIENT");
    expect(storedCustomer?.failedLoginCount).toBe(0);
    expect(storedCustomer?.lockedUntil).toBeNull();
    expect(storedReservation?.servicePrice).toBe("25000.00");
    expect(storedReservation?.get("customer")).toMatchObject({ email: "cliente@test.local" });
    expect(storedReservation?.get("employee")).toMatchObject({ role: "EMPLOYEE" });
    expect(storedProduct?.get("Category")).toMatchObject({ name: "Cera" });
    expect(sequelize.getDatabaseName()).not.toBe("washticket");
  });
});
