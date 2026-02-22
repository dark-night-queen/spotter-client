import { IconFlag, IconLocationFilled, IconMapPin } from "@tabler/icons-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trip } from "@/lib/network/apis/trip.api";

export function RouteDetails({ trip }: { trip: Trip }) {
  const { start_address, pickup_address, drop_off_address, metrics } = trip;

  return (
    <Card className="bg-linear-to-t from-primary/5 to-card">
      <CardHeader>
        <h3 className="font-semibold">Route Overview</h3>
      </CardHeader>

      <CardContent>
        <div className="relative">
          <div className="absolute left-3.75 top-2 bottom-2 w-0.5 bg-slate-200" />

          <div className="space-y-8">
            {/* Start / Current */}
            <div className="relative flex items-start gap-4">
              <div className="flex-none w-8 flex justify-center pt-1 z-10">
                <div className="bg-white ring-2 ring-slate-100 rounded-full p-1.5 shadow-sm">
                  <IconLocationFilled size={14} className="text-slate-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Start / Current
                </p>
                <p className="text-sm font-medium text-slate-700 leading-snug mt-0.5 truncate">
                  {start_address}
                </p>
                <p className="text-[11px] font-medium text-slate-500 mt-1">
                  To Pickup:{" "}
                  <span className="text-slate-900">
                    {metrics.to_pickup_miles} mi
                  </span>
                </p>
              </div>
            </div>

            {/* Pickup */}
            <div className="relative flex items-start gap-4">
              <div className="flex-none w-8 flex justify-center pt-1 z-10">
                <div className="bg-white ring-2 ring-indigo-100 rounded-full p-1.5 shadow-sm">
                  <IconMapPin size={14} className="text-indigo-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-indigo-500 uppercase font-bold tracking-wider">
                  Pickup
                </p>
                <p className="text-sm font-medium text-slate-700 leading-snug mt-0.5 truncate">
                  {pickup_address}
                </p>
              </div>
            </div>

            {/* Destination */}
            <div className="relative flex items-start gap-4">
              <div className="flex-none w-8 flex justify-center pt-1 z-10">
                <div className="bg-white ring-2 ring-emerald-100 rounded-full p-1.5 shadow-sm">
                  <IconFlag
                    size={14}
                    className="text-emerald-600 fill-emerald-50"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider">
                  Destination
                </p>
                <p className="text-sm font-medium text-slate-700 leading-snug mt-0.5 truncate">
                  {drop_off_address}
                </p>
                <p className="text-[11px] font-semibold text-emerald-600 mt-1">
                  Total Trip: {metrics.total_miles} mi
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-slate-200" />

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">
              Estimated Drive
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <p className="text-2xl font-bold">{metrics.total_duration_hrs}</p>
              <span className="text-sm font-medium text-slate-500">hrs</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight truncate">
              Est. Fuel Consumption
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <p className="text-2xl font-bold">
                {(metrics.total_miles / 6.5).toFixed(1)}
              </p>
              <span className="text-sm font-medium text-slate-500">gal</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
