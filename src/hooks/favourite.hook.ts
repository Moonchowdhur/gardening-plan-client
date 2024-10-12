/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFavourite, getAllFavourites } from "@/services/Favourites";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateFavourite = () => {
  return useMutation({
    mutationKey: ["CREATE_FAVOURITE"],
    mutationFn: async (favouriteData: { userId: string; postId: string }) => {
      return await createFavourite(favouriteData);
    },
    onSuccess: () => {
      toast.success("Favourite toggled successfully!");
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};

export const useGetAllFavourites = (userId: string) => {
  return useQuery({
    queryKey: ["GET_FAVOURITES", userId],
    queryFn: async () => await getAllFavourites(userId),
    // onSuccess: (data) => {
    //   toast.success("Fetched favourites successfully!");
    // },
    // onError: (error: any) => {
    //   toast.error(`Error: ${error.message}`);
    // },
  });
};
