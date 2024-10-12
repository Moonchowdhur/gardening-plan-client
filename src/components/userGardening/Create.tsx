/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import "react-quill/dist/quill.snow.css";
import { useGetUserByEmail } from "@/hooks/auth.hook";
import { useGetAllTypeCategories } from "@/hooks/category.hook";
import { useUser } from "@/context/user.provider";
import { useCreateGardening } from "@/hooks/gardenings.hook";

// Load Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Zod schema for validation
const createGardeningValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID format"),
  images: z.array(z.string().url("Invalid image URL")).optional(),
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
  tag: z.enum(["free", "premium"], { required_error: "Tag is required" }),
  hash: z.array(z.string()).optional(),
});

const CreateGardening = ({ setIsDialogOpen }: any) => {
  const { user } = useUser();
  // @ts-expect-error: error might happen

  const { data: userData } = useGetUserByEmail(user?.email);
  const userId = userData?.data?._id;

  // Fetch categories for dropdown
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
    resolver: zodResolver(createGardeningValidationSchema),
  });

  // Rich text content state
  const [editorContent, setEditorContent] = useState("");

  // State to manage dynamic fields
  const [imageFields, setImageFields] = useState<string[]>([""]);
  const [hashFields, setHashFields] = useState<string[]>([""]);

  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const gardeningData = {
      ...data,
      userId,
      content: editorContent, // Include content from the rich text editor
      images: imageFields.filter((url) => url),
      hash: hashFields.filter((hash) => hash),
    };
    console.log(gardeningData);

    // Uncomment the following when connecting to the backend:
    // createGardening(gardeningData, {
    //   onSuccess: () => {
    //     reset(); // Reset form on success
    //     setIsDialogOpen(false); // Close dialog
    //   },
    // });
  };

  // Dynamic Fields Functions
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
            <form onSubmit={handleSubmit(onSubmit)}>
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

              {/* Dynamic Image Fields */}
              <div className="mb-2">
                <label className="block mb-2">Images</label>
                {imageFields.map((image, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Input
                      type="text"
                      value={image}
                      onChange={(e) =>
                        updateField(index, e.target.value, setImageFields)
                      }
                      placeholder={`Image URL ${index + 1}`}
                      className="w-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeField(index, setImageFields)}
                      className="ml-2 bg-red-600 p-1 text-white rounded-full"
                    >
                      <FaMinus />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addField(setImageFields)}
                  className="bg-[#49674a] text-white p-1 rounded-full"
                >
                  <FaPlus />
                </button>
                {errors.images && (
                  // @ts-expect-error: error might happen

                  <p className="text-red-500">{errors.images.message}</p>
                )}
              </div>

              {imageFields.length > 0 && (
                <>
                  {" "}
                  <div className="mb-2">
                    <label className="block mb-2">Preview Images</label>
                    <div className="flex flex-wrap gap-2">
                      {imageFields.map(
                        (url, index) =>
                          url && (
                            <img
                              key={index}
                              src={url}
                              alt={`Image ${index + 1}`}
                              className="w-12 h-12 rounded-md object-cover border"
                            />
                          )
                      )}
                    </div>
                  </div>
                </>
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
                  className="bg-[#49674a] text-white p-1 rounded-full"
                >
                  <FaPlus />
                </button>
                {errors.hash && (
                  // @ts-expect-error: error might happen

                  <p className="text-red-500">{errors.hash.message}</p>
                )}
              </div>

              <button
                type="submit"
                className={`mt-4 px-4 py-2 rounded-md bg-[#49674a] text-white  ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Gardening"}
              </button>
            </form>
            {isError && <p className="text-red-500">{error.message}</p>}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGardening;
