import { Van } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface OrgInfoProps {
  truckId: string;
}

export const OrgInfo = ({ truckId }: OrgInfoProps) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-sidebar hover:text-sidebar-foreground"
        >
          <div className="bg-sidebar-accent-foreground/25 flex aspect-square size-8 items-center justify-center rounded-lg">
            <Van className="size-4" />
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Spotter</span>
            <span className="truncate text-xs">{truckId}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
