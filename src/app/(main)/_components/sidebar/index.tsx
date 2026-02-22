"use client";

import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { DriverInfo } from "./driver-info";
import { NavContentWithLabel } from "./nav-content";
import { NavToolItems } from "./_constants";

const user = {
  name: "John Doe",
  truckId: "TC100023",
};

export function Sidebar() {
  return (
    <BaseSidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <DriverInfo driver={user} />
      </SidebarHeader>

      <SidebarContent>
        <NavContentWithLabel label={"Tools"} items={NavToolItems} />
      </SidebarContent>
    </BaseSidebar>
  );
}
