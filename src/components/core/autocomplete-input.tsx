"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

import { Input } from "@/components/ui/input";

interface AutocompleteInputProps extends React.ComponentProps<"input"> {
  onLocationSelect: (address: string) => void;
}

export const AutocompleteInput = ({
  onLocationSelect,
  ...props
}: AutocompleteInputProps) => {
  const placesLib = useMapsLibrary("places");
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!placesLib || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
      types: ["address"],
    };

    const instance = new placesLib.Autocomplete(inputRef.current, options);
    setAutocomplete(instance);

    return () => {
      // Clean up listeners
      google.maps.event.clearInstanceListeners(instance);
    };
  }, [placesLib]);

  useEffect(() => {
    if (!autocomplete) return;

    const listener = autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (place.formatted_address) {
        // Prevent local state mismatch if needed
        if (inputRef.current) {
          inputRef.current.value = place.formatted_address;
        }
        onLocationSelect(place.formatted_address);
      }
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [autocomplete, onLocationSelect]);

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
