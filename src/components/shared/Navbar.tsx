"use client";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/AuthServices";
import { FaUserSecret, FaUserTie } from "react-icons/fa";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user, setIsLoading: userLoading } = useUser();

  console.log(user, "uuu");

  const handleLogout = () => {
    logout();
    userLoading(true);
    // if (protectedRoutes.some((route) => pathname.match(route))) {
    //   router.push("/");
    // }
  };

  //   "text-[#FAFFAF]"

  return (
    <div className="bg-[#49674a]  top-0 z-20  flex items-center justify-between font-medium  h-[70px] p-4 md:px-12  text-white ">
      {/* keyboard logo or name */}
      <Link href="/" className="flex gap-2 items-center">
        <img
          src="https://i.ibb.co/tZNs5QG/infinity-business-centre-salt-lake-city-sector-5-kolkata-offices-on-hire-wmy3f.jpg"
          className="md:w-12 md:h-10 w-6 h-6 rounded-full"
          alt=""
        />
        <h2 className="text-base md:text-2xl">
          Gardening <span className="text-[#FAFFAF]">Plan </span> Tips
        </h2>
      </Link>
      {/* others */}
      <div>
        <ul
          className={`md:flex gap-8 z-10 md:bg-transparent text-white  font-medium md:static absolute text-xl items-center ${
            open
              ? "top-20 right-7 p-3 bg-[#695802]  text-black"
              : "-top-48 right-0"
          } `}
        >
          <li className="text-xl font-medium">
            <Link href="/">Home</Link>
          </li>
          <li className="text-xl font-medium">
            <Link href="/about">About Us</Link>
          </li>
          <li className="text-xl font-medium">
            <Link href="/gallary">Gallary</Link>
          </li>
          <li className="text-xl font-medium">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="text-xl font-medium">
            <Link href="/review">Review</Link>
          </li>

          {user?.role === "admin" && (
            <li className="text-xl ml-5">
              <Link href="/admindashboard">
                <FaUserSecret className="text-[#FAFFAF] text-2xl" />
              </Link>
            </li>
          )}
          {user?.role === "user" && (
            <li className="text-xl ml-5">
              <Link href="/userdashboard">
                <FaUserTie className="text-[#FAFFAF] text-2xl" />
              </Link>
            </li>
          )}
        </ul>
      </div>
      {/* login or logout */}
      <div>
        {user?.email ? (
          <div className="flex items-center gap-3">
            {" "}
            <h2 className="text-sm">{user?.email}</h2>
            <button
              onClick={() => handleLogout()}
              className="text-base p-2 border-2  rounded-lg border-[#FAFFAF]"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-base p-2 border-2  rounded-lg border-[#FAFFAF]"
          >
            Login
          </Link>
        )}
      </div>
      {/* hambarg menu */}
      <div className="md:hidden text-xl" onClick={() => setOpen(!open)}>
        {open ? <ImCross /> : <FaHamburger />}
      </div>
    </div>
  );
};

export default Navbar;
