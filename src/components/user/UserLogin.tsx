"use client";

import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";

import Link from "next/link";
import { useUserLogin } from "@/hooks/auth.hook";
import { toast } from "sonner";

const UserLogin = () => {
  const { register, handleSubmit } = useForm();
  const [eye, setEye] = useState(false);

  const {
    mutate: handleUserLogin,
    isPending,

    isSuccess,
  } = useUserLogin();

  const searchParams = useSearchParams();
  const router = useRouter();

  const redirect = searchParams.get("redirect");

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   console.log(data);
  //   handleUserLogin(data);
  //   toast.success("User logged successfully!");
  // };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data, {
      onSuccess: () => {
        toast.success("logged successful!");
        router.push("/");
      },
      onError: (error) => {
        toast.error(error.message || "An error occurred during registration.");
      },
    });
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router]);

  return (
    <div className="md:flex items-center justify-center h-full md:p-16">
      <div className="md:flex mb-20 mt-36 gap-10 items-center justify-center md:mt-7">
        {/* Login Picture */}
        <div>
          <img
            src="https://i.ibb.co/NyV82dX/undraw-Mobile-login-re-9ntv.png"
            className="w-[500px]"
            alt="Login Illustration"
          />
        </div>

        {/* Login Form */}
        <div className="w-96 p-6 shadow-md bg-white rounded">
          <div className="text-center mb-3 font-bold text-3xl justify-center gap-3 flex items-center">
            <FaUser className="text-[#49674a]" />
            <h1 className="animate-text text-[#49674a] text-xl font-semibold">
              Sign in to your account
            </h1>
          </div>

          <hr className="mt-3" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3">
              <label htmlFor="email" className="block text-base mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter Email"
                className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password" className="block text-base mb-2">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={eye ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Enter Password"
                  className="border w-full px-2 focus:outline-none text-base py-1 focus:ring-0 focus:border-gray-600 rounded"
                />
                <span onClick={() => setEye(!eye)}>
                  {eye ? (
                    <AiFillEye className="text-4xl border focus:outline-none focus:ring-0 focus:border-gray-600 rounded" />
                  ) : (
                    <AiFillEyeInvisible className="text-4xl border focus:outline-none focus:ring-0 focus:border-gray-600 rounded" />
                  )}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <label className="label gap-2 flex items-center cursor-pointer">
                <input type="checkbox" className="checkbox" />
                <span className="label-text">Remember Me</span>
              </label>
            </div>
            <button
              type="submit"
              className="mt-5 font-semibold text-xl border-2 w-full px-3 py-2 rounded-lg border-[#49674a] bg-[#49674a] hover:bg-transparent hover:text-[#49674a] text-white"
            >
              Sign in
            </button>
          </form>

          <button className="mt-3 flex justify-between items-center gap-5">
            <small>
              Don’t have an account yet?{" "}
              <span className="text-[#49674a] font-semibold underline">
                <Link href="/register">Sign up</Link>
              </span>
            </small>
          </button>
          {/* <button>
            <small>
              <span className="text-[#49674a] font-semibold underline">
                <Link href="/forgetpassword">Forget Password</Link>?
              </span>
            </small>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
