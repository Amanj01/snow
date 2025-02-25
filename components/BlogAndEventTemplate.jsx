"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const BlogAndEventTemplate = ({
  items = [],
  title = "BLOG",
  backgroundColor = "bg-gray-50",
  accentColor = "#0052CC",
  textAccentColor = "text-[#26B3B4]",
  itemLinkPrefix = "/blog",
  itemsPerPage = 6
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  const textAnimation = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  useEffect(() => {
    // Calculate total pages based on local items array
    setTotalPages(Math.ceil(items.length / itemsPerPage));
    
    // Get items for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedItems(items.slice(startIndex, endIndex));
    
    /* 
    // API version - commented out until backend is deployed
    // Function to fetch items with pagination
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/items?page=${currentPage}&pageSize=${itemsPerPage}`);
        const data = await response.json();
        
        setDisplayedItems(data.data);
        setTotalPages(data.meta.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };

    fetchItems();
    */
  }, [currentPage, items, itemsPerPage]);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    return (
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
          className={`w-10 h-10 ${i === currentPage ? 'bg-white text-[#0052CC] border border-[#0052CC]' : textAccentColor}`}
          style={{ backgroundColor: i === currentPage ? accentColor : 'transparent' }}
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
          className={`w-10 h-10 rounded-full ${textAccentColor}`}
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
        <button className={`inline-block text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase`}
          style={{ backgroundColor: accentColor }}>
          Loading...
        </button>
      </div>
    );
  }

  // Empty state handling
  if (items.length === 0) {
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
    <div className={`${backgroundColor} pt-20 min-h-screen`}>
      <motion.div
        className="min-h-screen px-4 md:px-8 pt-16 pb-24"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={textAnimation}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-mansory mb-4 text-black">{title}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item, index) => {
              const isLongDescription = item.description && item.description.length > 150;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full"
                >
                  <Link
                    href={`${itemLinkPrefix}/${item.id}`}
                    className="group block h-[410px] w-full relative overflow-hidden border border-gray-200"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={item.thumbnail || item.image|| '/default-placeholder.jpg'}
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
                          {item.description || item.short_description}
                        </p>
                      </div>
                      
                      {isLongDescription && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <ChevronDown className="w-5 h-5 text-white animate-bounce" />
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {totalPages > 1 && renderPagination()}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogAndEventTemplate;

/*
// Backend Pagination Middleware (for future use when backend is deployed)
const prisma = require("../prisma");
const paginationMiddleware = (
  modelName,
  allowedFilters = [],
  selecters = {}
) => {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page);
      const pageSize = parseInt(req.query.pageSize);
      let skip;
      let take;
      if (page && pageSize) {
        skip = (page - 1) * pageSize;
        take = pageSize;
      }
      const filters = {};
      for (const key of allowedFilters) {
        if (req.query[key]) {
          const parsedValue = parseInt(req.query[key], 10);
          filters[key] = isNaN(parsedValue) ? req.query[key] : parsedValue;
        }
        if (req.params[key]) {
          const parsedValue = parseInt(req.params[key], 10);
          filters[key] = isNaN(parsedValue) ? req.params[key] : parsedValue;
        }
      }
      const sortBy = req.query.sortBy || "createdAt";
      const order = req.query.order === "desc" ? "desc" : "asc";
      const data = await prisma[modelName].findMany({
        where: filters,
        skip,
        take,
        orderBy: { [sortBy]: order },
        include: selecters.include,
        select: selecters.select,
        omit: selecters.omit,
      });
      const totalCount =
        page && pageSize
          ? await prisma[modelName].count({
              where: filters,
            })
          : undefined;
      res.status(200).json({
        data,
        meta:
          page && pageSize
            ? {
                totalCount,
                totalPages: Math.ceil(totalCount / pageSize),
                currentPage: page,
                pageSize,
              }
            : null,
      });
    } catch (error) {
      next(error);
    }
  };
};

// Express Router Setup
const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const { protect } = require("../middlewares/authMiddleware");
const {
  getBrandById,
  createBrand,
  updateBrand,
} = require("../controllers/brandController");
const paginationMiddleware = require("../middlewares/paginationMiddleware");
const deleteRecordMiddleware = require("../middlewares/deletemiddleware");
const router = express.Router();
router.get("/", paginationMiddleware("brand"));
router.get("/:id", getBrandById);
router.post(
  "/",
  upload.fields([
    { name: "cardImage", maxCount: 1 },
    { name: "heroImage", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  protect,
  createBrand
);
router.put(
  "/:id",
  upload.fields([
    { name: "cardImage", maxCount: 1 },
    { name: "heroImage", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  protect,
  updateBrand
);
router.delete("/:id", protect, deleteRecordMiddleware("brand"));
module.exports = router;
*/