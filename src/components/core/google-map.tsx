"use client";

import { useEffect, useMemo } from "react";
import {
  Map,
  useMap,
  AdvancedMarker,
  Pin,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

interface GoogleMapProps {
  polylines: string[];
  defaultCenter: { lat: number; lng: number };
  markers: {
    title: string;
    position: { lat: number; lng: number };
    background: string;
    glyph: string;
  }[];
}

// Separate component for Polyline to access the map instance via hook
const RoutePaths = ({ polylines }: { polylines: string[] }) => {
  const map = useMap();
  const geometryLib = useMapsLibrary("geometry");

  const paths = useMemo(() => {
    if (!geometryLib || !polylines) return [];
    return polylines.map((p) => geometryLib.encoding.decodePath(p));
  }, [geometryLib, polylines]);

  useEffect(() => {
    if (!map || paths.length === 0) return;

    // Create and add polylines to map
    const lines = paths.map((path, index) => {
      const poly = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: index === 0 ? "#94a3b8" : "#2563eb",
        strokeOpacity: 1,
        strokeWeight: 5,
        map: map,
      });
      return poly;
    });

    // Auto-fit bounds
    const bounds = new google.maps.LatLngBounds();
    paths.forEach((path) => path.forEach((point) => bounds.extend(point)));
    map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });

    // Cleanup on unmount or path change
    return () => {
      lines.forEach((l) => l.setMap(null));
    };
  }, [map, paths]);

  return null;
};

export const GoogleMap = ({
  polylines,
  defaultCenter,
  markers,
}: GoogleMapProps) => {
  const MAP_ID = "DEMO_MAP_ID";

  return (
    <div className="w-full h-112.5">
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={10}
        mapId={MAP_ID}
        fullscreenControl={false}
        streetViewControl={false}
      >
        {/* Render the Polylines */}
        <RoutePaths polylines={polylines} />

        {/* Render Markers */}
        {markers.map((marker) => (
          <AdvancedMarker
            key={marker.title}
            position={marker.position}
            title={marker.title}
          >
            <Pin
              background={marker.background}
              borderColor={"#fff"}
              glyph={marker.glyph}
              glyphColor={"#fff"}
            />
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
};
