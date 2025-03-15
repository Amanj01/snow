"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GallerySlider from "./GallerySlider";

const SingleItem = ({ data }) => {
  if (!data) return null;

  const { title, content, coverImage, gallery } = data;
 
  return (
    <section className="text-[#333333de]">
      {/* Cover image with title overlay */}
      <div className="w-full h-screen relative">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL+coverImage}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="w-full"
        />
        {/* Overlay content - only title */}
        <div className="absolute inset-0 bg-black bg-opacity-65 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 text-center text-white"
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-mansory uppercase mb-4">
              {title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Descriptions section below cover image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className=" px-4 py-6 text-left container mx-auto"
      >
        <p className="text-lg md:text-xl lg:text-2xl mb-6">{content}</p>
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 md:py-10">
        {/* Gallery Section */}
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