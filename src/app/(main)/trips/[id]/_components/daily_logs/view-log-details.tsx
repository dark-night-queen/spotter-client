"use client";

import { useMemo } from "react";
import { Eye, Clock, LifeBuoy, Coffee, Moon, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ELDGrid } from "./eld-grid";
import { StatusTable } from "./status-table";

export function ViewLogDetails({ log }) {
  const summary = useMemo(() => {
    const totals = { DRIVING: 0, ON_DUTY: 0, OFF_DUTY: 0, SLEEPER_BERTH: 0 };

    log.status_changes.forEach((change) => {
      const duration =
        new Date(change.end_time).getTime() -
        new Date(change.start_time).getTime();
      if (totals[change.status] !== undefined) {
        totals[change.status] += duration;
      }
    });

    return totals;
  }, [log]);

  const onDutyMinutes = useMemo(
    () =>
      log.status_changes.reduce((acc, curr) => {
        if (curr.status === "ON_DUTY" || curr.status === "DRIVING") {
          const diff =
            new Date(curr.end_time).getTime() -
            new Date(curr.start_time).getTime();
          return acc + diff / 60000;
        }
        return acc;
      }, 0),
    [log],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="h-4 w-4" /> View Log
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="p-3">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold">
                Log Sheet: {log.date}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Driver: {log.driver_id || "DVI-0001"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Active Work Time: {Math.floor(onDutyMinutes / 60)}h{" "}
                {Math.round(onDutyMinutes % 60)}m
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-mono font-bold">
                {log.total_miles.toFixed(1)}
              </p>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">
                Total Miles
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-3 space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <SummaryCard
              icon={<LifeBuoy className="text-emerald-600" />}
              label="Driving"
              value={summary.DRIVING}
            />
            <SummaryCard
              icon={<Briefcase className="text-amber-500" />}
              label="On Duty"
              value={summary.ON_DUTY}
            />
            <SummaryCard
              icon={<Coffee className="text-slate-400" />}
              label="Off Duty"
              value={summary.OFF_DUTY}
            />
            <SummaryCard
              icon={<Moon className="text-indigo-400" />}
              label="Sleeper"
              value={summary.SLEEPER_BERTH}
            />
          </div>

          <div className="bg-white border rounded-xl p-4 shadow-sm overflow-hidden">
            <h3 className="text-xs font-bold uppercase text-slate-400 mb-6">
              Activity Timeline (24H)
            </h3>
            <ELDGrid statusChanges={log.status_changes} />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold flex items-center gap-2 text-slate-700">
              <Clock className="h-4 w-4" /> Detailed Duty Log
            </h3>
            <StatusTable data={log.status_changes} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SummaryCard({ icon, label, value }) {
  const hrs = Math.floor(value / 3600000);
  const mins = Math.round((value % 3600000) / 60000);
  return (
    <div className="bg-linear-to-t from-primary/5 to-card border border-slate-100/90 rounded-lg py-4 p-2 flex items-center gap-3">
      <div className="p-2 bg-white rounded-md shadow-sm">{icon}</div>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-500">
          {label}
        </p>
        <p className="text-sm font-bold font-mono">
          {hrs}h {mins}m
        </p>
      </div>
    </div>
  );
}
