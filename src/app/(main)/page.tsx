"use client";

import React from "react";
import { useMap } from "@/lib/providers/google-map";

const Dashboard = () => {
  const { initMap } = useMap();
  const mapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (mapRef.current) {
      initMap(mapRef.current);
    }
  }, [initMap]);

  return (
    <div className="h-screen w-full relative">
      <div ref={mapRef} className="absolute inset-0" />
    </div>
  );
};

export default Dashboard;
