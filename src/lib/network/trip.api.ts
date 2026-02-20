import { get, post } from "./base.api";

interface StatusChanges {
  status: string;
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

interface Trip {
  id: number;
  dropoff_location: string;
  pickup_location: string;
  current_location: string;
  initial_cycle_hours: number;
  created_at: string;
  daily_logs: DailyLogs[];
}

interface TripInput {
  dropoff_location: string;
  pickup_location: string;
  current_location: string;
  initial_cycle_hours: number;
}

const TripService = {
  create: (tripData: TripInput) => post("/trips/", tripData),
  getAll: () => get("/trips/"),
  getById: (id: string) => get(`/trips/${id}/`),
};

export { TripService };
export type { TripInput, Trip };
