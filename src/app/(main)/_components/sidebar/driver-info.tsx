import { IconTir } from "@tabler/icons-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface DriverInfoProps {
  driver: {
    name: string;
    truckId: string;
  };
}

export function DriverInfo({ driver }: DriverInfoProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-sidebar hover:text-sidebar-foreground"
        >
          <div className="bg-sidebar-accent-foreground/25 flex aspect-square size-9 items-center justify-center rounded-lg">
            <IconTir size={22} />
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{driver.name}</span>
            <span className="truncate text-xs text-slate-400">
              {driver.truckId}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
