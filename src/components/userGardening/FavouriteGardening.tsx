/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

import {
  useCreateComment,
  useDeleteComment,
  useGetAllCommentsByPost,
  useUpdateComment,
} from "@/hooks/comments.hook";
import {
  useDeleteGardeningPost,
  useUserGardenings,
} from "@/hooks/gardenings.hook";
import { FaHeart } from "react-icons/fa";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { toast } from "sonner";
import { useUser } from "@/context/user.provider";
import { useGetUserByEmail } from "@/hooks/auth.hook";

import {
  useCreateFavourite,
  useGetAllFavourites,
} from "@/hooks/favourite.hook";

const FavouriteGardening: React.FC = () => {
  //   const { data: gardeningData, isLoading, isError, error } = useGetCategories();

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [updatedDescription, setUpdatedDescription] = useState("");

  const { data: commentsData } = useGetAllCommentsByPost(
    selectedPostId as string
  );
  const { mutate: createComment } = useCreateComment();
  const { mutate: updateCommentMutation } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  const { user } = useUser();
  // @ts-expect-error: error might happen

  const { data: userData } = useGetUserByEmail(user?.email);

  const { data: gardeningData, isLoading: isUserLoading } = useUserGardenings(
    userData?.data?._id
  );

  console.log(gardeningData);

  const { mutate: toggleFavourite } = useCreateFavourite();
  const { data: favourites } = useGetAllFavourites(userData?.data?._id);
  const userId = userData?.data?._id;
  console.log(favourites);

  const handleToggleFavourite = (postId: string) => {
    toggleFavourite(
      { userId, postId }
      //   {
      //     onSuccess: () => {
      //       toast.success("Favorite successfully!");
      //     },
      //     onError: (error: any) => {
      //       toast.error(`Failed to delete comment: ${error.message}`);
      //     },
      //   }
    );
  };

  const { mutate: deleteGardening } = useDeleteGardeningPost();

  console.log(userData, "userData");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPostId && commentText.trim()) {
      createComment({
        postId: selectedPostId,
        description: commentText,
        userId: userData?.data._id,
      });

      setCommentText("");
    }
  };

  const handleUpdate = (commentId: string) => {
    if (updatedDescription.trim()) {
      updateCommentMutation({
        commentId,
        description: updatedDescription,
      });
      setEditingCommentId(null);
      setUpdatedDescription("");
    } else {
      toast.error("Description cannot be empty!");
    }
  };

  const handleDelete = (commentId: string) => {
    deleteComment(commentId, {
      onSuccess: () => {
        toast.success("Comment deleted successfully!");
      },
      onError: (error: any) => {
        toast.error(`Failed to delete comment: ${error.message}`);
      },
    });
  };

  const filteredGardeningData = gardeningData?.data?.sort(
    (a: any, b: any) => b.likes.length - a.likes.length
  );

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#49674a]"></div>
      </div>
    );
  }

  // const handleDeleteGardening = (id: string) => {
  //   deleteGardening(id, {
  //     onSuccess: () => {
  //       toast.success("gardening deleted successfully!");
  //     },
  //     onError: (error: any) => {
  //       toast.error(`Failed to delete comment: ${error.message}`);
  //     },
  //   });
  // };

  return (
    <div className=" mt-8 mx-auto p-8">
      <div className=" flex gap-8 items-center justify-center ">
        <div>
          {favourites?.data.length > 0 ? (
            <>
              {" "}
              <h2 className="text-4xl font-bold  mb-4 text-center">
                Favourite Gardening Articles
              </h2>
              <div className="flex justify-center">
                <div className="w-20 text-center rounded-md mb-4 h-[5px] bg-[#809580]"></div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <h2 className="text-4xl font-bold  text-center">
                No Gardening Articles
              </h2>
            </>
          )}
        </div>
      </div>

      {favourites?.data?.length > 0 &&
        favourites?.data?.map((gardening: any) => (
          <div
            key={gardening._id}
            className="bg-[#dbe1db] shadow-lg rounded-lg p-6 mb-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl text-[#425d43] font-semibold">
                  {gardening?.postId?.title}
                </h3>
              </div>
              <button
                onClick={() => handleToggleFavourite(gardening.postId._id)}
              >
                <FaHeart className="text-[#425d43]" />
              </button>
            </div>

            <p className="text-gray-700 mt-3 font-medium text-sm mb-4">
              {gardening?.postId?.content}
            </p>

            <p className="text-gray-600 mb-5">
              {gardening?.postId?.hash.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="mr-2 text-sm font-bold text-[#425d43] hover:underline"
                >
                  #{tag}
                </span>
              ))}
            </p>

            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 ">
              {gardening?.postId?.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image for ${gardening.postId.title}`}
                  className="rounded-lg transition-transform transform hover:scale-105 mb-2 w-8/12 h-5/12"
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-lg">
              <div className="flex items-center">
                <button
                  onClick={() =>
                    console.log(`Like clicked for ${gardening.postId._id}`)
                  }
                >
                  <AiFillLike className="mr-2" />
                </button>
                <p>{gardening?.postId?.likes.length}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    console.log(`Dislike clicked for ${gardening.postId._id}`)
                  }
                >
                  <AiFillDislike className="mr-2" />
                </button>
                <p>{gardening?.postId?.dislikes.length}</p>
              </div>
            </div>

            {/* <button
              onClick={() => setSelectedPostId(gardening._id)}
              className="mt-4 block text-[#425d43] font-bold underline hover:text-[#425d43] transition"
            >
              View Comments
            </button> */}

            {selectedPostId === gardening._id && (
              <div className="mt-4">
                {/* <form onSubmit={handleCommentSubmit} className="flex mb-4">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-grow p-2 border rounded-lg"
                  />
                  <button
                    type="submit"
                    className="ml-2 bg-[#49674a] text-white p-2 rounded-lg"
                  >
                    Submit
                  </button>
                </form> */}

                {/* Comments section */}
                {gardening?.postId?.comments?.map((comment: any) => (
                  <div key={comment._id} className="border-b py-2">
                    <p className="font-semibold">{comment?.userId?.name}</p>
                    {editingCommentId === comment._id ? (
                      <div className="flex">
                        <input
                          type="text"
                          value={updatedDescription}
                          onChange={(e) =>
                            setUpdatedDescription(e.target.value)
                          }
                          className="flex-grow p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => handleUpdate(comment._id)}
                          className="ml-2 bg-[#49674a] text-white p-2 rounded-lg"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p>{comment.description}</p>
                    )}

                    <div className="flex gap-2 items-center mt-2">
                      <div className="h-9 w-10 py-1 px-2 rounded-full bg-[#49674a]">
                        <button
                          onClick={() => setEditingCommentId(comment._id)}
                          className="text-2xl text-white underline"
                        >
                          <MdOutlineModeEdit />
                        </button>
                      </div>
                      <div className="h-9 w-10 py-1 px-2 rounded-full bg-[#49674a]">
                        <button
                          onClick={() => handleDelete(comment._id)}
                          className="text-2xl text-white underline"
                        >
                          <MdDeleteForever />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default FavouriteGardening;
