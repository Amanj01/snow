"use client";
import React, { useState, useRef, useEffect } from "react";
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

  let slideNumber = comments.length;
  if(slideNumber <= 3){
    slideNumber = 1; 
  }else if(slideNumber < 6){
    slideNumber = 2;
  }else {
    slideNumber = 4;
  }
  

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
            style={{
              ['--carousel-gradient-width']: slideNumber == 1? "0%" : "13%", // Adjust this value as needed
            }}
          >
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              initialSlide={3}
              spaceBetween={24}
              slidesPerView={1}
              centeredSlides={true}
              pauseOnMouseEnter={true}
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
                768: { slidesPerView: slideNumber == 1 ? 1 : 2},
                1024: { slidesPerView: slideNumber },
                1400: { slidesPerView: slideNumber },
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
                          <div className="absolute -top-6 text-6xl text-blue-500 opacity-50" style={{paddingLeft: slideNumber==1 ?"20px" : "0px"}}>"</div>
                          <div className="max-h-[150px] mb-12 overflow-y-auto scrollbar-hide">
                            <p className="text-2xl md:text-3xl text-gray-700 font-poppinsRegular uppercase italic text-center px-6 py-4 relative z-10">
                              {item.review}
                            </p>
                          </div>
                          <div className="absolute -bottom-6 text-6xl text-blue-500 opacity-50" style={{right: slideNumber==1 ?"30px" : "0px"}}>"</div>
                        </div>
                      )}
                      {/* Footer with brand and name in same row */}
                      <div className="mt-16 flex justify-between items-center">
                        {item.name && (
                          <p className="text-lg font-poppins text-black capitalize" style={{left: slideNumber==1 ?"20px" : "0px" , paddingLeft: slideNumber==1? "10px" : "  "} }>
                            {item.name}
                          </p>
                        )}
                        {item.brand && brandAppearance === true && (
                          <Link 
                            href={`/brands/${item.id || item.brandId}`}
                           className="text-xl font-poppins text-black capitalize hover:text-blue-600 transition-colors duration-300"
                          >
                            {item.brand.name}
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