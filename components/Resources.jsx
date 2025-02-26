"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import Link from "next/link";
import { format } from 'date-fns';
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

const ResourcesSection = ({ 
  title = "RESOURCES",
  resources = [],
  itemsPerPage = 8
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedResources, setDisplayedResources] = useState([]);

  useEffect(() => {
    // Calculate total pages based on local resources array
    setTotalPages(Math.ceil(resources.length / itemsPerPage));
    
    // Get resources for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedResources(resources.slice(startIndex, endIndex));
    
    /* 
    // API version - commented out until backend is deployed
    // Function to fetch resources with pagination
    const fetchResources = async () => {
      try {
        const response = await fetch(`/api/resources?page=${currentPage}&pageSize=${itemsPerPage}`);
        const data = await response.json();
        
        setDisplayedResources(data.data);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
    */
  }, [currentPage, resources, itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-center items-center mt-12 space-x-2">
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
          className={`p-2  ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-700'}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    );
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

  // Empty state handling
  if (resources.length === 0) {
    return (
      <section className="px-4 md:px-6 py-16 md:py-24 lg:pt-36 text-[#333333]">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-mansory uppercase mb-8 text-black">
            {title}
          </h1>
          <p className="text-gray-600">No resources available at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-6 pb-16 pt-28 md:pt-32 lg:pt-36 text-[#333333]">
      <div className="container mx-auto flex flex-col">
        <div className="title flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-mansory uppercase mb-4 sm:mb-0 text-black">
            {title}
          </h1>
        </div>

        <div className="content grid grid-cols-1 md:grid-cols-2 gap-12" ref={ref}>
          {displayedResources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col border-l-2 border-red-500 pl-4 hover:border-blue-700 transition-colors duration-300 pb-2"
            >
              <Link href={resource.url} target="_blank" rel="noopener noreferrer">
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
                    {truncateText(resource.description, 120)}
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

/* 
// Backend pagination implementation (for future use)
// This would be implemented in your API routes or server-side code

// Example API route implementation:
export default async function handler(req, res) {
  const { page = 1, pageSize = 8 } = req.query;
  
  try {
    // Convert to numbers
    const pageNum = parseInt(page);
    const pageSizeNum = parseInt(pageSize);
    
    // Calculate skip value for pagination
    const skip = (pageNum - 1) * pageSizeNum;
    
    // Fetch data with pagination
    const resources = await prisma.resource.findMany({
      skip,
      take: pageSizeNum,
      orderBy: { createdAt: 'desc' },
      // Add any other filters or includes here
    });
    
    // Get total count for pagination metadata
    const totalCount = await prisma.resource.count();
    
    // Return paginated data with metadata
    res.status(200).json({
      data: resources,
      meta: {
        totalCount,
        totalPages: Math.ceil(totalCount / pageSizeNum),
        currentPage: pageNum,
        pageSize: pageSizeNum
      }
    });
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
}
*/