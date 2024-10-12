/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} from "@/services/Comments";
import { getSingleComment } from "@/services/Comments";
import { toast } from "sonner";

// Hook for fetching comments by postId
export const useGetAllCommentsByPost = (postId: string) => {
  return useQuery({
    queryKey: ["GET_COMMENTS_BY_POST", postId],
    queryFn: () => getAllCommentsByPost(postId),
    enabled: !!postId, // Only run if postId is available
  });
};

export const useGetSingleComment = (commentId: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_COMMENT", commentId],
    queryFn: () => getSingleComment(commentId),
    enabled: !!commentId, // The query runs only if commentId is defined
  });
};

// Hook for creating a new comment
// export const useCreateComment = () => {
//   return useMutation({
//     mutationFn: ({ data }: any) => createComment(data),
//     // onSuccess: (data, variables) => {
//     //   // Invalidate and refetch the comments for the relevant post
//     //   //   queryClient.invalidateQueries(["GET_COMMENTS_BY_POST", variables.postId]);
//     // },
//   });
// };

export const useCreateComment = () => {
  const queryClient = useQueryClient(); // To invalidate or update relevant queries

  return useMutation({
    mutationFn: (commentData: {
      description: string;
      userId: string;
      postId: string;
    }) => createComment(commentData),
    // onSuccess: (data, variables) => {
    //   // Invalidate or refetch comments related to the post
    //   queryClient.invalidateQueries(["GET_COMMENTS_BY_POST", variables.postId]);
    // },
    // onError: (error: any) => {
    //   console.error("Error creating comment:", error.message);
    // },
  });
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: ({
      commentId,
      description,
    }: {
      commentId: string;
      description: string;
    }) => updateComment(commentId, description), // Pass id and description to the update function
    onSuccess: (data) => {
      // Handle success logic, like showing a toast
      toast.success("Comment updated successfully!");
      // Optionally, refetch comments or invalidate queries here
      // queryClient.invalidateQueries(["GET_COMMENTS_BY_POST"]);
    },
    onError: (error) => {
      // Handle the error and display an error toast
      toast.error(error.message || "Failed to update comment.");
    },
  });
};

// Hook for deleting a comment
// export const useDeleteComment = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (commentId: string) => deleteComment(commentId),
//     onSuccess: (data, variables) => {
//       // Invalidate and refetch the comments after deletion
//       //   queryClient.invalidateQueries(["GET_COMMENTS_BY_POST"]);
//     },
//   });
// };

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      // Invalidate and refetch the comments after deletion
      // queryClient.invalidateQueries(['GET_COMMENTS_BY_POST']);

      // Show success toast message
      toast.success("Comment deleted successfully!");
    },
    onError: (error: any) => {
      // Show error toast message
      toast.error(`Error deleting comment: ${error.message}`);
    },
  });
};
