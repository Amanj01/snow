"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

const GallerySlider = ({ gallery, title }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <>
      <div className="w-full mb-12">
        <h3 className="text-2xl md:text-4xl lg:text-5xl font-mansory uppercase mb-6 border-b border-gray-200 pb-2">
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
                <div 
                  className="overflow-hidden shadow-md relative h-96 cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image 
                    src={process.env.NEXT_PUBLIC_API_URL+image.imagePath} 
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

      {/* Modal/Lightbox with Slider */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button 
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-50"
          >
            ×
          </button>
          
          <div className="w-full h-full flex items-center justify-center">
            <Swiper
              initialSlide={selectedImageIndex}
              spaceBetween={0}
              slidesPerView={1}
              navigation={true}
              modules={[Navigation]}
              className="modal-slider w-full h-full"
            >
              {gallery.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-screen h-screen flex items-center justify-center p-4">
                    <Image
                      src={process.env.NEXT_PUBLIC_API_URL+image.imagePath}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="max-w-full max-h-full"
                      priority
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySlider;
