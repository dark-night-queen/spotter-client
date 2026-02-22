import { MapPin, Route } from "lucide-react";
import { Trip } from "@/lib/network/apis/trip.api";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ViewLogDetails } from "./view-log-details";

export function DailyLogs({
  trip,
  isDrawer = false,
}: {
  trip: Trip;
  isDrawer?: boolean;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2
          className={`${isDrawer ? "uppercase text-muted-foreground" : "text-xl"} font-semibold tracking-tight`}
        >
          Daily Log Sheets
        </h2>
        <Badge variant="outline" className="font-mono">
          {trip.daily_logs.length} Days
        </Badge>
      </div>

      <div className="grid gap-3">
        {trip.daily_logs.map((log) => (
          <Card
            key={log.date}
            className="p-4 bg-linear-to-t from-primary/8 to-card"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 p-2.5 rounded-lg">
                  <Route className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{log.date}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{log.status_changes.length} Status Changes</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                {!isDrawer && (
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {log.total_miles.toFixed(1)} mi
                    </p>
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">
                      Distance
                    </p>
                  </div>
                )}
                <ViewLogDetails log={log} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
