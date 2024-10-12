/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createGardening,
  dislikeGardeningPost,
  fetchUserGardeningPostsAndLikes,
  getAllFreeGardenings,
  getAllGardenings,
  getUserAllGardenings,
  likeGardeningPost,
} from "@/services/Gardenings";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSingleGardeningPost,
  updateGardeningPost,
  deleteGardeningPost,
  getUserGardeningPostsAndLikes,
} from "@/services/Gardenings";
import { toast } from "sonner";

// export const useCreateGardening = () => {
//   return useMutation(createGardening, {
//     onSuccess: (data) => {
//       // Handle success, maybe show a success toast or navigate
//       console.log("Gardening created successfully:", data);
//     },
//     onError: (error: any) => {
//       // Handle error, maybe show an error toast
//       console.error("Error creating gardening:", error.message);
//     },
//   });
// };

export const useCreateGardening = () => {
  return useMutation({
    mutationFn: async (gardeningData: any) =>
      await createGardening(gardeningData),
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["GET_GARDENINGS"],
    queryFn: async () => await getAllGardenings(),
  });
};

export const useGetSingleGardeningPost = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_GARDENING", id],
    queryFn: () => getSingleGardeningPost(id),
  });
};

// Hook for updating a gardening post
export const useUpdateGardeningPost = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedData }: { id: string; updatedData: any }) =>
      updateGardeningPost(id, updatedData),
    onSuccess: () => {
      // Invalidate and refetch the gardening posts after mutation
      //   queryClient.invalidateQueries(["GET_GARDENINGS"]);
    },
  });
};

// Hook for deleting a gardening post
export const useDeleteGardeningPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteGardeningPost(id),
    onSuccess: () => {
      // Invalidate and refetch the gardening posts after deletion
      //   queryClient.invalidateQueries(["GET_GARDENINGS"]);
    },
  });
};

// export const useDeleteGardeningPost = () => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     (id: string) => deleteGardeningPost(id), // Mutation function
//     {
//       onSuccess: () => {
//         // Invalidate and refetch gardening posts after successful deletion
//         queryClient.invalidateQueries("GET_GARDENINGS"); // Adjust the query key as needed
//       },
//       onError: (error: any) => {
//         console.error("Error deleting gardening post:", error.message);
//         // Optionally display a toast or alert for feedback
//       },
//     }
//   );
// };

// Hook for fetching gardening posts and likes by user ID
export const useGetUserGardeningPostsAndLikes = (userId: string) => {
  return useQuery({
    queryKey: ["GET_USER_GARDENINGS", userId],
    queryFn: () => getUserGardeningPostsAndLikes(userId),
    // enabled: !!userId, // To avoid running if no userId is provided
  });
};

export const useLikeGardeningPost = () => {
  return useMutation<any, Error, { postId: string; userId: string }>({
    mutationKey: ["LIKE_GARDENING_POST"],
    mutationFn: async ({ postId, userId }) =>
      await likeGardeningPost(postId, userId),

    onSuccess: () => {
      toast.success("Successfully liked the post.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDislikeGardeningPost = () => {
  return useMutation<any, Error, { postId: string; userId: string }>({
    mutationKey: ["DISLIKE_GARDENING_POST"],
    mutationFn: async ({ postId, userId }) =>
      await dislikeGardeningPost(postId, userId),

    onSuccess: () => {
      toast.success("Successfully disliked the post.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const usePremiumGardenings = () => {
  return useQuery({
    queryKey: ["GET_PREMIUM_GARDENINGS"],
    // @ts-expect-error: error might happen

    queryFn: getAllPremiumGardenings,
    // @ts-expect-error: error might happen

    onSuccess: () => {
      console.log("Fetched all premium gardening posts successfully.");
    },
    onError: (error: any) => {
      console.error("Error fetching premium gardening posts:", error.message);
    },
  });
};

export const useUserGardenings = (userId: string) => {
  return useQuery({
    queryKey: ["GET_USER_GARDENINGS", userId],
    queryFn: () => getUserAllGardenings(userId),
    // @ts-expect-error: error might happen

    onSuccess: () => {
      console.log(`Fetched gardening posts for user ${userId} successfully.`);
    },
    onError: (error: any) => {
      console.error(
        `Error fetching gardening posts for user ${userId}:`,
        error.message
      );
    },
  });
};

// export const useUserGardeningPostsAndLikes = (userId) => {
//   return useQuery(["userGardeningPosts", userId], () =>
//     fetchUserGardeningPostsAndLikes(userId)
//   );
// };

export const useUserGardeningPostsAndLikes = (userId: string) => {
  return useQuery({
    queryKey: ["userGardeningPosts", userId],
    queryFn: () => fetchUserGardeningPostsAndLikes(userId),
  });
};

// export const usePremiumGardening = () => {
//   return useQuery("premiumGardening", fetchPremiumGardening, {
//     staleTime: 5 * 60 * 1000, // 5 minutes caching
//   });
// };

// export const usePremiumGardening = () => {
//   return useQuery({
//     queryKey: ["premiumGardening"],
//     queryFn: () => getAllPremiumGardenings(),
//   });
// };

// export const usePremiumGardening = () => {
//   return useQuery("premiumGardening", fetchPremiumGardening);
// };

export const useFreeGardening = () => {
  return useQuery({
    queryKey: ["GET_FREEGARDENINGS"],
    queryFn: async () => await getAllFreeGardenings(),
  });
};
