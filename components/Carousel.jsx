"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/autoplay";

const Carousel = ({ comments, title, brandAppearance }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section className="w-screen px-2 md:px-4 lg:px-6">
      <div
        ref={containerRef}
        className="md:min-w-[820px] container mx-auto"
      >
        {/* Title Section */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-left font-mansory"
          >
            <h4 className="text-3xl md:text-4xl lg:text-5xl uppercase md:mb-14">
              {title}
            </h4>
          </motion.div>
        )}
          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 400 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="relative carousel-container"
          >
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              initialSlide={3}
              spaceBetween={24}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              speed={800}
              modules={[Autoplay]}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1400: { slidesPerView: 4 },
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="frames__slider"
            >
              {comments.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`card__wrapper bg-background rounded-sm md:shadow-md transition-transform duration-500 ease-in-out
                    ${index === activeIndex ? "scale-105" : "scale-90"}`}
                  >
                    <div className="card__media relative bg-white text-black p-6 md:min-h-[500px] flex flex-col justify-between">
                      {/* Special styled testimonial */}
                      {item.review && (
                        <div className="my-8 relative top-1/2 transform translate-y-1/2">
                          <div className="absolute -top-6 left-0 text-6xl text-blue-500 opacity-50">"</div>
                          <div className="max-h-[150px] overflow-y-auto scrollbar-hide mb-4">
                            <p className="text-2xl md:text-3xl text-gray-700 font-poppinsRegular uppercase italic text-center px-6 py-4 relative z-10">
                              {item.review}
                            </p>
                          </div>
                          <div className="absolute -bottom-6 right-0 text-6xl text-blue-500 opacity-50">"</div>
                        </div>
                      )}
                      {/* Footer with brand and name in same row */}
                      <div className="mt-8 flex justify-between items-center">
                        {item.name && (
                          <p className="text-lg font-poppins text-black capitalize">
                            {item.name}
                          </p>
                        )}
                        {item.brand && brandAppearance === true && (
                          <Link 
                            href={`/brands/${item.id || item.brandId}`}
                           className="text-xl font-poppins text-black capitalize hover:text-blue-600 transition-colors duration-300"
                          >
                            {item.brand}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
      </div>
    </section>
  );
};

  export default Carousel;