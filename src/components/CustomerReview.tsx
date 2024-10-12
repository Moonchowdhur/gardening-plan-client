"use client";
import { useState } from "react";

const testimonials = [
  {
    image: "https://i.ibb.co/8bFnGsf/photo-1507003211169-0a1dd7228f2d.jpg",
    name: "John Doe",
    role: "Landscape Designer",
    review:
      "The gardening service transformed my backyard into a beautiful outdoor space. Highly professional and creative work!",
  },
  {
    image: "https://i.ibb.co/nQgzmys/photo-1506277886164-e25aa3f4ef7f.jpg",
    name: "Jane Smith",
    role: "Horticulturist",
    review:
      "The team was knowledgeable and helped me pick the perfect plants for my garden. Highly recommend their service!",
  },
  {
    image: "https://i.ibb.co/2MTGttP/photo-1618306842557-a2515acf2112.jpg",
    name: "Alice Johnson",
    role: "Homeowner",
    review:
      "Their gardening expertise brought my outdoor space to life. It exceeded all my expectations!",
  },
  {
    image: "https://i.ibb.co/8bFnGsf/photo-1507003211169-0a1dd7228f2d.jpg",
    name: "Robert Brown",
    role: "Garden Enthusiast",
    review:
      "The garden maintenance service was excellent. My plants are thriving and the garden looks amazing!",
  },
  {
    image: "https://i.ibb.co/nQgzmys/photo-1506277886164-e25aa3f4ef7f.jpg",
    name: "Emily White",
    role: "Plant Collector",
    review:
      "They helped me design the perfect plant layout. My garden is now a peaceful retreat thanks to their work.",
  },
  {
    image: "https://i.ibb.co/2MTGttP/photo-1618306842557-a2515acf2112.jpg",
    name: "Michael Green",
    role: "Botany Expert",
    review:
      "Impressed with their attention to detail and plant care knowledge. The service was top-notch!",
  },
  {
    image: "https://i.ibb.co/8bFnGsf/photo-1507003211169-0a1dd7228f2d.jpg",
    name: "Sarah Wilson",
    role: "Nature Lover",
    review:
      "My garden is flourishing thanks to their expert advice and regular care. Truly a delightful experience.",
  },
  {
    image: "https://i.ibb.co/2MTGttP/photo-1618306842557-a2515acf2112.jpg",
    name: "David Johnson",
    role: "Greenhouse Manager",
    review:
      "Fantastic gardening service! The plants are well-maintained and the overall design is beautiful.",
  },
];

const CustomerReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const isLastSlide = currentIndex === testimonials?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="md:px-12 w-full p-4 mt-16 rounded-md">
      <div className="container mx-auto">
        <h2 className="text-3xl mb-2 font-medium tracking-widest text-center">
          CUSTOMER REVIEWS
        </h2>
        {/* underline */}
        <div className="flex justify-center">
          <div className="w-20 text-center rounded-md  h-[5px] bg-[#809580]"></div>
        </div>

        <div className="relative mt-10">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform ease-out duration-300"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials?.map((testimonial, index) => (
                <div key={index} className="min-w-full flex justify-center p-4">
                  <div className="bg-[#809580] rounded-lg shadow-lg p-6 flex flex-col items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <p className="text-xl text-white font-medium mb-1">
                      {testimonial.name}
                    </p>
                    <p className="text-sm  text-white mb-3">
                      {testimonial.role}
                    </p>
                    <p className="text-gray-200 text-base mx-auto w-8/12 text-center mb-4">
                      {testimonial.review}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#809580] text-white rounded-full px-5 py-3"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#809580] text-white rounded-full px-5 py-3"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
