import { ServiceType } from "@prisma/client";

export function generateBookingNumber(): string {
  const prefix = "OSPM";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function mapMoveTypeToServiceType(moveType: string): ServiceType {
  const mapping: Record<string, ServiceType> = {
    local: ServiceType.LOCAL_MOVING,
    intercity: ServiceType.INTERCITY_MOVING,
    office: ServiceType.OFFICE_MOVING,
    vehicle: ServiceType.VEHICLE_TRANSPORT,
  };
  return mapping[moveType] || ServiceType.LOCAL_MOVING;
}

export function generateTrackingCode(): string {
  return "TRK-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}