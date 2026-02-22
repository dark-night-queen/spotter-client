import { IconLayoutDashboard, IconRouteSquare } from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import { Routes, RouteNames } from "@/app/(main)/_routes";

type NavItem = {
  title: string;
  url: string;
  icon: TablerIcon;
};

const NavItems: NavItem[] = [
  {
    title: RouteNames.DASHBOARD,
    url: Routes.DASHBOARD,
    icon: IconLayoutDashboard,
  },
];

const NavToolItems: NavItem[] = [
  {
    title: RouteNames.TRIPS,
    url: Routes.TRIPS,
    icon: IconRouteSquare,
  },
];

export { NavItems, NavToolItems };
export type { NavItem };
