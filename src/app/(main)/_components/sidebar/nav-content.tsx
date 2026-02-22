import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavItem } from "./_constants";

interface NavContentProps extends React.ComponentPropsWithoutRef<
  typeof SidebarGroup
> {
  items: NavItem[];
}

interface NavContentWithLabelProps extends NavContentProps {
  label: string;
}

function NavMenuContent({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={pathname === item.url}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}

export function NavContent({ items, ...props }: NavContentProps) {
  return (
    <SidebarGroup {...props}>
      <NavMenuContent items={items} />
    </SidebarGroup>
  );
}

export function NavContentWithLabel({
  label,
  items,
  ...props
}: NavContentWithLabelProps) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <NavMenuContent items={items} />
    </SidebarGroup>
  );
}
