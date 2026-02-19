"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { GoogleMapProvider } from "@/lib/providers/google-map";
import { Sidebar } from "./_components/sidebar";
import { SiteHeader } from "./_components/site-header";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Sidebar />

      <SidebarInset>
        <div className="sticky top-0 z-10 bg-background rounded-xl">
          <SiteHeader />
        </div>

        <GoogleMapProvider>
          <div className="p-4 md:p-8">{children}</div>
        </GoogleMapProvider>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
