"use client";

import React from "react";
import { toast } from "sonner";
import { useCreateTrip } from "@/lib/network/queries/trip.queries";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  IconMapPin,
  IconPlus,
  IconTruck,
  IconCircleDot,
  IconMapPinFilled,
  IconClockHour4,
} from "@tabler/icons-react";
import { AutocompleteInput } from "@/components/core/autocomplete-input";
import { useReverseGeocoding } from "@/lib/hooks/useReverseGeocoding";
import { useRouter } from "next/navigation";

export function CreateTripModal() {
  const router = useRouter();
  const { getAddressFromCoords } = useReverseGeocoding();
  const { mutate: createTrip, isPending } = useCreateTrip();

  const [open, setOpen] = React.useState(false);
  const [locating, setLocating] = React.useState(false);
  const [formData, setFormData] = React.useState({
    startAddress: "",
    pickupAddress: "",
    dropOffAddress: "",
    cycleUsed: 0,
  });

  const handleUseStartAddress = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!navigator.geolocation) return;

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await getAddressFromCoords(latitude, longitude);
        setFormData((prev) => ({ ...prev, startAddress: address }));
        setLocating(false);
      },
      () => setLocating(false),
    );
  };

  const handleSubmit = (e: React.SubmitEvent<Element>) => {
    e.preventDefault();
    const payload = {
      start_address: formData.startAddress,
      pickup_address: formData.pickupAddress,
      drop_off_address: formData.dropOffAddress,
      initial_cycle_hours: formData.cycleUsed,
    };

    createTrip(payload, {
      onSuccess: (data) => {
        toast.success("Trip successfully logged!");
        setOpen(false);
        router.push(`/trips/${data.id}`);
      },
      onError: (err) => {
        toast.error(err.message || "Something went wrong");
      },
    });
  };

  const isSubmitting = locating || isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <IconPlus />
          <span className="hidden lg:inline">Add Trip</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <IconTruck className="text-primary" />
              <span>New Delivery Trip</span>
            </DialogTitle>
            <DialogDescription>
              Plan your route from your current location to the final
              destination.
            </DialogDescription>
          </DialogHeader>

          <div className="relative flex flex-col gap-6 pl-6">
            <div className="absolute left-2.5 top-3 bottom-10 w-px border-l-2 border-dashed border-slate-200" />
            <div className="relative">
              <IconCircleDot className="absolute -left-5.25 top-9 z-10 size-4 text-slate-400 bg-background" />
              <Field>
                <Label htmlFor="startAddress">Starting Point</Label>
                <div className="relative flex items-center">
                  <AutocompleteInput
                    id="startAddress"
                    placeholder={
                      locating ? "Detecting GPS..." : "Search start location"
                    }
                    className="pr-10"
                    value={formData.startAddress}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        startAddress: e.target.value,
                      }))
                    }
                    onLocationSelect={(address) => {
                      setFormData((prev) => ({
                        ...prev,
                        startAddress: address,
                      }));
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 h-full w-10 text-slate-400"
                    onClick={handleUseStartAddress}
                    disabled={locating}
                  >
                    {locating ? <Spinner /> : <IconMapPin size={18} />}
                  </Button>
                </div>
              </Field>
            </div>

            <div className="relative">
              <IconCircleDot className="absolute -left-5.25 top-9 z-10 size-4 text-indigo-500 bg-background" />
              <Field>
                <Label htmlFor="pickupAddress">Pickup Address</Label>
                <AutocompleteInput
                  id="pickupAddress"
                  value={formData.pickupAddress}
                  placeholder="Where are you picking up?"
                  onLocationSelect={(address) => {
                    setFormData((prev) => ({
                      ...prev,
                      pickupAddress: address,
                    }));
                  }}
                />
              </Field>
            </div>

            <div className="relative">
              <IconMapPinFilled className="absolute -left-5.25 top-9 z-10 size-4 text-teal-600" />
              <Field>
                <Label htmlFor="dropOffAddress">Final Destination</Label>
                <AutocompleteInput
                  id="dropOffAddress"
                  value={formData.dropOffAddress}
                  placeholder="Where is the drop-off?"
                  onLocationSelect={(address) => {
                    setFormData((prev) => ({
                      ...prev,
                      dropOffAddress: address,
                    }));
                  }}
                />
              </Field>
            </div>
          </div>

          <Field>
            <Label htmlFor="cycle">Current Cycle Used (Hrs)</Label>
            <p className="text-xs text-muted-foreground -my-1">
              How many hours have you worked in the last 7/8 days?
            </p>
            <div className="relative flex items-center">
              <Input
                id="cycle"
                type="number"
                step="0.1"
                min="0"
                max="70"
                placeholder="e.g. 45.5"
                className="px-10"
                value={formData.cycleUsed}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cycleUsed: Number(e.target.value),
                  }))
                }
              />
              <IconClockHour4 className="absolute left-3 size-5 text-muted-foreground" />
              <div className="absolute right-3 text-xs font-medium text-muted-foreground pointer-events-none">
                hrs
              </div>
            </div>
          </Field>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.dropOffAddress}
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Processing
                </>
              ) : (
                "Create Trip"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
