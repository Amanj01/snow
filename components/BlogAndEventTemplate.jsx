"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const BlogAndEventTemplate = ({
  initialData,
  initialTotalPages,
  title = "BLOG",
  backgroundColor = "bg-gray-50",
  accentColor = "#0052CC",
  textAccentColor = "text-[#0052CC]",
  itemLinkPrefix = "blog",
  itemsPerPage = 6
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get the current page from URL or default to 1
  const currentPageParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(currentPageParam ? parseInt(currentPageParam) : 1);
  
  const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
  const [displayedItems, setDisplayedItems] = useState(initialData || []);
  const [loading, setLoading] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  const textAnimation = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  useEffect(() => {
    // Only fetch if the page changed from the initial load
    if (currentPage !== (currentPageParam ? parseInt(currentPageParam) : 1)) {
      const fetchItems = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${itemLinkPrefix}`, {
            params: {
              page: currentPage,
              pageSize: itemsPerPage
            }
          });
          setDisplayedItems(response.data.data);
          setTotalPages(response.data.meta.totalPages);
        } catch (error) {
          console.error("Error fetching items:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchItems();
    }
  }, [currentPage, itemsPerPage, itemLinkPrefix, currentPageParam]);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      
      // Update URL with the new page parameter
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());
      router.push(`?${params.toString()}`, { scroll: false });
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`w-10 h-10 ${textAccentColor}`}
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis1" className="px-2">...</span>);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button 
          key={i} 
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 ${i === currentPage ? `bg-white ${title === "BLOG" ? 'text-[#0052CC] border border-[#0052CC]' : 'text-[#FF4500] border border-[#FF4500]'}` : textAccentColor}`}
        >
          {i}
        </button>
      );
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis2" className="px-2">...</span>);
      }
      
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`w-10 h-10 ${textAccentColor}`}
        >
          {totalPages}
        </button>
      );
    }
    
    return pageNumbers;
  };

  if (loading) {
    return (
      <div className={`${backgroundColor} min-h-screen flex items-center justify-center`}>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!displayedItems || !displayedItems.length) {
    return (
      <div className={`${backgroundColor} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No items to display</h2>
          <p className="text-gray-600">Check back later for updates.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <motion.div
        className="px-4 md:px-6"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={textAnimation}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-mansory mb-4 text-black">{title}</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                    <Link
                      href={`/${itemLinkPrefix}/${item.id}`}
                      className="group block h-[410px] w-full relative overflow-hidden border border-gray-200"
                    >
                  <div className="relative w-full h-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${item.coverImage}`|| item.image || '/default-placeholder.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 300px, 350px"
                    />
                    
                    <div 
                      className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0052CC] to-transparent"
                      style={{ background: `linear-gradient(to top, ${accentColor}, transparent)` }}
                    />
                    
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-[#0052CC] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to top, ${accentColor}, transparent)` }}
                    />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white transition-all duration-500 group-hover:opacity-0">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      {item.date && <p className="text-sm mt-1">{item.date}</p>}
                    </div>
                    <div 
                      className="absolute top-20 bottom-12 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent"
                    >
                      <h3 className="text-xl font-medium mb-4 text-white">{item.title}</h3>
                      <p className="text-md text-white">
                        {item.content}
                      </p>
                    </div>
                    
                    {item.description && item.description.length > 150 && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <ChevronDown className="w-5 h-5 text-white animate-bounce" />
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-16 space-x-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : textAccentColor}`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              {renderPageNumbers()}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : textAccentColor}`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogAndEventTemplate;
