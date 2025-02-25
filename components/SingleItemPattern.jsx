"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GallerySlider from "./GallerySlider";

const SingleItem = ({ data, type }) => {
  if (!data) return null;

  const { title, subtitle, coverImage, description, gallery } = data;
 
  return (
    <section className="text-[#333333]py-16 md:py-24">
      {/* Full width image at the top */}
      <div className="w-full h-screen relative container mx-auto">
        <Image
          src={coverImage}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="w-full"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Title below the image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-mansory uppercase mb-4 text-black">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm text-gray-600 mb-6">{subtitle}</p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
          
          <hr className="border-t border-gray-200 w-full my-8" />
        </motion.div>

        {/* Gallery Section - with single title */}
        {gallery && gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            
            <GallerySlider gallery={gallery} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SingleItem;