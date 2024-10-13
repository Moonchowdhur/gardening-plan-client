/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  changePassword,
  followOrUnfollowUser,
  getAllUsers,
  getUserByEmail,
  loginUser,
  makePayment,
  registerUser,
  updateUserByEmail,
} from "@/services/AuthServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),

    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetUserByEmail = (email: string) => {
  return useQuery({
    queryKey: ["USER_BY_EMAIL", email], // Unique query key based on email
    queryFn: () => getUserByEmail(email), // Query function
    enabled: !!email, // Enable only if email is provided
    // onSuccess: (data) => {
    //   console.log("Fetched user data:", data);
    // },
    // onError: (error) => {
    //   console.error("Error fetching user data:", error);
    // },
  });
};

export const useFollowOrUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      action,
      userId,
      targetUserId,
    }: {
      action: "follow" | "unfollow";
      userId: string;
      targetUserId: string;
    }) => followOrUnfollowUser(action, userId, targetUserId),

    onSuccess: () => {
      // @ts-expect-error: error might happen

      queryClient.invalidateQueries(["userProfile"]);
    },

    onError: (error: any) => {
      console.error("Error in follow/unfollow:", error.message);
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => await getAllUsers(),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (passwordData) => {
      return await changePassword(passwordData);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Password changed successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to change password: ${error.message}`);
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({ email, updatedData }: any) => {
      console.log(email, updatedData, "email, updatedData ");
      return await updateUserByEmail(email, updatedData);
    },

    onSuccess: (data) => {
      toast.success("User updated successfully!", data);
    },
    onError: (error) => {
      toast.error(`Failed to update user: ${error.message}`);
    },
  });
};

export const usePaymentMutation = () => {
  return useMutation<string, Error, string>({
    mutationKey: ["PAYMENT_MUTATION"],
    mutationFn: makePayment,

    // Handling success and error here, not in the function call
    onSuccess: () => {
      toast.success("Payment done!");
    },
    onError: (error) => {
      toast.error(`Failed to make payment: ${error.message}`);
    },
  });
};
