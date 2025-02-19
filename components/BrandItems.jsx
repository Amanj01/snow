"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Local data array with medical products
const imageUrl = {
  image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  image2: "https://plus.unsplash.com/premium_photo-1676325102742-34f68bea1656?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDkyfHx8ZW58MHx8fHx8",
  image3:"https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const localProjects = [
  {
    id: 1,
    title: "Advanced MRI Scanner",
    brand: "Siemens Healthineers",
    description:
      "Next generation magnetic resonance imaging technology with enhanced resolution and faster scanning capabilities for improved diagnostic accuracy.",
    thumbnail1:imageUrl.image,
    slug: "advanced-mri-scanner",
  },
  {
    id: 2,
    title: "Portable Ultrasound Device",
    brand: "Philips Healthcare",
    description:
      "Compact ultrasound system with wireless connectivity for point-of-care diagnostics in any clinical setting.",
    thumbnail1:imageUrl.image2,
    slug: "portable-ultrasound",
  },
  {
    id: 3,
    title: "Smart Insulin Pump",
    brand: "Medtronic",
    description:
      "AI-powered insulin delivery system with continuous glucose monitoring integration for optimized diabetes management.",
    thumbnail1:imageUrl.image3,
    slug: "smart-insulin-pump",
  },
  {
    id: 4,
    title: "Digital Stethoscope",
    brand: "3M Littmann",
    description:
      "Advanced acoustic technology with noise cancellation and heartbeat visualization for superior auscultation in any environment.",
    thumbnail1:imageUrl.image,
    slug: "digital-stethoscope",
  },
  {
    id: 5,
    title: "Robotic Surgical Assistant",
    brand: "Intuitive Surgical",
    description:
      "Precision robotics system for minimally invasive procedures with enhanced surgeon control and patient outcomes.",
    thumbnail1:imageUrl.image2,
    slug: "robotic-surgical-assistant",
  },
];

const ProjectSlider = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef(null);
  const [projects, setProjects] = useState(localProjects);
  const cardRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      handleScrollRight();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={animation}
      className="bg-white"
    >
      <div className="max-w-8xl mx-auto px-6 md:px-16 lg:px-24 pt-16 md:pt-20 lg:pt-24 pb-16">
        <div className="flex items-center justify-between mb-10 md:mb-16">
          <div className="relative w-full text-center">
            <h1 className="text-2xl md:text-5xl font-bold tracking-tight">
              <span className="text-[#0052CC]">Medical Devices</span>
              <span className="text-black"> By Snow Medical</span>
            </h1>
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-[#FF3B30]" />
          </div>
          <button
            onClick={handleScrollRight}
            className="ml-4 p-2 bg-[#0052CC] hover:bg-[#003D99] text-white transition-colors duration-200"
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
            {projects.map((project, index) => (
              <Link href={`/projects/${project.slug}`} key={index}>
                <div
                  ref={index === 0 ? cardRef : null}
                  className="group cursor-pointer w-[300px] md:w-[320px] lg:w-[340px] border border-gray-200 hover:border-[#0052CC] transition-all duration-300"
                >
                  <div className="relative h-52 md:h-56 overflow-hidden">
                    <Image
                      src={project.thumbnail1}
                      alt={project.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(max-width: 768px) 300px, 350px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
                  </div>
                  
                  <div className="p-5 h-36 flex flex-col justify-between bg-white mb-2">
                    <div>
                      <p className="text-[#0052CC] text-sm mb-2">
                        Brand: <span className="font-semibold text-black">{project.brand}</span>
                      </p>
                      <p className="text-gray-800 text-md line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="pt-3 flex justify-between items-center">
                      <span className="text-[#0052CC] text-sm font-medium group-hover:text-[#003D99] transition-colors duration-300 flex items-center">
                        Learn more
                        <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div className="w-8 h-0.5 bg-[#FF3B30] group-hover:w-12 transition-all duration-300" />
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

export default ProjectSlider;