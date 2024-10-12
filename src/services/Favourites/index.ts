/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const createFavourite = async (favouriteData: {
  userId: string;
  postId: string;
}) => {
  try {
    const { data } = await axiosInstance.post(
      "/favourite/create-favourite",
      favouriteData
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllFavourites = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/favourite/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
