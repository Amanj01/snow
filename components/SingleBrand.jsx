import React from "react";
import Image from "next/image";
import { Carousel } from "@/components/Carousel"; 
import ResourcesSection from './Resources';

const SingleBrand = ({ brand, feedbacks, resources }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg">
      {/* Brand Image & Title */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
        <Image 
          src={brand.image} 
          alt={brand.name} 
          layout="fill" 
          objectFit="cover" 
          className="opacity-80" 
        />
        <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-white bg-black/50 px-4 py-2 rounded-lg">
          {brand.name}
        </h1>
      </div>

      {/* Brand Description */}
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        {brand.description}
      </p>

      {/* Feedback Carousel */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Customer Feedback
      </h2>
      <Carousel data={feedbacks} />

      {/* Resources Section */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
        Related Resources
      </h2>
      <ResourcesSection data={resources} />
    </div>
  );
};

export default SingleBrand;
