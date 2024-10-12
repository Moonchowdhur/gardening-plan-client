import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Link from "next/link";

const carouselItems = [
  {
    image: "https://i.ibb.co/G5fn29n/Grow-sunflower-at-home-0-1200.jpg",
    title: "Discover Expert Gardening Tips.",
    description:
      "Grow your dream garden with step-by-step guidance and expert advice.",
  },
  {
    image: "https://i.ibb.co/G5fn29n/Grow-sunflower-at-home-0-1200.jpg",
    title: "Your Ultimate Gardening Guide.",
    description:
      "Get practical tips and detailed guides to transform your outdoor space.",
  },
  {
    image: "https://i.ibb.co/G5fn29n/Grow-sunflower-at-home-0-1200.jpg",
    title: "Nurture Your Plants with Confidence.",
    description:
      "Learn the best gardening practices for a thriving, healthy garden.",
  },
];
const Hero = () => {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <div
                className="relative md:px-12 mt-40 w-full p-4 md:mt-0 rounded-md min-h-[350px] flex items-center justify-center"
                style={{
                  backgroundImage: `url('${item.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="relative z-10 text-center text-white">
                  <h1 className="mb-5 text-3xl md:text-5xl font-bold">
                    {item.title}
                  </h1>
                  <p className="mb-5 text-xl ">{item.description}</p>
                  <Link
                    href="/"
                    className="bg-[#7AAC7B] mt-8 text-white text-base hover:bg-[#557856] font-medium py-3 px-5 tracking-wider rounded-lg"
                  >
                    Click Favourite
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-[#7AAC7B] mt-12 md:mt-0 ml-16 text-white" />
        <CarouselNext className="bg-[#7AAC7B] md:mt-0 mt-12 mr-16 text-white" />
      </Carousel>
    </div>
  );
};

export default Hero;
