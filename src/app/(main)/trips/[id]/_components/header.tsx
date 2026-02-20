import moment from "moment";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  trip: {
    id: number;
    created_at: string;
  };
}

export default function Header({ trip }: HeaderProps) {
  const status = "Simulation Completed";
  const created_at = moment(trip.created_at).format("MMM-DD-YYYY");

  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trip #{trip.id}</h1>
        <p className="text-muted-foreground text-sm">
          Created on: {created_at}
        </p>
      </div>

      <Badge variant="outline" className="h-8 border-2">
        {status}
      </Badge>
    </header>
  );
}
