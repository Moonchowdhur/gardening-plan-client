"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FaUser } from "react-icons/fa";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUpdateUser } from "@/hooks/auth.hook";

import envConfig from "@/config/envConfig";
import { useUser } from "@/context/user.provider";

const updateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),

  address: z.string().min(1, "Address is required").optional(),
  phone: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .optional(),
  profilePicture: z.any().optional(),
});

type updateFormData = z.infer<typeof updateSchema>;

const UserUpdate = () => {
  const router = useRouter();
  const { user: userData } = useUser();

  console.log(userData?.email, "user");
  // @ts-expect-error: error might happen

  const { mutate: updateUser, isLoading } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateFormData>({
    resolver: zodResolver(updateSchema),
  });

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${envConfig.imagebbApi}`;

  console.log(image_hosting_api, "image_hosting_api");

  const onSubmit: SubmitHandler<updateFormData> = async (data) => {
    try {
      if (data.profilePicture) {
        const file = data.profilePicture[0];
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        console.log(result);

        if (result?.success) {
          data.profilePicture = result.data.url;
        } else {
          throw new Error("Failed to upload image");
        }
      }

      updateUser(
        {
          email: userData?.email,
          data,
        },
        {
          onSuccess: () => {
            toast.success("Updated successful!");
            router.push("/");
          },
          onError: (error) => {
            toast.error(
              error.message || "An error occurred during registration."
            );
          },
        }
      );
    } catch (error) {
      // @ts-expect-error: error might happen

      toast.error(error?.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="md:flex p-8 items-center justify-center h-full">
      <div className=" mb-20 gap-10 items-center justify-center md:mt-7">
        {/* Register picture */}

        {/* Registration form */}
        <div className="md:w-full w-full shadow-md bg-white rounded">
          <div className="text-center  mb-3 font-bold text-3xl justify-center gap-3 flex items-center">
            <FaUser className="text-[#49674a]" />
            <h1 className="animate-text text-[#49674a] text-xl font-semibold">
              Update your Profile
            </h1>
          </div>

          <hr className="mt-3" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3">
              <label htmlFor="name" className="block text-base mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name?.message}</p>
              )}
            </div>

            <div className="mt-3">
              <label htmlFor="profilePicture" className="block text-base mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                {...register("profilePicture")}
              />
              {errors.profilePicture && (
                // @ts-expect-error: error might happen

                <p className="text-red-500">{errors.profilePicture?.message}</p>
              )}
            </div>
            <div className="mt-3">
              <label htmlFor="phone" className="block text-base mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter Phone Number"
                className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone?.message}</p>
              )}
            </div>

            <div className="mt-3">
              <label htmlFor="address" className="block text-base mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter Address"
                className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-red-500">{errors.address?.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading} // Disable button if the mutation is pending
              className="mt-5 font-semibold text-xl border-2 w-full px-3 py-2 rounded-lg border-[#49674a] bg-[#49674a] hover:bg-transparent hover:text-[#49674a] text-white"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
