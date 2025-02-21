"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const ItemSlider = ({ 
  items, 
  title, 
  accentColor = "#0052CC",
  highlightColor = "#FF3B30",
  autoScrollInterval = 4000,
  basePath = "/products" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      handleScrollRight();
    }, autoScrollInterval);
    return () => clearInterval(interval);
  }, [autoScrollInterval]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const cardWidth = cardRef.current?.offsetWidth || 300;
      const gap = 24;

      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          }
        }, 2000);
      } else {
        scrollContainerRef.current.scrollBy({
          left: cardWidth + gap,
          behavior: "smooth",
        });
      }
    }
  };

  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Handle case where items array is empty or not provided
  if (!items || items.length === 0) {
    return null;
  }

  // Extract title parts (assuming format: "X By Y")
  const titleParts = title ? title.split(" By ") : ["Products", "Company"];
  const mainTitle = titleParts[0];
  const subTitle = titleParts.length > 1 ? titleParts[1] : "";

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={animation}
      className="bg-white"
    >
      <div className="w-screen container mx-auto px-6 md:px-16 lg:px-24 pt-16 md:pt-20 lg:pt-24 pb-16">
        <div className="flex items-center justify-between mb-10 md:mb-16">
          <div className="relative w-full text-center">
            <h1 className="text-2xl md:text-5xl font-bold tracking-tight">
              <span style={{ color: accentColor }}>{mainTitle}</span>
              {subTitle && <span className="text-black"> By {subTitle}</span>}
            </h1>
            <div 
              className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-48 h-1" 
              style={{ backgroundColor: highlightColor }}
            />
          </div>
          <button
            onClick={handleScrollRight}
            className="ml-4 p-2 transition-colors duration-200 text-white"
            style={{ backgroundColor: accentColor }}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="relative">
          <div className="absolute top-0 right-0 w-28 h-full bg-gradient-to-l from-white z-10 pointer-events-none" />
          
          <div
            ref={scrollContainerRef}
            className="grid grid-flow-col gap-6 overflow-x-auto scrollbar-hide pb-4"
          >
            {items.map((item, index) => (
              <Link href={`${basePath}/${item.slug || `item-${item.id}`}`} key={index}>
                <div
                  ref={index === 0 ? cardRef : null}
                  className="group cursor-pointer w-[300px] md:w-[320px] lg:w-[340px] max-h-[410px] border border-gray-200 hover:border-[#0052CC] transition-all duration-300"
                  style={{ 
                    '--hover-border-color': accentColor 
                  } }
                >
                  <div className="relative h-52 md:h-56 overflow-hidden">
                    <Image
                      src={item.cardImage}
                      alt={item.name}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(max-width: 768px) 300px, 350px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
                  </div>
                  
                  <div className="p-5 h-36 flex flex-col justify-between bg-white mb-2">
                    <div>
                      {item.brandName && (
                        <p className="text-sm mb-2" style={{ color: accentColor }}>
                          Brand: <span className="font-semibold text-black">{item.brandName}</span>
                        </p>
                      )}
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>
                      <p className="text-gray-800 text-md line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="pt-3 flex justify-between items-center">
                      <span 
                        className="text-sm font-medium flex items-center transition-colors duration-300" 
                        style={{ color: accentColor }}
                      >
                        Learn more
                        <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div 
                        className="w-8 h-0.5 group-hover:w-12 transition-all duration-300" 
                        style={{ backgroundColor: highlightColor }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemSlider;