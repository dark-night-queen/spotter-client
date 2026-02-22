"use client";

import React from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
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

        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <div className="p-4 md:p-8">{children}</div>
        </APIProvider>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
