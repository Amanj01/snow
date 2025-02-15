"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Local data array with medical products
const localProjects = [
  {
    id: 1,
    title: "Advanced MRI Scanner",
    brand: "Siemens Healthineers",
    description:
      "Next generation magnetic resonance imaging technology with enhanced resolution and faster scanning capabilities for improved diagnostic accuracy.",
    thumbnail1:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "advanced-mri-scanner",
  },
  {
    id: 2,
    title: "Portable Ultrasound Device",
    brand: "Philips Healthcare",
    description:
      "Compact ultrasound system with wireless connectivity for point-of-care diagnostics in any clinical setting.",
    thumbnail1:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "portable-ultrasound",
  },
  {
    id: 3,
    title: "Smart Insulin Pump",
    brand: "Medtronic",
    description:
      "AI-powered insulin delivery system with continuous glucose monitoring integration for optimized diabetes management.",
    thumbnail1:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "smart-insulin-pump",
  },
  {
    id: 4,
    title: "Digital Stethoscope",
    brand: "3M Littmann",
    description:
      "Advanced acoustic technology with noise cancellation and heartbeat visualization for superior auscultation in any environment.",
    thumbnail1:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "digital-stethoscope",
  },
  {
    id: 5,
    title: "Robotic Surgical Assistant",
    brand: "Intuitive Surgical",
    description:
      "Precision robotics system for minimally invasive procedures with enhanced surgeon control and patient outcomes.",
    thumbnail1:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "robotic-surgical-assistant",
  },
];

const ProjectSlider = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef(null);
  const [projects, setProjects] = useState(localProjects);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      handleScrollRight();
    }, 4000); // Slowed down interval for sliding

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
      const gap = 24; // gap-6 = 24px

      const scrollAmount = cardWidth + gap;

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
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={animation}
      className="bg-gray-900"
    >
      <div className="text-white pt-16 md:pt-20 lg:pt-24 px-6 md:px-16 lg:px-24 pb-16 max-w-8xl mx-auto">
        <div className="flex mb-10 md:mb-16 items-center justify-between">
          <h1 className="text-left text-2xl md:text-4xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
              Medical Devices
            </span>{" "}
            by Plenum Medical
          </h1>
          <button
            onClick={handleScrollRight}
            className="p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition-colors duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-blue-400" />
          </button>
        </div>

        <div className="relative">
          <div className="absolute top-0 right-0 w-28 h-full bg-gray-900 z-10 pointer-events-none"></div>

          <div
            ref={scrollContainerRef}
            className="grid grid-flow-col gap-6 overflow-x-auto scrollbar-hide pb-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {projects.map((project, index) => (
              <Link href={`/projects/${project.slug}`} key={index}>
                <div
                  ref={index === 0 ? cardRef : null}
                  className="group cursor-pointer overflow-hidden bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50 w-[280px] md:w-[300px] lg:w-[320px]"
                >
                  <div className="relative h-48 md:h-52 overflow-hidden">
                    <Image
                      src={project.thumbnail1}
                      alt={project.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(max-width: 768px) 300px, 350px"
                    />
                    <div className="absolute inset-0 bg-gray-900/60"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-xs text-blue-300 font-medium mb-1">
                        {project.brand}
                      </p>
                      <h2 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
                        {project.title}
                      </h2>
                    </div>
                  </div>
                  <div className="p-4 h-32">
                    <p className="text-gray-300 text-sm line-clamp-4 h-20">
                      {project.description}
                    </p>
                    <div className="pt-2">
                      <span className="text-blue-400 text-xs font-medium group-hover:text-blue-300 transition-colors duration-300 flex items-center">
                        Learn more
                        <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
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