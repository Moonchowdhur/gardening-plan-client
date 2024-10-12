/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useDeleteGardeningPost,
  useGetCategories,
} from "@/hooks/gardenings.hook";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";

const AllGardenings = () => {
  const { data: gardeningData, isLoading, isError, error } = useGetCategories();
  const { mutate: deleteGardening } = useDeleteGardeningPost();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleDeleteGardening = (id: string) => {
    deleteGardening(id, {
      onSuccess: () => {
        toast.success("gardening deleted successfully!");
        window.location.reload();
      },
      onError: (error: any) => {
        toast.error(`Failed to delete comment: ${error.message}`);
      },
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-4xl font-bold  mb-4 text-center">
        All Gardening Articles
      </h2>
      <div className="flex justify-center">
        <div className="w-20 text-center rounded-md mb-4 h-[5px] bg-[#809580]"></div>
      </div>
      <table className="table-auto w-full border-collapse border border-[#49674a]">
        <thead>
          <tr>
            <th className="bg-[#49674a] font-medium text-white p-2">Title</th>
            <th className="bg-[#49674a] font-medium text-white p-2">Content</th>
            <th className="bg-[#49674a] font-medium text-white p-2">
              Category
            </th>
            <th className="bg-[#49674a] font-medium text-white p-2">Hash</th>
            <th className="bg-[#49674a] font-medium text-white p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {gardeningData?.data.map((gardening: any) => (
            <tr key={gardening._id}>
              <td className="border border-[#809580] p-2">{gardening.title}</td>
              <td className="border border-[#809580]  p-2">
                {gardening.content.substring(0, 50)}...
              </td>
              <td className="border border-[#809580]  p-2">
                {gardening.category.name}
              </td>
              <td className="border border-[#809580]  p-2">
                {gardening.hash.join(", ")}
              </td>
              <td
                className="border border-[#809580]  p-2 text-center"
                onClick={() => handleDeleteGardening(gardening._id)}
              >
                <MdDeleteForever className="text-2xl" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllGardenings;
