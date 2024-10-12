"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserRegistration } from "@/hooks/auth.hook";
import envConfig from "@/config/envConfig";

const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  // password: z
  //   .string()
  //   .min(6, { message: "Password must be at least 6 characters long" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must only contain digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  profilePicture: z.any().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const UserRegister = () => {
  const [eye, setEye] = useState(false);
  const router = useRouter();

  // Use the useUserRegistration hook
  const { mutate: handleUserRegister, isPending } = useUserRegistration();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
  //   handleUserRegister(data, {
  //     onSuccess: () => {
  //       toast.success("Sign up successful!");
  //       router.push("/login");
  //     },
  //     onError: (error) => {
  //       toast.error(error.message || "An error occurred during registration.");
  //     },
  //   });
  // };

  // const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
  //   try {
  //     // Check if a file was uploaded
  //     if (data.profilePicture) {
  //       const file = data.profilePicture;
  //       const formData = new FormData();
  //       formData.append("image", file);
  //       console.log(formData, "formData");
  //       // Upload to ImageBB or your chosen service
  //       const response = await fetch(
  //         "https://api.imgbb.com/1/upload?key=envConfig.imagebbApi",
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );
  //       const result = await response.json();

  //       console.log(result, "re");

  //       // Check if upload was successful
  //       if (result.success) {
  //         data.profilePicture = result.data.url; // Set the profilePicture URL
  //       } else {
  //         throw new Error("Failed to upload image");
  //       }
  //     }

  //     handleUserRegister(data, {
  //       onSuccess: () => {
  //         toast.success("Sign up successful!");
  //         router.push("/login");
  //       },
  //       onError: (error) => {
  //         toast.error(
  //           error.message || "An error occurred during registration."
  //         );
  //       },
  //     });
  //   } catch (error) {
  //     toast.error(error.message || "An error occurred during registration.");
  //   }
  // };
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${envConfig.imagebbApi}`;

  console.log(image_hosting_api, "image_hosting_api");

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      if (data.profilePicture) {
        const file = data.profilePicture[0];
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
          data.profilePicture = result.data.url;
        } else {
          throw new Error("Failed to upload image");
        }
      }

      // Handle user registration
      handleUserRegister(data, {
        onSuccess: () => {
          toast.success("Sign up successful!");
          router.push("/login");
        },
        onError: (error) => {
          toast.error(
            error.message || "An error occurred during registration."
          );
        },
      });
    } catch (error) {
      // @ts-expect-error: error might happen

      toast.error(error?.message || "An error occurred during registration.");
    }
  };

  return (
    <div className="md:flex items-center justify-center h-full p-4">
      <div className="md:flex mb-20 gap-10 items-center justify-center md:mt-7">
        {/* Register picture */}
        <div>
          <img
            src="https://i.ibb.co/NyV82dX/undraw-Mobile-login-re-9ntv.png"
            className="w-[500px]"
            alt="Sign up illustration"
          />
        </div>

        {/* Registration form */}
        <div className="md:w-8/12 w-full p-6 shadow-md bg-white rounded">
          <div className="text-center mb-3 font-bold text-3xl justify-center gap-3 flex items-center">
            <FaUser className="text-[#49674a]" />
            <h1 className="animate-text text-[#49674a] text-xl font-semibold">
              Sign up to your account
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
              <label htmlFor="email" className="block text-base mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email?.message}</p>
              )}
            </div>

            <div className="mt-3">
              <label htmlFor="password" className="block text-base mb-2">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={eye ? "text" : "password"}
                  id="password"
                  placeholder="Enter Password"
                  className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                  {...register("password")}
                />
                <span onClick={() => setEye(!eye)}>
                  {eye ? (
                    <AiFillEye className="text-4xl border focus:outline-none focus:ring-0 focus:border-gray-600 rounded" />
                  ) : (
                    <AiFillEyeInvisible className="text-4xl border focus:outline-none focus:ring-0 focus:border-gray-600 rounded" />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password?.message}</p>
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
              disabled={isPending}
              className="mt-5 font-semibold text-xl border-2 w-full px-3 py-2 rounded-lg border-[#49674a] bg-[#49674a] hover:bg-transparent hover:text-[#49674a] text-white"
            >
              {isPending ? "Signing up..." : "Sign up"}
            </button>
          </form>
          <button className="mt-3">
            <small>
              Already have an account?{" "}
              <span className="text-[#49674a] font-semibold underline">
                <Link href="/login">Login</Link>
              </span>
            </small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
