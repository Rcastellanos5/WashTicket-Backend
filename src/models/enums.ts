export const USER_ROLES = ["CLIENT", "EMPLOYEE", "ADMIN"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const RESERVATION_STATUSES = ["PENDING", "CONFIRMED", "CANCELLED", "NO_SHOW"] as const;
export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export const SERVICE_STATUSES = ["PENDING", "IN_PROGRESS", "COMPLETED"] as const;
export type ServiceStatus = (typeof SERVICE_STATUSES)[number];
