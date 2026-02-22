"use client";

import { useCallback, useMemo } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export const useReverseGeocoding = () => {
  const geocodingLib = useMapsLibrary("geocoding");

  const geocoder = useMemo(() => {
    if (!geocodingLib) return null;

    return new geocodingLib.Geocoder();
  }, [geocodingLib]);

  const getAddressFromCoords = useCallback(
    async (lat: number, lng: number): Promise<string> => {
      if (!geocoder) return "Geocoder not initialized";

      try {
        const response = await geocoder.geocode({
          location: { lat, lng },
        });

        if (response.results?.[0]) {
          return response.results[0].formatted_address;
        }

        return `Coords: ${lat}, ${lng}`;
      } catch (e) {
        console.warn("Reverse Geocoding failed:", e);
        return `Coords: ${lat}, ${lng}`;
      }
    },
    [geocoder],
  );

  return { getAddressFromCoords, isReady: !!geocoder };
};
