"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";

const ItemSlider = ({
  items,
  title,
  accentColor = "#0052CC",
  fade = "white",
  autoScrollInterval = 4000,
 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeDescriptionRefs, setActiveDescriptionRefs] = useState({});
  const [isSliding, setIsSliding] = useState(false);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const scrollContainerRef = useRef(null);
  const cardRef = useRef(null);
  const descriptionRefs = useRef({});
  const scrollTimeouts = useRef({});
  const slideAnimationDuration = 500; // Animation duration in ms
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);

  // Check if at the last slide
  const checkIfLastSlide = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;
      setIsLastSlide(isAtEnd);
    }
  };

  // Monitor scroll events to detect when sliding is happening
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const now = Date.now();
    
    // If we weren't already sliding, start sliding
    if (!isScrollingRef.current) {
      isScrollingRef.current = true;
      setIsSliding(true);
    }
    
    // Update the last scroll time
    lastScrollTimeRef.current = now;
    
    // Check if we're at the last slide
    checkIfLastSlide();
    
    // Clear any existing timeout
    clearTimeout(scrollTimeouts.current.scrollEnd);
    
    // Set a timeout to detect when scrolling has stopped
    scrollTimeouts.current.scrollEnd = setTimeout(() => {
      isScrollingRef.current = false;
      setIsSliding(false);
    }, 100); // Small timeout to detect when scrolling stops
  };

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Initial check
  useEffect(() => {
    checkIfLastSlide();
  }, []);
  
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const cardWidth = cardRef.current?.offsetWidth || 300;
      const gap = 24;

      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        // We're at the end, scroll back to start
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          }
        }, 1000); // Wait a second before resetting to start
      } else {
        scrollContainerRef.current.scrollBy({
          left: cardWidth + gap,
          behavior: "smooth",
        });
      }
    }
  };

  // Main horizontal slider auto-scroll
  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        handleScrollRight();
      }, autoScrollInterval);
    }
    return () => clearInterval(interval);
  }, [autoScrollInterval, isPaused]);

  // Description vertical auto-scroll with 1-second delay
  useEffect(() => {
    const autoScrollTimers = {};
    const scrollHandlers = {};
    const startDelays = {};

    Object.keys(activeDescriptionRefs).forEach(index => {
      if (activeDescriptionRefs[index]) {
        const descriptionEl = descriptionRefs.current[index];
        if (!descriptionEl) return;

        const needsScroll = descriptionEl.scrollHeight > descriptionEl.clientHeight;
        if (!needsScroll) return;

        let scrollDirection = 1;
        let currentPosition = 0;
        let lastProgrammaticScroll = 0;
        let isManualScrolling = false;

        const startAutoScroll = () => {
          if (isManualScrolling) return;
          
          clearInterval(autoScrollTimers[index]);
          
          currentPosition = descriptionEl.scrollTop;
          const maxScroll = descriptionEl.scrollHeight - descriptionEl.clientHeight;

          if (currentPosition >= maxScroll) {
            scrollDirection = -1;
          } else if (currentPosition <= 0) {
            scrollDirection = 1;
          }

          autoScrollTimers[index] = setInterval(() => {
            if (!descriptionEl || isManualScrolling) return;

            lastProgrammaticScroll = Date.now();
            currentPosition += scrollDirection;
            descriptionEl.scrollTop = currentPosition;

            const maxScroll = descriptionEl.scrollHeight - descriptionEl.clientHeight;
            if (currentPosition >= maxScroll || currentPosition <= 0) {
              clearInterval(autoScrollTimers[index]);
              scrollDirection = -scrollDirection;

              setTimeout(() => {
                if (activeDescriptionRefs[index] && !isManualScrolling) {
                  startAutoScroll();
                }
              }, 1000);
            }
          }, 250);
        };

        // 1-second delay before starting auto-scroll
        startDelays[index] = setTimeout(() => {
          startAutoScroll();
        }, 3000);

        const handleDescScroll = () => {
          if (Date.now() - lastProgrammaticScroll < 100) return;

          isManualScrolling = true;
          clearInterval(autoScrollTimers[index]);
          clearTimeout(scrollTimeouts.current[index]);
          clearTimeout(startDelays[index]);

          scrollTimeouts.current[index] = setTimeout(() => {
            isManualScrolling = false;
            if (activeDescriptionRefs[index]) {
              startAutoScroll();
            }
          }, 3000);
        };

        descriptionEl.addEventListener('scroll', handleDescScroll);
        scrollHandlers[index] = handleDescScroll;
      }
    });

    return () => {
      Object.values(autoScrollTimers).forEach(clearInterval);
      Object.values(startDelays).forEach(clearTimeout);
      Object.entries(scrollHandlers).forEach(([index, handler]) => {
        const el = descriptionRefs.current[index];
        if (el) el.removeEventListener('scroll', handler);
      });
      Object.values(scrollTimeouts.current).forEach(clearTimeout);
    };
  }, [activeDescriptionRefs]);

  // Visibility observer
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

  const handleCardMouseEnter = (index) => {
    setIsPaused(true);
    setActiveDescriptionRefs(prev => ({...prev, [index]: true}));
  };

  const handleCardMouseLeave = (index) => {
    setIsPaused(false);
    setActiveDescriptionRefs(prev => ({...prev, [index]: false}));
    
    if (descriptionRefs.current[index]) {
      descriptionRefs.current[index].scrollTop = 0;
    }
  };

  const handleTouchStart = (index) => {
    setIsPaused(true);
    setActiveDescriptionRefs(prev => ({...prev, [index]: true}));
  };

  const setDescriptionRef = (el, index) => {
    descriptionRefs.current[index] = el;
  };

  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={animation}
      className="w-full pt-16 md:pt-20 lg:pt-24 pb-16"
    >
      <div className="container mx-auto">
        <div className="px-2 md:px-0 lg:px-6 mb-10 md:mb-16 ">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-4xl lg:text-5xl text-left uppercase font-mansory">
              {title}
            </h1>
            <button
              onClick={handleScrollRight}
              className="p-2 transition-colors duration-200 text-white"
              style={{ backgroundColor: accentColor }}
              aria-label="Scroll right"
            >
             <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
        <div className="relative">
        {/* Left fade with dynamic intensity */}
        <div 
          className="absolute top-0 -left-10 w-28 h-full rounded-md pointer-events-none z-10"
          style={{ 
            opacity: isSliding && !isLastSlide ? 1 : 0,  // This line already handles it correctly
            background: `linear-gradient(to right, white, ${fade}, transparent)`,
            transition: isSliding ? 'opacity 0.4s ease-in' : 'opacity 0.9s ease-out'
          }}
        />
        {/* Right fade with dynamic intensity */}
        <div 
          className="absolute top-0 right-0 w-28 h-full pointer-events-none z-10"
          style={{ 
            background: `linear-gradient(to left, white 20%, transparent)`,
            transition: 'opacity 0.4s ease-in-out'
          }}
        />
          <div
            ref={scrollContainerRef}
            className="grid grid-flow-col gap-6 overflow-x-auto scrollbar-hide pb-4 container mx-auto"
          >
            {items.map((item, index) => {
              const isLongDescription = item.description && item.description.length > 150;
              
              return (
                <div
                  key={index}
                  ref={index === 0 ? cardRef : null}
                  className="group cursor-context-menu w-[300px] md:w-[320px] lg:w-[340px] h-[410px] relative overflow-hidden border border-gray-200 transition-all duration-300"
                  onMouseEnter={() => handleCardMouseEnter(index)}
                  onMouseLeave={() => handleCardMouseLeave(index)}
                  onTouchStart={() => handleTouchStart(index)}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={item.cardImage}
                      alt={item.name}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(max-width: 768px) 300px, 350px"
                    />
                    
                    <div 
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0052CC] to-transparent opacity-100 transition-all duration-500"
                      style={{ height: '30%', background: `linear-gradient(to top, ${accentColor}, transparent)` }}
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-[#0052CC] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ height: '100%', background: `linear-gradient(to top, ${accentColor}, transparent)` }}
                    />
                    
                    <div className="absolute top-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      {item.brandName && (
                        <Link
                        href={`/brands/${item.id || item.brandId}`}
                        className="text-sm capitalize hover:text-blue-600 transition-colors duration-300"
                        >
                          {item.brandName}
                        </Link>
                      )}
                      <h3 className="text-lg">{item.name}</h3>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white transition-all duration-500 group-hover:opacity-0 flex justify-between items-center">
                      {item.brandName && (
                        <p className="text-sm">{item.brandName}</p>
                      )}
                      <h3 className="text-lg ">{item.name}</h3>
                    </div>

                    <div 
                      ref={(el) => setDescriptionRef(el, index)}
                      className="absolute top-20 bottom-12 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent max-h-[280px] touch-auto"
                      style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                      <p className="text-sm text-white mb-2">{item.description}</p>
                    </div>
                    
                    {isLongDescription && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <ChevronDown className="w-5 h-5 text-white animate-bounce" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ItemSlider;