"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/hero2.jpg',
  '/hero3.jpg',
];

const words = ['health', 'lives', 'days'];

export default function FullscreenImageBottomCard() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Full-width image section with overlay at bottom */}
      <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={images[currentImage]}
              alt="Healthcare professional"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Card section at the bottom of the image */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:mr-8 md:max-w-xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
                  Better{' '}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWord}
                      className="text-blue-500 inline-block"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {words[currentWord]}
                    </motion.span>
                  </AnimatePresence>
                </h1>
                
                <p className="text-gray-600 mb-0 text-sm md:text-base">
                  Medic Care is a Bootstrap 5 Template provided by TemplateMo
                  website. Credits go to FreePik and RawPixel for images used in this
                  template.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 transition-colors duration-300 w-full sm:w-auto text-center">
                  LEARN MORE
                </button>
                <span className="text-gray-600 whitespace-nowrap">📱 010-020-0340</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image indicators */}
        <div className="absolute bottom-32 md:bottom-36 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentImage ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              onClick={() => setCurrentImage(i)}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}