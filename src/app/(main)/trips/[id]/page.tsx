"use client";

import { useParams } from "next/navigation";
import { useTripById } from "@/lib/network/queries/trip.queries";

import { Card } from "@/components/ui/card";
import { GoogleMap } from "@/components/core/google-map";
import { Spinner } from "@/components/ui/spinner";

import { Header } from "./_components/header";
import { RouteDetails } from "./_components/route-details";
import { DailyLogs } from "./_components/daily_logs";

export default function TripDetailsPage() {
  const params = useParams();
  const { data: trip, isLoading } = useTripById(params.id as string);

  if (isLoading) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <p className="text-muted-foreground">Trip not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <Header tripId={trip.id} created_at={trip.created_at} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <Card className="overflow-hidden p-0 border-none shadow-md">
            <GoogleMap
              polylines={trip.route_geometry.polyline}
              defaultCenter={trip.route_geometry.pickup_coords}
              markers={[
                {
                  title: "Start Location",
                  position: trip.route_geometry.start_coords,
                  background: "#94a3b8",
                  glyph: "S"
                },
                {
                  title: "Pickup Location",
                  position: trip.route_geometry.pickup_coords,
                  background: "#6366f1",
                  glyph: "P"
                },
                {
                  title: "Drop-off Location",
                  position: trip.route_geometry.drop_off_coords,
                  background: "#009689",
                  glyph: "D"
                },
              ]}
            />
          </Card>

          <DailyLogs trip={trip} />
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-8">
          <RouteDetails trip={trip} />
        </div>
      </div>
    </div>
  );
}
