import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getRouteNameFromPathname } from "../_routes";

export function SiteHeader() {
  const pathname = usePathname();
  const title = getRouteNameFromPathname(pathname) || "Unknown";

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        <Separator
          orientation="vertical"
          className="md:mx-2 data-[orientation=vertical]:h-4"
        />

        <h1 className="text-sm md:text-base font-medium">{title}</h1>
      </div>
    </header>
  );
}
