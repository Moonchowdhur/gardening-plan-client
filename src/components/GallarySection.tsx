"use client";
import React, { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import { Card } from "./ui/card";

const images = [
  {
    src: "https://i.ibb.co/WcY0HzY/fa.jpg",
    title: "Lily Flower",
  },
  {
    src: "https://i.ibb.co/4F9T1vV/Crown-daisy.webp",
    title: "Daisy Flower",
  },
  {
    src: "https://i.ibb.co/mNcX6Yw/f.jpg",
    title: "Tulip Flower",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnntWtPrhpqN9xB8ortR5IlZRgcggkvHjySg&s",
    title: "strawberries",
  },
  {
    src: "https://cdn.mos.cms.futurecdn.net/NRxrnUVoj8hj9auMXctNui.jpg",
    title: "Peppers",
  },
  {
    src: "https://img.staticmb.com/mbcontent/images/crop/uploads/2024/5/Grow-sunflower-at-home_0_1200.jpg",
    title: "Sunflower",
  },
  {
    src: "https://growbags.in/wp-content/uploads/2023/02/Tomato-Gardening-Simplified-with-Round-Shape-Grow-Bags.jpg",
    title: "Tomato ",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU59gt6OmNvo8sJVOTaKQZSMRdPq25pi5ZUjBK4gCMdIqsfUyiTBqIKuZB7Lakg8GmG7g&usqp=CAU",
    title: "Apple",
  },
];

const GallarySection = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <div className="container  mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-4 text-center">Gardening Gallery</h2>
      <div className="flex justify-center">
        <div className="w-20 text-center rounded-md mb-4 h-[5px] bg-[#809580]"></div>
      </div>
      <p className="text-lg text-center mb-8">
        Explore our recent gardening images and beautiful landscapes.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <Card
            key={index}
            className="relative overflow-hidden shadow-md transition-transform transform hover:scale-105"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-duration="600"
          >
            <img
              src={image.src}
              alt={image.title}
              width={400}
              height={300}
              className="object-cover w-full h-48 transition-opacity duration-300 ease-in-out"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
              <h3 className="text-white text-xl font-semibold">
                {image.title}
              </h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GallarySection;
