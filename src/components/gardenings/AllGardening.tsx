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
  useDislikeGardeningPost,
  useFreeGardening,
  useGetCategories,
  useLikeGardeningPost,
} from "@/hooks/gardenings.hook";
import { FaDownload, FaRegHeart, FaShare } from "react-icons/fa";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { toast } from "sonner";
import { useGetAllTypeCategories } from "@/hooks/category.hook";
import { useUser } from "@/context/user.provider";
import { useGetUserByEmail } from "@/hooks/auth.hook";
import { useCreateFavourite } from "@/hooks/favourite.hook";

const AllGardening: React.FC = () => {
  const { data: gardeningData, isError, error } = useGetCategories();
  const { data: categoryData } = useGetAllTypeCategories(); // Fetch category data
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [updatedDescription, setUpdatedDescription] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: commentsData } = useGetAllCommentsByPost(
    selectedPostId as string
  );
  const { mutate: createComment } = useCreateComment();
  const { mutate: updateCommentMutation } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  const { user } = useUser();
  // @ts-expect-error: error might happen

  const { data: userData } = useGetUserByEmail(user?.email);

  const { mutate: likePost } = useLikeGardeningPost();
  const { mutate: dislikePost } = useDislikeGardeningPost();

  const { mutate: toggleFavourite } = useCreateFavourite();

  const userId = userData?.data?._id;

  const { data: freegardeningData } = useFreeGardening();

  console.log(freegardeningData, "freegardeningData");

  // const isUserVerified = userData?.data?.verified === false;

  // console.log(isUserVerified, "isUserVerified");

  // Conditionally choose data based on user verification
  const dataToUse = userData?.data?.verified
    ? gardeningData
    : freegardeningData;

  // console.log(dataToUse, "dataToUse");

  const handleToggleFavourite = (postId: string) => {
    toggleFavourite({ userId, postId });
  };

  const handleLikeClick = (postId: string) => {
    const userId = userData?.data?._id;

    likePost(
      { postId, userId },
      {
        onSuccess: () => {
          toast.success("liked successfully!");
          window.location.reload();
        },
        onError: (error: any) => {
          toast.error(`Failed to delete comment: ${error.message}`);
        },
      }
    );
  };

  const handleDislikeClick = (postId: string) => {
    const userId = userData?.data?._id;

    dislikePost(
      { postId, userId },
      {
        onSuccess: () => {
          toast.success("disliked successfully!");
          window.location.reload();
        },
        onError: (error: any) => {
          toast.error(`Failed to delete comment: ${error.message}`);
        },
      }
    );
  };

  console.log(userData, "userData");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPostId && commentText.trim()) {
      createComment(
        {
          postId: selectedPostId,
          description: commentText,
          userId: userData?.data._id,
        },
        {
          onSuccess: () => {
            toast.success("Comment added successfully!");
            window.location.reload();
          },
          onError: (error: any) => {
            toast.error(`Failed to added comment: ${error.message}`);
          },
        }
      );

      setCommentText("");
    }
  };

  // const handleUpdate = (commentId: string) => {
  //   if (updatedDescription.trim()) {
  //     updateCommentMutation({
  //       commentId,
  //       description: updatedDescription,
  //     });
  //     setEditingCommentId(null);
  //     setUpdatedDescription("");
  //   } else {
  //     toast.error("Description cannot be empty!");
  //   }
  // };

  const handleUpdate = (commentId: string) => {
    if (updatedDescription.trim()) {
      updateCommentMutation(
        {
          commentId,
          description: updatedDescription,
        },
        {
          onSuccess: () => {
            toast.success("Comment edited successfully!");
            window.location.reload();
          },
          onError: (error: any) => {
            toast.error(`Failed to update comment: ${error.message}`);
          },
        }
      );
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
        window.location.reload();
      },
      onError: (error: any) => {
        toast.error(`Failed to delete comment: ${error.message}`);
      },
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  // const filteredGardeningData = gardeningData?.data
  //   ?.filter((gardening: any) => {
  //     const matchesTitle = gardening.title
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase());
  //     const matchesDescription = gardening.content
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase());
  //     const matchesCategory = gardening.category.name
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase());

  //     const categoryFilter = selectedCategory
  //       ? gardening.category.name === selectedCategory
  //       : true;

  //     return (
  //       (matchesTitle || matchesDescription || matchesCategory) &&
  //       categoryFilter
  //     );
  //   })
  //   ?.sort((a: any, b: any) => b.likes.length - a.likes.length);

  const filteredGardeningData = dataToUse?.data
    ?.filter((gardening: any) => {
      const matchesTitle = gardening.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDescription = gardening.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = gardening.category.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const categoryFilter = selectedCategory
        ? gardening.category.name === selectedCategory
        : true;

      return (
        (matchesTitle || matchesDescription || matchesCategory) &&
        categoryFilter
      );
    })
    ?.sort((a: any, b: any) => b.likes.length - a.likes.length);

  if (isError) {
    return <div className="text-center py-10">Error: {error.message}</div>;
  }
  // @ts-expect-error: error might happen

  const handleShare = (id) => {
    const postUrl = `${window.location.origin}/post/${id}`;

    navigator.clipboard.writeText(postUrl).then(
      () => {
        alert("Post URL copied to clipboard!");
      },
      (err) => {
        // @ts-expect-error: error might happen

        alert("Failed to copy the URL: ", err);
      }
    );
  };

  return (
    <div className="md:w-8/12  mt-8 mx-auto p-8">
      {/* Filters Section */}
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search by title, category, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg w-5/12"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-lg w-1/4"
        >
          <option value="">All Categories</option>
          {categoryData?.data?.map(
            (
              category: any // Use the fetched categories
            ) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            )
          )}
        </select>
        <button
          onClick={clearFilters}
          className="bg-[#49674a] text-white p-2 rounded-lg"
        >
          Clear Filters
        </button>
      </div>
      {filteredGardeningData?.length > 0 && (
        <>
          {" "}
          <h2 className="text-4xl font-bold mt-14 mb-4 text-center">
            All Gardening Articles
          </h2>
          <div className="flex justify-center">
            <div className="w-20 text-center rounded-md mb-4 h-[5px] bg-[#809580]"></div>
          </div>
        </>
      )}

      {filteredGardeningData?.length > 0 ? (
        filteredGardeningData?.map((gardening: any) => (
          <div
            key={gardening._id}
            className="bg-[#dbe1db] shadow-lg rounded-lg p-6 mb-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl text-[#425d43] font-semibold">
                {gardening.title}
              </h3>
              <p className="border-green-900 p-1 font-medium text-gray-500  text-sm border-2 rounded-xl">
                {gardening.tag === "free" ? "Free" : "Premium"}
              </p>
            </div>
            <p
              className="text-gray-700 mt-3 font-medium text-sm mb-4"
              dangerouslySetInnerHTML={{ __html: gardening.content }}
            >
              {/* {gardening.content} */}
            </p>
            <p className="text-gray-500 text-sm">
              Category: {gardening.category.name}
            </p>
            <p className="text-gray-600 mb-5">
              {gardening.hash.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="mr-2 text-sm font-bold text-[#425d43] hover:underline"
                >
                  #{tag}
                </span>
              ))}
            </p>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2">
              {gardening.images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image for ${gardening.title}`}
                  className="rounded-lg transition-transform transform hover:scale-105 mb-2 w-6/12 h-5/12"
                />
              ))}
            </div>

            <div className="flex items-center  justify-between text-lg ">
              <div className="flex items-center  gap-2 text-lg">
                <button
                  className="flex items-center text-[#425d43]"
                  onClick={() => handleToggleFavourite(gardening._id)}
                >
                  <FaRegHeart className="mr-2" />
                </button>
                <div className="flex items-center">
                  <button onClick={() => handleLikeClick(gardening._id)}>
                    {" "}
                    <AiFillLike className="mr-2" />
                  </button>

                  <p>{gardening.likes?.length}</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleDislikeClick(gardening._id)}>
                    <AiFillDislike className="mr-2" />
                  </button>

                  <p>{gardening.dislikes?.length}</p>
                </div>
              </div>
              <div className="flex items-center  gap-2 text-lg">
                <button className="flex items-center text-[#425d43]">
                  <FaDownload className="mr-2" />
                </button>
                <button
                  className="flex items-center text-[#425d43]"
                  onClick={() => handleShare(gardening._id)}
                >
                  <FaShare className="mr-2" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedPostId(gardening._id)}
              className="mt-4 block text-[#425d43] font-bold underline hover:text-[#425d43] transition"
            >
              View Comments
            </button>

            {selectedPostId === gardening._id && (
              <div className="mt-4">
                <form onSubmit={handleCommentSubmit} className="flex mb-4">
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
                </form>

                {commentsData?.data.map((comment: any) => (
                  <div key={comment._id} className="border-b py-2">
                    <p className="font-semibold">{comment.userId.name}</p>
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
                      <div className=" h-9  w-10 py-1 px-2 rounded-full bg-[#49674a] ">
                        <button
                          onClick={() => setEditingCommentId(comment._id)}
                          className="text-2xl text-white underline"
                        >
                          <MdOutlineModeEdit />
                        </button>
                      </div>
                      <div className=" h-9  w-10 py-1 px-2 rounded-full bg-[#49674a] ">
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
        ))
      ) : (
        <>
          {" "}
          <h2 className="text-4xl font-bold mt-14 mb-4 text-center">
            No Gardening Articles
          </h2>
        </>
      )}
    </div>
  );
};

export default AllGardening;
