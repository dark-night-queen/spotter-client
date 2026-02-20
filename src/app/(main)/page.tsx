"use client";

import { useEffect, useRef } from "react";
import { useMap } from "@/lib/providers/google-map";
import { AutocompleteInput } from "@/components/core/autocomplete-input";

const Dashboard = () => {
  const { initMap } = useMap();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      initMap(mapRef.current);
    }
  }, [initMap]);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    console.log("Selected place:", place);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <AutocompleteInput
          label="Pickup Location"
          placeholder="Alto Palo"
          onPlaceSelect={handlePlaceSelect}
        />
        <AutocompleteInput
          label="Drop-off Location"
          placeholder="Alto Palo"
          onPlaceSelect={handlePlaceSelect}
        />
      </div>

      <div className="h-screen w-full relative">
        <div
          ref={mapRef}
          style={{ height: "500px", width: "100%" }}
          className="absolute inset-0 rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Dashboard;
