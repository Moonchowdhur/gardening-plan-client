/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/user/signup", userData);

    if (data.success) {
      cookies().set("accessToken", data?.token);
      //   cookies().set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("user/login", userData);
    console.log(data, "data");
    if (data.success) {
      cookies().set("accessToken", data?.token);
      //   cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// export const loginUser = async (userData: FieldValues) => {
//   try {
//     const { data } = await axiosInstance.post("user/login", userData);

//     console.log("Response Data:", data);
//     if (data.success) {
//       cookies().set("accessToken", data?.token);
//       // cookies().set("refreshToken", data?.data?.refreshToken);
//     }

//     return data;
//   } catch (error: any) {
//     if (error.response) {
//       // The request was made, and the server responded with a status code outside of 2xx
//       console.error("Error Response:", error.response.data);
//       console.error("Error Status:", error.response.status);
//     } else if (error.request) {
//       // The request was made, but no response was received
//       console.error("No Response:", error.request);
//     } else {
//       // Something else happened while making the request
//       console.error("Error:", error.message);
//     }
//     throw new Error(error.message);
//   }
// };

export const logout = () => {
  cookies().delete("accessToken");
};

export const followOrUnfollowUser = async (
  action: "follow" | "unfollow",
  userId: string,
  targetUserId: string
) => {
  try {
    const { data } = await axiosInstance.post(
      `/user/${action}/${userId}/${targetUserId}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      phone: decodedToken.phone,
      role: decodedToken.role,
      verified: decodedToken.verified,
      profilePicture: decodedToken.profilePicture,
    };
  }

  return decodedToken;
};

export const getUserByEmail = async (email: string) => {
  try {
    const { data } = await axiosInstance.get(`/user/${email}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Could not fetch user");
  }
};

// export const getNewAccessToken = async () => {
//   try {
//     const refreshToken = cookies().get("refreshToken")?.value;

//     const res = await axiosInstance({
//       url: "/auth/refresh-token",
//       method: "POST",
//       withCredentials: true,
//       headers: {
//         cookies: `refreshToken=${refreshToken}`,
//       },
//     });

//     return res.data;
//   } catch (error) {
//     throw new Error("Failed to get new access token");
//   }
// };

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/user");
    console.log(data, "dddd");
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const changePassword = async (passwordData: any) => {
  try {
    const { data } = await axiosInstance.post(
      "auth/change-password",
      passwordData
    );
    return data;
  } catch (error) {
    // @ts-expect-error: error might happen

    throw new Error(error.response?.data?.message || error.message);
  }
};

export const updateUserByEmail = async (email: any, updatedData: any) => {
  try {
    const { data } = await axiosInstance.put(`/user/${email}`, updatedData);
    return data;
  } catch (error) {
    // @ts-expect-error: error might happen

    throw new Error(error.response?.data?.message || error.message);
  }
};

export const makePayment = async (email: string) => {
  try {
    const { data } = await axiosInstance.put(`/user/payment/${email}`);

    if (data.success) {
      toast.success("Payment successful.");
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Payment failed.");
  }
};
