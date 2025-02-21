"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const Carousel = ({ data, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const titleWords = title.split(" ");
  const firstWord = titleWords[0];
  const remainingWords = titleWords.slice(1).join(" ");

  return (
    <section className="w-screen bg-gray-50">
      <div
        ref={containerRef}
        className="mb-20 md:min-w-[820px] pb-24 pt-7 md:pb-28 md:pt-10 container mx-auto"
      >
        {/* Title Section */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center"
          >
            <h4 className="text-3xl md:text-5xl lg:text-6xl uppercase mb-6 md:mb-10 lg:mb-14">
              <span className="text-blue-600">{firstWord}</span> <span className="text-black">{remainingWords}</span>
            </h4>
          </motion.div>
        )}

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 400 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="relative"
        >
          {/* the auto play works for large screen if we have more than 3 slides 
          same thig for ipad but if the slide number is more than 2 for mobile happen if slide number is more than 1 */}
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
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`card__wrapper bg-background rounded-md shadow-lg transition-transform duration-500 ease-in-out
                ${index === activeIndex ? "scale-105" : "scale-90"}`}
                >
                  <div className="card__media relative bg-white text-black p-6 md:min-h-[500px] flex flex-col justify-center items-center">
                    <div className="card__content w-full h-full flex flex-col justify-between py-8">
                      {item.brand && (
                        <h3 className="text-xl md:text-3xl font-mansory text-center text-blue-600 uppercase mb-8">
                          {item.brand}
                        </h3>
                      )}
                      {item.feedback && (
                        <p className="text-2xl md:text-4xl text-gray-500 font-light italic text-center mb-12">
                          "{item.feedback}"
                        </p>
                      )}
                      {item.username && (
                        <p className="text-lg md:text-2xl font-bold text-center text-teal-600">
                          - {item.username}
                        </p>
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
