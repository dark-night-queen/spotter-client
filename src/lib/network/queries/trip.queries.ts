import { TripInput, TripService } from "@/lib/network/apis/trip.api";
import { useMutation, useQuery, useQueryClient } from "./base.queries";

export const useCreateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTrip: TripInput) => TripService.create(newTrip),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};

export const useTripAll = () => {
  return useQuery({
    queryKey: [],
    queryFn: () => TripService.getAll(),
    retry: 3,
  });
};

export const useTripById = (tripId: string) => {
  return useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => TripService.getById(tripId),
    enabled: !!tripId,
    retry: 3,
  });
};
