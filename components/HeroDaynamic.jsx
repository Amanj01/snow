"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroSection = ({ data }) => {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src={data.coverMedia}
        alt={data.title}
        fill
        priority
        style={{ objectFit: 'cover' }}
        className="z-0"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div className="text-center text-white px-4 font-mansory uppercase max-w-4xl">
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 mx-auto"
          >
            {data.title}
          </motion.h1>
           <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto"
          >
            {data.description}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;