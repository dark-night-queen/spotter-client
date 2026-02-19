"use client";

import React, { useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

interface MapContextType {
  map: google.maps.Map | null;
  initMap: (element: HTMLDivElement) => Promise<void>;
  placesLib: google.maps.PlacesLibrary | null;
}

// Context to hold the map instance and initialization function
const MapContext = React.createContext<MapContextType | null>(null);

// Custom hook to access the map context
const useMap = () => {
  const context = React.useContext(MapContext);
  if (!context) throw new Error("useMap must be used within GoogleMapProvider");
  return context;
};

// Provider component that initializes the Google Map and provides it to children
const GoogleMapProvider = ({ children }: { children: React.ReactNode }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [placesLib, setPlacesLib] = useState<google.maps.PlacesLibrary | null>(
    null,
  );

  const initMap = React.useCallback(
    async (element: HTMLDivElement) => {
      if (map) return;

      setOptions({
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        v: "weekly",
        libraries: ["places"],
      });

      const mapsLib = await importLibrary("maps");
      const pLib = await importLibrary("places");

      setPlacesLib(pLib);

      const newMap = new mapsLib.Map(element, {
        center: { lat: 51.5, lng: -0.12 },
        zoom: 10,
        // mapId: "YOUR_MAP_ID", // Best practice: use a Map ID from Cloud Console
      });

      setMap(newMap);
    },
    [map],
  );

  return (
    <MapContext.Provider value={{ map, initMap, placesLib }}>
      {children}
    </MapContext.Provider>
  );
};

export { GoogleMapProvider, useMap };
