export const Routes = {
  TRIPS: "/trips",
};

export const RouteNames = {
  TRIPS: "Trips",
};

export function getRouteNameFromPathname(pathname: string): string | undefined {
  const normalized =
    pathname === "" || pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  for (const key of Object.keys(Routes) as (keyof typeof Routes)[]) {
    const route = Routes[key];
    // exact match or nested/dynamic (e.g. /TRIPS/123)
    if (
      route === normalized ||
      (route !== "/" && normalized.startsWith(route + "/"))
    ) {
      return RouteNames[key];
    }
  }
  return undefined;
}
