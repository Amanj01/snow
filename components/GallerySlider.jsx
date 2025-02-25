"use client";
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

const GallerySlider = ({ gallery, title }) => {
  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <div className="w-full mb-12">
      <h3 className="text-2xl md:text-4xl lg:text-5xl  font-mansory uppercase mb-6 border-b border-gray-200 pb-2">
        {title || 'Gallery'}
      </h3>
      
      <div className="relative">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={false}
          
          loop={true}
          speed={800}
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="gallery-slider"
        >
          {gallery.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="overflow-hidden shadow-md relative h-96">
                <Image 
                  src={image.url} 
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GallerySlider;