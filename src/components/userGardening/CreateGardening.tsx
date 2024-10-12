/* eslint-disable @typescript-eslint/no-explicit-any */
//ts-ignore
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";

import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlusCircle, FaPlus, FaMinus } from "react-icons/fa";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import the quill styles
import { useGetUserByEmail } from "@/hooks/auth.hook";
import { useGetAllTypeCategories } from "@/hooks/category.hook";
import { useUser } from "@/context/user.provider";
import { useCreateGardening } from "@/hooks/gardenings.hook";
import envConfig from "@/config/envConfig";
import { toast } from "sonner";

// Load Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Zod schema for validation

const createGardeningValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.any(),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID format"),
  images: z.array(z.string().url("Invalid image URL")).optional(),
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
  tag: z.enum(["free", "premium"], { required_error: "Tag is required" }),
  hash: z.array(z.string()).optional(),
});

type GardeningValidationSchema = z.infer<
  typeof createGardeningValidationSchema
>;

const CreateGardening = ({ setIsDialogOpen }: any) => {
  const { user } = useUser();
  // @ts-expect-error: error might happen

  const { data: userData } = useGetUserByEmail(user?.email);
  const userId = userData?.data?._id;

  const { data: categories } = useGetAllTypeCategories();
  const {
    mutate: createGardening,
    // @ts-expect-error: error might happen

    isLoading,
    isError,
    error,
  } = useCreateGardening();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(createGardeningValidationSchema),
  });

  const [editorContent, setEditorContent] = useState("");

  console.log(editorContent, "editorContent");

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [hashFields, setHashFields] = useState<string[]>([""]);

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${envConfig.imagebbApi}`;

  console.log(image_hosting_api, "image_hosting_api");
  const onSubmit: SubmitHandler<GardeningValidationSchema> = async (data) => {
    console.log(data, "data");
    const gardeningData = {
      ...data,
      userId,
      content: editorContent,
      hash: hashFields.filter((hash) => hash),
      images: [],
    };

    console.log(gardeningData);

    if (data?.images) {
      const file = data?.images[0];
      const formData = new FormData();
      formData.append("image", file);

      console.log(data, "formData");

      const response = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
        // headers: {

        // },
      });

      const result = await response.json();
      console.log(result);

      if (result?.success) {
        // @ts-expect-error: error might happen

        gardeningData.images.push(result.data.url);
      } else {
        throw new Error("Failed to upload image");
      }
    }

    console.log(gardeningData);

    createGardening(gardeningData, {
      onSuccess: () => {
        toast.success("Gardening added successfully!");
        window.location.reload();
      },
      onError: (error: any) => {
        toast.error(`Failed to add comment: ${error.message}`);
      },
    });
  };

  // Handle file change for image uploads
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImageFiles(filesArray);
    }
  };

  // Dynamic Hash Fields
  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const removeField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => {
      const newFields = [...prev];
      newFields[index] = value;
      return newFields;
    });
  };

  return (
    <Dialog onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <button className="text-lg rounded-lg -mt-8 px-3 py-1 bg-[#49674a] flex items-center gap-1 text-center text-white">
          <FaPlusCircle /> Create
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#557856]">Create Gardening</DialogTitle>
          <DialogDescription>
            <form
              // @ts-expect-error: error might happen

              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Title Field */}
              <div className="mb-2">
                <label className="block mb-2">Title</label>
                <Input type="text" {...register("title")} className="w-full" />
                {errors.title && (
                  // @ts-expect-error: error might happen

                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Content Field (Rich Text Editor) */}
              <div className="mb-2">
                <label className="block mb-2">Content</label>
                <ReactQuill value={editorContent} onChange={setEditorContent} />
                {errors.content && (
                  // @ts-expect-error: error might happen

                  <p className="text-red-500">{errors.content.message}</p>
                )}
              </div>

              {/* Category Field */}
              <div className="mb-2">
                <label className="block mb-2">Category</label>
                <select
                  {...register("category")}
                  className="w-full border border-gray-200 p-[9px] rounded-md"
                >
                  <option value="">Select Category</option>
                  {categories?.data?.map((category: any) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  // @ts-expect-error: error might happen

                  <p className="text-red-500">{errors.category.message}</p>
                )}
              </div>

              {/* Image Upload Field */}
              <div className="mb-2">
                {/* <label className="block mb-2">Images</label>
                <input
                  type="file"
                  accept="image/*"
                  id="profilePicture"
                  multiple
                  onChange={handleImageChange}
                  className="border border-gray-200 p-2 rounded-md w-full"
                />

                {errors.images && (
                  <p className="text-red-500">{errors.images.message}</p>
                )} */}

                <label htmlFor="images" className="block text-base mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                  {...register("images")}
                />
                {errors.images && (
                  // @ts-expect-error: error might happen

                  <p className="text-red-500">{errors.images?.message}</p>
                )}
              </div>

              {imageFiles.length > 0 && (
                <div className="mb-2">
                  <label className="block mb-2">Preview Images</label>
                  <div className="flex flex-wrap gap-2">
                    {imageFiles.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Image ${index + 1}`}
                        className="w-12 h-12 rounded-md object-cover border"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Hash Fields */}
              <div className="mb-2">
                <label className="block mb-2">Hash</label>
                {hashFields.map((hash, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      type="text"
                      value={hash}
                      onChange={(e) =>
                        updateField(index, e.target.value, setHashFields)
                      }
                      placeholder={`Hash ${index + 1}`}
                      className="w-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeField(index, setHashFields)}
                      className="ml-2 bg-red-600 text-white p-1 rounded-full"
                    >
                      <FaMinus />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField(setHashFields)}
                  className="bg-[#49674a] text-white p-1 rounded-md"
                >
                  <FaPlus />
                </button>
              </div>

              {/* Tag Field */}
              <div className="mb-2">
                <label className="block mb-2">Tag</label>
                <select
                  {...register("tag")}
                  className="w-full border border-gray-200 p-[9px] rounded-md"
                >
                  <option value="">Select Tag</option>
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
                {errors.tag && (
                  // @ts-expect-error: error might happen

                  <p className="text-red-500">{errors.tag.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`bg-[#49674a] mt-4 text-white p-2 rounded-md ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Gardening"}
              </button>

              {isError && <p className="text-red-500">{error.message}</p>}
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGardening;
