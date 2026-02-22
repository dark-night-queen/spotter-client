"use client";

import { useRouter } from "next/navigation";
import { IconChevronLeft, IconCalendarWeek } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  tripId: number;
  created_at: string;
}

export function Header({ tripId, created_at }: HeaderProps) {
  const router = useRouter();

  const status = "completed";
  const displayId = tripId.toString().padStart(5, "0");
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const statusColors = {
    active: "border-blue-500 text-blue-600 bg-blue-50",
    completed: "border-emerald-500 text-emerald-600 bg-emerald-50",
    pending: "border-amber-500 text-amber-600 bg-amber-50",
  };

  return (
    <div className="space-y-4 mb-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/trips")}
        className="-ml-2 text-muted-foreground hover:text-primary"
      >
        <IconChevronLeft className="mr-1 h-4 w-4" />
        Back to Trips
      </Button>

      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              Trip #{displayId}
            </h1>
            <Badge className={`${statusColors[status]} capitalize px-3`}>
              {status}
            </Badge>
          </div>
          <div className="flex items-center mt-1 text-muted-foreground">
            <IconCalendarWeek className="mr-1.5 h-4 w-4" />
            <p className="text-sm">Created on {formattedDate}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export Log
          </Button>
          <Button size="sm">Edit Trip</Button>
        </div>
      </header>
    </div>
  );
}
