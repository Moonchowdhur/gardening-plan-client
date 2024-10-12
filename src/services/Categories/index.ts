"use server";
import axiosInstance from "@/lib/AxiosInstance";

export const createCategory = async (categoryData: any) => {
  try {
    const { data } = await axiosInstance.post(
      "/category/create-category",
      categoryData
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/category/${categoryId}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/category");
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
