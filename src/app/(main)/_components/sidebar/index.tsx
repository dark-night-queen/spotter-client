"use client";

// code dependencies
import React from "react";

// core components
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { DriverInfo } from "./driver-info";
import { NavContent, NavContentWithLabel } from "./nav-content";
import { NavItems, NavToolItems } from "./_constants";

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
        <NavContent items={NavItems} />
        <NavContentWithLabel label={"Tools"} items={NavToolItems} />
      </SidebarContent>
    </BaseSidebar>
  );
}
