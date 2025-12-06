import { Room } from "@/lib/hooks/useRooms";

// Backend statuses: "available" | "occupied" | "maintenance" | "unserviceable" | "disabled"
// Frontend statuses: "occupied" | "available" | "cleaning" | "maintenance"

export type FrontendRoomStatus =
  | "occupied"
  | "available"
  | "cleaning"
  | "maintenance";
export type BackendRoomStatus =
  | "available"
  | "occupied"
  | "maintenance"
  | "unserviceable"
  | "disabled";

export function mapBackendToFrontendStatus(
  backendStatus: BackendRoomStatus,
  isBooked: boolean
): FrontendRoomStatus {
  // If room is booked, it's occupied
  if (isBooked || backendStatus === "occupied") {
    return "occupied";
  }

  // Map backend statuses to frontend
  switch (backendStatus) {
    case "available":
      return "available";
    case "maintenance":
    case "unserviceable":
    case "disabled":
      return "maintenance";
    default:
      return "available";
  }
}

export function mapFrontendToBackendStatus(
  frontendStatus: FrontendRoomStatus
): BackendRoomStatus {
  switch (frontendStatus) {
    case "available":
      return "available";
    case "occupied":
      return "occupied";
    case "cleaning":
      return "available"; // Cleaning is temporary, map to available
    case "maintenance":
      return "maintenance";
    default:
      return "available";
  }
}

export function getRoomDisplayName(room: Room): string {
  const categoryMap: { [key: string]: string } = {
    standard: "Standard Room",
    deluxe: "Deluxe Room",
    suite: "Suite",
  };
  return `${categoryMap[room.category] || room.category} ${room.alphabet}${
    room.number
  }`;
}

export function formatPrice(priceInCents: number): string {
  return (priceInCents / 100).toFixed(2);
}
