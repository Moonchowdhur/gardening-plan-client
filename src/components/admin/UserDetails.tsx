/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllUsers } from "@/hooks/auth.hook";
import { useGetCategories } from "@/hooks/gardenings.hook";

import React from "react";

const UserDetails = () => {
  const { data: allUsers, isLoading: allUserLoading } = useGetAllUsers();
  const { data: gardeningData, isLoading: gardeningLoading } =
    useGetCategories();

  if (allUserLoading || gardeningLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#49674a]"></div>
      </div>
    );
  }

  console.log(gardeningData, "gardeningData");

  const getUserPosts = (userId: string) => {
    return gardeningData?.data.filter(
      (post: any) => post?.userId?._id === userId
    );
  };

  return (
    <div className="p-4 mt-[93px]">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-[#425d43] text-white">
          <tr>
            <th className="text-center p-2">Profile</th>
            <th className="text-center p-2">Name</th>
            <th className="text-center p-2">Email</th>
            <th className="text-center p-2">Followers</th>
            <th className="text-center p-2">Following</th>
            <th className="text-center p-2">Verified</th>
            <th className="text-center p-2">Payment Status</th>
            <th className="text-center p-2">Post Title</th>
            <th className="text-center p-2">Post Time</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.data.map((user: any) => {
            const userPosts = getUserPosts(user._id);

            return (
              <React.Fragment key={user._id}>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">
                    <img
                      src={user.profilePicture}
                      alt="profile"
                      className="w-5 h-5 rounded-full"
                    />
                  </td>
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.followers.length}</td>
                  <td className="py-3 px-6">{user.following.length}</td>
                  <td className="py-3 px-6">
                    {user.verified ? (
                      <span className="text-green-500 font-bold">Verified</span>
                    ) : (
                      <button className="bg-[#FAFFAF] text-[#425d43] rounded-lg font-bold py-2 px-3">
                        Verify
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-6">
                    {user.payment ? (
                      <span className="text-green-500 font-bold">Paid</span>
                    ) : (
                      <span className="text-red-500 font-bold">Unpaid</span>
                    )}
                  </td>

                  {userPosts && userPosts.length > 0 ? (
                    <>
                      <td className="py-3 px-6">{userPosts[0].title}</td>
                      <td className="py-3 px-6">
                        {new Date(userPosts[0].createdAt).toLocaleString()}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-6 text-center" colSpan={2}>
                        No Posts
                      </td>
                    </>
                  )}
                </tr>

                {userPosts &&
                  userPosts.length > 1 &&
                  userPosts.slice(1).map((post: any) => (
                    <tr key={post._id} className="border-b hover:bg-gray-100">
                      <td colSpan={7}></td> {/* Empty cells to align */}
                      <td className="py-3 px-6">{post.title}</td>
                      <td className="py-3 px-6">
                        {new Date(post.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
