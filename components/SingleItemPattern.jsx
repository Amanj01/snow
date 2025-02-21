"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
 import GallerySlider from "./GallerySlider";

const SingleItem = ({ data, type }) => {
  if (!data) return null;

  const { title, subtitle, coverImage, description, gallery } = data;
  const isBlog = type === "blog";

  return (
    <section className="px-4 md:px-6 py-16 md:py-24 text-[#333333] bg-gray-50">
      <div className="container mx-auto pt-14">
        {/* Header with title in style of ResourcesSection */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-mansory uppercase mb-4 sm:mb-0 text-black">
            {title}
          </h1>
          <span className={`px-3 py-1 text-xs text-white font-medium ${isBlog ? "bg-red-500" : "bg-blue-700"}`}>
            {isBlog ? "BLOG" : "MEDICAL DEVICE"}
          </span>
        </div>

        {/* Main content area with left border accent like resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-l-2 border-red-500 pl-4 transition-colors duration-300 mb-12"
        >
          {/* Subtitle */}
          <p className="text-sm text-gray-600 mb-6">{subtitle}</p>

          {/* Main Image */}
          <div className="w-full h-96 relative mb-8">
            <Image
              src={coverImage}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="shadow-md"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
          
          <hr className="border-t border-gray-200 w-full my-8" />
        </motion.div>

        {/* Gallery Section */}
        {gallery && gallery.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl uppercase text-black">
                {isBlog ? "Supporting Media" : "Product Gallery"}
              </h2>
              <div className="flex-grow h-[1px] bg-gray-300"></div>
            </div>
            
            <GallerySlider gallery={gallery} title="" />
          </div>
        )}

      </div>
    </section>
  );
};

export default SingleItem;