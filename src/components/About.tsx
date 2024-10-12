"use client";
import { Card, CardContent } from "@/components/ui/card";
import AOS from "aos";
import { useEffect } from "react";

const teamMembers = [
  {
    name: "Alice Green",
    title: "Co-Founder & Chief Gardener",
    description:
      "Alice has over 10 years of experience in organic gardening and sustainable agriculture.",
    imageUrl: "https://i.ibb.co/nQgzmys/photo-1506277886164-e25aa3f4ef7f.jpg",
  },
  {
    name: "Bobi Bloom",
    title: "Lead Designer & Horticulturist",
    description:
      "Bob specializes in garden design and plant selection, creating beautiful and functional spaces.",
    imageUrl:
      "https://i.ibb.co/yFVRZLv/young-beautiful-girl-posing-black-leather-jacket-park-1153-8104.jpg",
  },
  {
    name: "Charlie Soil",
    title: "Community Outreach Coordinator",
    description:
      "Charlie works to engage the community through workshops and educational programs.",
    imageUrl: "https://i.ibb.co/2MTGttP/photo-1618306842557-a2515acf2112.jpg",
  },
];

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-[#49674a] mt-40 md:mt-0 text-white py-16">
      {/* Our Mission Section */}
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-4xl font-bold mb-4 text-center">Our Mission</h2>
        <div className="flex justify-center">
          <div className="w-20 text-center rounded-md mb-4 h-[5px] bg-[#809580]"></div>
        </div>
        <p className="text-lg leading-relaxed text-center max-w-2xl mx-auto">
          Our mission is to inspire and empower individuals to cultivate their
          own gardens, promoting sustainable practices that benefit both people
          and the planet. We believe that gardening not only enhances the beauty
          of our surroundings but also nurtures the mind and spirit.
        </p>
      </div>
      {/* Meet the Team  */}
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-4xl font-bold mb-4 text-center">Meet Our Team</h2>
        <div className="flex justify-center">
          <div className="w-20 text-center rounded-md mb-4 h-[5px] bg-[#809580]"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
              className="bg-[#c8d1c9] shadow-lg"
            >
              <CardContent>
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="mb-4 mt-5 w-16 h-16 rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold text-center">
                  {member.name}
                </h3>
                <p className="text-sm text-center">{member.title}</p>
                <p className="text-sm text-center mt-2">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      s{/* Our Story Section */}
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4 text-center">Our Vision</h2>
        <div className="flex justify-center">
          <div className="w-20 text-center rounded-md mb-4 h-[5px] bg-[#809580]"></div>
        </div>
        <p className="text-base leading-relaxed text-center max-w-2xl mx-auto">
          We envision a world where everyone has access to green spaces,
          fostering communities that value biodiversity and ecological balance.
          Our goal is to create resources and tools that make gardening
          accessible to all, regardless of experience.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
