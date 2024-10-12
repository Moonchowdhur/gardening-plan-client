/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const createGardening = async (gardeningData: any) => {
  try {
    const { data } = await axiosInstance.post(
      "/gardening/create-gardening",
      gardeningData
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllGardenings = async () => {
  try {
    const { data } = await axiosInstance.get("/gardening");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSingleGardeningPost = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/gardening/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateGardeningPost = async (
  id: string,
  updatedData: {
    title: string;
    content: string;
    category: string;
    images: string[];
  }
) => {
  try {
    const { data } = await axiosInstance.put(`/gardening/${id}`, updatedData);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteGardeningPost = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/gardening/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getUserGardeningPostsAndLikes = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/gardening/user/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const likeGardeningPost = async (postId: string, userId: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/gardening/like/${postId}/${userId}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const dislikeGardeningPost = async (postId: string, userId: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/gardening/dislike/${postId}/${userId}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// export const getAllPremiumGardenings = async () => {
//   try {
//     const { data } = await axiosInstance.get("/gardening/premium");
//     console.log(data, "pre");
//     return data;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || error.message);
//   }
// };

//for user
export const getUserAllGardenings = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/gardening/puser/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

//count upvote
export const fetchUserGardeningPostsAndLikes = async (userId: string) => {
  const { data } = await axiosInstance.get(`/gardening/user/${userId}`);
  console.log(data, "response");
  return data;
};

export const getAllFreeGardenings = async () => {
  try {
    const { data } = await axiosInstance.get(`/gardening/premium`);
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
