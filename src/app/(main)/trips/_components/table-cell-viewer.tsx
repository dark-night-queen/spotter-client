import { ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Spinner } from "@/components/ui/spinner";
import { GoogleMap } from "@/components/core/google-map";
import { useTripById } from "@/lib/network/queries/trip.queries";
import { Header } from "../[id]/_components/header";
import { DailyLogs } from "../[id]/_components/daily_logs";
import { RouteDetails } from "../[id]/_components/route-details";
import Link from "next/link";

export function TableCellViewer({
  tripId,
  address,
}: {
  tripId: string;
  address: string;
}) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="text-foreground p-0 max-w-[200px] cursor-pointer"
        >
          <span className="block truncate w-full text-left" title={address}>
            {address}
          </span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <TableCellContent tripId={tripId} />
      </DrawerContent>
    </Drawer>
  );
}

function TableCellContent({ tripId }) {
  const { data: trip, isLoading } = useTripById(tripId);

  if (isLoading) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <DrawerHeader className="gap-1">
        <DrawerTitle className="flex justify-between">
          <Header tripId={trip.id} created_at={trip.created_at} isDrawer />
          <Link href={`/trips/${tripId}`}>
            <ExternalLink />
          </Link>
        </DrawerTitle>
      </DrawerHeader>

      <GoogleMap
        polylines={trip.route_geometry.polyline}
        defaultCenter={trip.route_geometry.pickup_coords}
        markers={[
          {
            title: "Start Location",
            position: trip.route_geometry.start_coords,
            background: "#94a3b8",
            glyph: "S",
          },
          {
            title: "Pickup Location",
            position: trip.route_geometry.pickup_coords,
            background: "#6366f1",
            glyph: "P",
          },
          {
            title: "Drop-off Location",
            position: trip.route_geometry.drop_off_coords,
            background: "#009689",
            glyph: "D",
          },
        ]}
      />

      <div className="flex flex-col gap-4 overflow-y-auto p-4 text-sm">
        <DailyLogs trip={trip} isDrawer />
        <RouteDetails trip={trip} />
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button>Done</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
}
