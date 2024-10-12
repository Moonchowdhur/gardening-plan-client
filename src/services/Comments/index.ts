/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const getAllCommentsByPost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(`/comment/post/${postId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getSingleComment = async (commentId: string) => {
  try {
    const { data } = await axiosInstance.get(`/comment/${commentId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const createComment = async (commentData: {
  description: string;
  userId: string;
  postId: string;
}) => {
  try {
    const response = await axiosInstance.post(
      "/comment/create-comment",
      commentData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
// API call to update the comment
export const updateComment = async (
  id: string,
  description: string // Ensure this matches the description you're passing in the body
) => {
  try {
    // Make PATCH request to update comment description
    const { data } = await axiosInstance.patch(`/comment/${id}`, {
      description, // Pass description in the request body
    });
    return data;
  } catch (error: any) {
    // Handle errors gracefully
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/comment/${commentId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
