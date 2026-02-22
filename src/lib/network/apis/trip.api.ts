import { get, post } from "./base.api";

interface StatusChanges {
  status: "OFF_DUTY" | "SLEEPER_BERTH" | "DRIVING" | "ON_DUTY";
  start_time: string;
  end_time: string;
  location_text: string;
  remarks: string;
}

interface DailyLogs {
  date: string;
  total_miles: number;
  status_changes: StatusChanges[];
}

interface Metrics {
  to_pickup_miles: number;
  total_miles: number;
  total_duration_hrs: number;
  to_drop_off_miles: number;
}

interface RouteGeometry {
  polyline: string[];
  start_coords: { lat: number; lng: number };
  pickup_coords: { lat: number; lng: number };
  drop_off_coords: { lat: number; lng: number };
}

interface Trip {
  id: number;
  drop_off_address: string;
  pickup_address: string;
  start_address: string;
  initial_cycle_hours: number;
  created_at: string;
  metrics: Metrics;
  route_geometry: RouteGeometry;
  daily_logs: DailyLogs[];
}

interface TripInput {
  drop_off_address: string;
  pickup_address: string;
  start_address: string;
  initial_cycle_hours: number;
}

const TripService = {
  create: (tripData: TripInput) => post("trips/", tripData),
  getAll: () => get("trips/"),
  getById: (id: string): Promise<Trip> => get(`trips/${id}/`),
};

export { TripService };
export type {
  TripInput,
  Trip,
  Metrics,
  RouteGeometry,
  DailyLogs,
  StatusChanges,
};
