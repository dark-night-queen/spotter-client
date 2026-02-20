"use client";

import React, { useEffect, useRef } from "react";
import { useMap } from "@/lib/providers/google-map";
import { Input } from "@/components/ui/input";

interface AutocompleteInputProps extends React.ComponentProps<"input"> {
  onLocationSelect: (address: string) => void;
}

export const AutocompleteInput = ({
  onLocationSelect,
  ...props
}: AutocompleteInputProps) => {
  const { placesLib, isLoaded } = useMap();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoaded || !placesLib || !inputRef.current) return;

    const autocomplete = new placesLib.Autocomplete(inputRef.current, {
      fields: ["geometry", "name", "formatted_address"],
      types: ["address"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        onLocationSelect(place.formatted_address || "");
      }
    });

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [isLoaded, onLocationSelect, placesLib]);

  return (
    <Input
      ref={inputRef}
      onChange={(e) => {
        onLocationSelect(e.target.value);
      }}
      {...props}
    />
  );
};
