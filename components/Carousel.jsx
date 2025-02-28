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
            <h4 className="text-3xl md:text-4xl lg:text-5xl uppercase mb-0 md:mb-16">
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
              pauseOnMouseEnter={true}
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
                    <div className="card__media relative bg-white text-black p-4 md:p-6 min-h-[300px] md:min-h-[500px] flex flex-col justify-between">
                      {/* Special styled testimonial */}
                      {item.review && (
                        <div className="my-4 md:my-8 relative">
                          <div className="absolute -top-6 left-0 text-4xl md:text-6xl text-blue-500 opacity-50">"</div>
                          <p className="text-lg md:text-2xl lg:text-3xl text-gray-700 font-poppinsRegular uppercase italic text-center px-3 md:px-6 py-2 md:py-4 relative z-10 overflow-y-auto max-h-[250px] md:max-h-[350px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] cursor-grab active:cursor-grabbing select-none">
                            {item.review}
                          </p>
                          <div className="absolute -bottom-6 right-0 text-4xl md:text-6xl text-blue-500 opacity-50">"</div>
                        </div>
                      )}
                    
                      {/* Footer with brand and name in same row */}
                      <div className="mt-4 md:mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                        {item.name && (
                          <p className="text-base md:text-lg font-poppins text-black capitalize line-clamp-2">
                            {item.name}
                          </p>
                        )}
                        {item.brand && brandAppearance === true && (
                          <Link 
                            href={`/brands/${item.id || item.brandId}`}
                            className="text-base md:text-xl font-poppins text-black capitalize hover:text-blue-600 transition-colors duration-300 line-clamp-1"
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