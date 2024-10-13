/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

import { Button } from "../ui/button";
import { useUser } from "@/context/user.provider";
import {
  useFollowOrUnfollowUser,
  useGetAllUsers,
  useGetUserByEmail,
  usePaymentMutation,
} from "@/hooks/auth.hook";
import { useUserGardeningPostsAndLikes } from "@/hooks/gardenings.hook";
import { FaStar } from "react-icons/fa";

const FollowPage = () => {
  const { user } = useUser();

  console.log(user, "user");
  // @ts-expect-error: error might happen

  const { data: userData } = useGetUserByEmail(user?.email);

  const { mutate: initiatePayment } = usePaymentMutation(); // Payment mutation

  const { data: allUsers } = useGetAllUsers();
  const { mutate: followOrUnfollowUser } = useFollowOrUnfollowUser();

  const { data: gardeningPosts, isLoading } = useUserGardeningPostsAndLikes(
    userData?.data?._id
  );

  console.log(gardeningPosts?.data?.totalLikes, "gardeningPosts");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleVerifyClick = () => {
    setIsModalOpen(true);
  };

  const handlePaymentMethodChange = (e: any) => {
    setPaymentMethod(e.target.value); // Update the selected payment method
  };

  const handlePayClick = () => {
    if (paymentMethod) {
      // console.log(`Payment initiated with ${paymentMethod}`);
      setIsModalOpen(false); // Close the modal after payment
    } else {
      alert("Please select a payment method.");
    }
  };

  // const handlePayClick = () => {
  //   if (paymentMethod) {
  //     console.log(`Payment initiated with ${paymentMethod}`);
  //     if (user?.email) {
  //       // Initiate the payment mutation
  //       initiatePayment(user?.email, {
  //         onSuccess: () => {
  //           toast.success("Payment done!");
  //         },
  //         onError: (error: any) => {
  //           toast.error(`Failed to Payment: ${error.message}`);
  //         },
  //       });
  //     } else {
  //       alert("Please provide an email.");
  //     }
  //     setIsModalOpen(false); // Close the modal after payment
  //   } else {
  //     alert("Please select a payment method.");
  //   }
  // };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#49674a]"></div>
      </div>
    );
  }

  const filteredUsers = allUsers?.data.filter(
    // @ts-expect-error: error might happen

    (user) => user.email !== userData?.data.email
  );

  const handleFollowUnfollow = (targetUserId: string, isFollowing: boolean) => {
    const action = isFollowing ? "unfollow" : "follow";
    followOrUnfollowUser({ action, userId: userData?.data._id, targetUserId });
  };

  return (
    <div className=" p-6 mt-8 min-h-screen">
      {filteredUsers?.length > 0 && (
        <>
          <div className="flex gap-4 mb-4 items-center justify-center">
            {userData?.data.verified === true && (
              <FaStar className="text-yellow-400 text-3xl" />
            )}
            <h2 className="text-4xl font-bold text-center">
              {userData?.data.name}
            </h2>
            <div className="flex gap-3 items-center border border-[#809580] p-1 rounded-md justify-center">
              <h2 className="text-[#809580] font-bold">Followers:</h2>
              <p>{userData?.data?.followers?.length}</p>
            </div>
            {gardeningPosts?.data?.totalLikes > 0 && (
              // <button
              //   className="bg-[#809580] text-[#FAFFAF] text-lg font-medium px-4 py-2 rounded-lg"
              //   onClick={handleVerifyClick}
              // >
              //   {userData?.data?.verified === true ? "verified" : "verify"}
              // </button>
              <button
                className="bg-[#809580] text-[#FAFFAF] text-lg font-medium px-4 py-2 rounded-lg"
                // @ts-expect-error: error might happen
                onClick={userData?.data?.verified ? null : handleVerifyClick}
                disabled={userData?.data?.verified}
              >
                {userData?.data?.verified === true ? "Verified" : "Verify"}
              </button>
            )}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-bold mb-4">
                    Select Payment Method
                  </h2>
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Amrpay"
                        onChange={handlePaymentMethodChange}
                        className="form-radio text-[#809580]"
                      />
                      <span className="ml-2">Pay $100 by Amrpay </span>
                    </label>
                  </div>

                  <button
                    className="mt-4 bg-[#809580] text-white py-2 px-4 rounded-lg"
                    onClick={handlePayClick}
                  >
                    Pay
                  </button>
                  <button
                    className="mt-2 text-red-600 py-2 px-4 rounded-lg"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* <div className="flex justify-center">
            <div className="w-20 text-center rounded-md mb-4 h-[5px] bg-[#809580]"></div>
          </div> */}
        </>
      )}
      <div className="grid mt-8 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers?.map((otherUser: any) => {
          const isFollowing = userData?.data.following?.includes(
            otherUser?._id
          );
          {
            console.log(isFollowing, otherUser?._id, "isFollowing");
          }
          return (
            <div
              key={otherUser?._id}
              className="bg-white rounded-lg shadow-lg p-4"
            >
              <img
                src={otherUser?.profilePicture}
                alt={otherUser?.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center">
                {otherUser?.name}
              </h3>
              <p className="text-center text-gray-600 mb-4">
                {otherUser?.email}
              </p>
              <div className="text-center">
                <Button
                  className={`px-4 py-2  rounded ${
                    isFollowing
                      ? "bg-[#49674a] hover:bg-[#5b765c] font-medium  text-white"
                      : "bg-yellow-500 hover:bg-bg-yellow-500  text-black font-medium"
                  }`}
                  onClick={() =>
                    handleFollowUnfollow(otherUser?._id, isFollowing)
                  }
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FollowPage;
