"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import Link from "next/link";
import { format } from 'date-fns';
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllResources } from '@/api-requests/apiReq';

const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

const ResourcesSection = ({ initialResources, initialTotalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Get the current page from URL or default to 1
  const currentPageParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(currentPageParam ? parseInt(currentPageParam) : 1);
  
  const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
  const [resources, setResources] = useState(initialResources || []);
  const [loading, setLoading] = useState(false);
  const title = "RESOURCES";
  const PAGE_SIZE = 10;

  useEffect(() => {
    // Update resources when page changes
    const fetchResources = async () => {
      setLoading(true);
      try {
        const response = await getAllResources(currentPage, PAGE_SIZE);
        setResources(response.data);
        setTotalPages(response.meta.totalPages);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if the page changed from the initial load
    if (currentPage !== (currentPageParam ? parseInt(currentPageParam) : 1)) {
      fetchResources();
    }
  }, [currentPage, currentPageParam]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      
      // Update URL with the new page parameter
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());
      router.push(`?${params.toString()}`);
      
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
          className="w-10 h-10 text-blue-700"
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
          className={`w-10 h-10 ${i === currentPage ? 'bg-white text-blue-600 border border-blue-600' : 'text-blue-700'}`}
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
          className="w-10 h-10 rounded-full text-blue-700"
        >
          {totalPages}
        </button>
      );
    }
    
    return pageNumbers;
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-center items-center mt-16 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-700'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        {renderPageNumbers()}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-700'}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="px-4 md:px-6 py-16 md:py-24 lg:pt-36 text-[#333333]">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-mansory uppercase mb-8 text-black">
            {title}
          </h1>
          <p>Loading resources...</p>
        </div>
      </section>
    );
  }

  if (!resources || resources.length === 0) {
    return (
      <section className="px-4 md:px-6 py-16 md:py-24 lg:pt-36 text-[#333333]">
        <div className="container mx-auto text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-mansory uppercase mb-8 text-black">
            {title}
          </h1>
          <p className="text-gray-600">No resources available at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-6 text-[#333333]">
      <div className="container mx-auto flex flex-col">
        <div className="title flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-mansory uppercase sm:mb-0 text-black">
            {title}
          </h1>
        </div>

        <div className="content grid grid-cols-1 md:grid-cols-2 gap-12" ref={ref}>
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col border-l-2 border-red-500 pl-4 hover:border-blue-700 transition-colors duration-300 pb-2"
            >
              <Link href={process.env.NEXT_PUBLIC_API_URL + resource.filePath} target="_blank" rel="noopener noreferrer">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between mb-2 group">
                    <h2 className="font-mansory uppercase text-lg md:text-xl pr-4 group-hover:text-blue-500 transition duration-300 text-gray-800">
                      {resource.title}
                    </h2>
                    <span className="flex-shrink-0 group-hover:translate-x-2 transition-transform duration-300 mt-1">
                      <HiArrowRight size={20} className="text-gray-500 group-hover:text-blue-500" />
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {truncateText(resource.description, 100)}
                  </p>
                  
                  <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs inline-block text-gray-600">
                        {format(new Date(resource.createdAt), 'MMMM d, yyyy')}
                      </span>
                    </div>
                    <hr className="border-t border-gray-200 w-full mt-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {totalPages > 1 && renderPagination()}
      </div>
    </section>
  );
};

export default ResourcesSection;
