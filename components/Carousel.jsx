"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const Carousel = ({ comments, title, brandAppearance }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  // Organize testimonials into columns
  const organizeIntoColumns = (items, columnCount) => {
    const columns = Array.from({ length: columnCount }, () => []);

    items.forEach((item, index) => {
      const columnIndex = index % columnCount;
      columns[columnIndex].push(item);
    });

    return columns;
  };

  // Responsive column count
  const getColumnCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2; // md
      return 1; // sm
    }
    return 3; // Default for SSR
  };

  const [columns, setColumns] = useState(() => organizeIntoColumns(comments, getColumnCount()));
  const [columnCount, setColumnCount] = useState(getColumnCount());

  useEffect(() => {
    const handleResize = () => {
      const newColumnCount = getColumnCount();
      if (newColumnCount !== columnCount) {
        setColumnCount(newColumnCount);
        setColumns(organizeIntoColumns(comments, newColumnCount));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [comments, columnCount]);

  return (
    <section className="w-screen px-2 md:px-4 lg:px-6 overflow-hidden">
      <div ref={containerRef} className="container mx-auto">
        {/* Title Section */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-left font-mansory"
          >
            <h4 className="text-3xl md:text-4xl lg:text-5xl uppercase mb-14 md:mb-20">
              {title}
            </h4>
          </motion.div>
        )}
        {/* Testimonial Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 400 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="relative"
        >
          <div className="text-gray-600">
            <div className="flex gap-2">
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex-1 flex flex-col gap-2">
                  {column.map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} brandAppearance={brandAppearance} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function TestimonialCard({ testimonial, brandAppearance }) {
  return (
    <div className="border-[1.5px] border-gray-300 p-6 flex flex-col">
      {/* Review text centered with quotation marks */}
      <div className="flex-grow flex items-center justify-center relative">
        {/* Opening quote SVG */}
        <svg
          className="absolute top-0 left-0 w-10 h-10 text-gray-800 opacity-50"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>

        <p className="text-center px-12 font-sans">{testimonial.review}</p>
        {/* Closing quote SVG */}
        <svg
          className="absolute bottom-0 right-0 w-10 h-10 text-gray-800 opacity-50 transform rotate-180"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
      </div>

      {/* Brand name and username at the bottom with justify-between */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center font-sans italic capitalize">
        <span className="">{testimonial.name}</span>
        {testimonial && brandAppearance === true && (
          <Link 
            href={`/brands/${testimonial.id}`}
            className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
          >
            {testimonial.brand.name}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Carousel;