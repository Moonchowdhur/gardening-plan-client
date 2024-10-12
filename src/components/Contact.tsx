"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoCall } from "react-icons/io5";

import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="md:px-12 w-full p-4 mt-36 md:mt-12  rounded-md ">
      <div className="md:flex items-start gap-8  ">
        <div className="md:w-1/2 w-full rounded-lg   p-4">
          <div className=" w-full ">
            <h2 className="text-4xl tracking-widest mb-1 font-bold w-10/12 mx-auto text-center ">
              Visit Our Office
            </h2>
            <div className="flex justify-center mb-5 mt-3">
              <div className="bg-[#a4b3a5] text-center h-2 w-11 rounded-lg "></div>
            </div>
            <h2 className=" tracking-widest mb-7  w-8/12 mx-auto">
              73 Canal Street, Sibitra Pally, Shymbazar Road, Dharmatala,
              Kolkata-700030
            </h2>
            <img
              src="https://i.ibb.co/DrrtPmx/googl-ED.jpg"
              className="rounded-lg md:w-[700px] md:h-[540px]"
              alt=""
            />
          </div>
        </div>
        <div className="md:w-1/2  w-full rounded-lg   p-4">
          <div className=" w-full ">
            <h2 className="text-4xl tracking-widest mb-1 font-bold w-10/12 ">
              Leave Us a Message
            </h2>
            <div className="flex justify-start mb-5 mt-3">
              <div className="bg-[#a4b3a5] text-center h-2 w-11 rounded-lg "></div>
            </div>
            <h2 className=" md:tracking-widest mb-7  md:w-8/12 ">
              We value your feedback and inquiries. If you have any questions,
              concerns, or just want to share your thoughts, please leave us a
              message. Our team will get back to you as soon as possible. Your
              input helps us improve and serve you better.
            </h2>
            <div className="mt-5">
              <h2>Name*</h2>
              <div className="flex  justify-center">
                <input
                  name="name"
                  className="w-full rounded-lg border border-slate-300 mt-2 p-2 "
                />
              </div>
            </div>
            <div className="mt-2">
              <h2>Email*</h2>
              <div className="flex  justify-center">
                <input
                  name="email"
                  type="email"
                  className="w-full rounded-lg border border-slate-300 mt-2 p-2 "
                />
              </div>
            </div>
            <div className="mt-2">
              <h2>Phone Number*</h2>
              <div className="flex  justify-center">
                <input
                  name="number"
                  className="w-full rounded-lg border border-slate-300 mt-2 p-2 "
                />
              </div>
            </div>
            <div className="mt-8">
              <textarea
                id="message"
                name="message"
                rows={4} // Adjust the number of rows as needed
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-lg"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button className="text-white text-lg mt-6 mx-auto  px-5 py-2 rounded-lg  bg-[#49674a]">
              Send{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="md:grid-cols-4 grid-cols-1 grid  mx-3 items-center mt-10 gap-5">
        {/* cart */}
        <div className="text-center rounded-md p-3  ">
          <div className="flex bg-[#a4b3a5] animate-bounce rounded-full mx-auto w-20 h-20 items-center justify-center">
            <FaMapMarkerAlt className="mb-2 text-center text-black text-3xl" />
          </div>
          <h2 className="mb-1 text-lg font-medium">Address</h2>
          <p className="mb-2 text-base">73 Canal Street, Kolkata</p>
        </div>
        <div className="text-center rounded-md p-3 ">
          <div className="flex bg-[#a4b3a5]  animate-bounce  rounded-full mx-auto w-20 h-20 items-center justify-center">
            <MdAccessTimeFilled className="mb-2 text-center text-black text-4xl" />
          </div>
          <h2 className="mb-1 text-lg font-medium">OPENING HOURS</h2>
          <p className="mb-2 lg">Monday-Saturday: 8:00AM-9:00PM</p>
        </div>
        <div className="text-center rounded-md p-3 ">
          <div className="flex bg-[#a4b3a5]  animate-bounce  rounded-full mx-auto w-20 h-20 items-center justify-center">
            <IoCall className="mb-2 text-center text-black text-3xl" />
          </div>
          <h2 className="mb-1 text-lg font-medium">PHONE NUMBER</h2>
          <p className="mb-2 text-base">(+8777090567)</p>
        </div>
        <div className="text-center rounded-md p-3 ">
          <div className="flex  animate-bounce  bg-[#a4b3a5] rounded-full mx-auto w-20 h-20 items-center justify-center">
            <MdEmail className="mb-2 text-center text-black text-3xl" />
          </div>
          <h2 className="mb-1 text-lg font-medium">EMAIL</h2>
          <p className="mb-2 text-base">support@gardenlife.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
