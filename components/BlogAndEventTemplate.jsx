"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiArrowRight } from 'react-icons/hi';

const BlogAndEventTemplate = ({
  items = [],
  title = "BLOG",
  itemsCountText = `(${items.length}) BLOGS`,
  buttonText = "VIEW ALL",
  initialItemsToShow = 6,
  backgroundColor = "bg-gray-50",
  textColor = "text-black",
  accentColor = "bg-blue-600",
  textAccentColor = "text-[#26B3B4]",
  itemLinkPrefix = "/blog"
}) => {
  const [showAll, setShowAll] = useState(false);
  const [displayedItems, setDisplayedItems] = useState(items.slice(0, initialItemsToShow));
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  const textAnimation = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  // Update displayed items when showAll changes
  useEffect(() => {
    setDisplayedItems(showAll ? items : items.slice(0, initialItemsToShow));
  }, [showAll, items, initialItemsToShow]);

  // Start animation when component comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleToggleView = () => {
    setShowAll(!showAll);
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  if (items.length === 0) {
    return (
      <div className={`${backgroundColor} min-h-screen flex items-center justify-center`}>
        <button className={`inline-block rounded-full ${accentColor} text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal`} type="button">
          <div role="status" className="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0">Loading...</span>
          </div>
          Loading
        </button>
      </div>
    );
  }

  return (
    <div className={`${backgroundColor} pt-20 min-h-screen`}>
      <motion.div
        className={`${textColor} min-h-screen px-4 md:px-8 pt-16 pb-24`}
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={textAnimation}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-mansory mb-4">{title}</h1>
              <p className="text-xl mb-8 md:mb-0">{itemsCountText}</p>
            </div>
            
            {items.length > initialItemsToShow && (
              <button 
                onClick={handleToggleView}
                className={`button border ${textAccentColor} border-current hover:${accentColor} hover:text-white py-2 px-6 text-sm transition duration-300`}
              >
                {showAll ? "SHOW LESS" : buttonText}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 md:gap-x-6 md:gap-y-14 lg:gap-x-8 lg:gap-y-20">
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
              >
                <Link
                  href={`${itemLinkPrefix}/${item.id}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.thumbnail || item.image || '/default-placeholder.jpg'}
                      alt={item.title}
                      width={480}
                      height={300}
                      className="w-full h-[230px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    {item.category && (
                      <span className={`inline-block ${accentColor} px-3 py-1 mb-2 text-xs text-white font-medium`}>
                        {item.category}
                      </span>
                    )}
                    {item.date && (
                      <span className="text-xs block text-gray-400 mb-1">
                        {item.date}
                      </span>
                    )}
                    <h3 className="text-xl font-mansory uppercase group-hover:text-[#26B3B4] transition-colors duration-300">{item.title}</h3>
                    <div className='flex justify-between items-start'>
                      <p className="text-sm text-gray-600">{truncateText(item.short_description || item.description, 120)}</p>
                      <span className="flex-shrink-0 pr-3 group-hover:translate-x-2 transition-transform duration-300">
                        <HiArrowRight size={21} className="text-gray-400 group-hover:text-[#26B3B4]" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {items.length > initialItemsToShow && !showAll && (
            <div className="flex justify-center mt-16">
              <button 
                onClick={handleToggleView}
                className={`${textAccentColor} hover:underline flex items-center gap-2 text-sm font-medium`}
              >
                View all {items.length} items <HiArrowRight className="group-hover:translate-x-2" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogAndEventTemplate;