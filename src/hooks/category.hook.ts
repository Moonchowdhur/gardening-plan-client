/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "@/services/Categories";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllTypeCategories = () => {
  return useQuery({
    queryKey: ["GET_CATEGORIES"],
    queryFn: async () => await getAllCategories(),
  });
};

export const useCreateCategory = () => {
  // For query invalidation or cache update

  return useMutation({
    mutationFn: async (categoryData: any) => await createCategory(categoryData),
    onSuccess: () => {
      // Invalidate or refetch the categories list after a successful creation
    },
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: async (categoryId: string) => await deleteCategory(categoryId),
    onSuccess: () => {},
  });
};
