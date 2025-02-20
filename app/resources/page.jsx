"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

// Sample local data - replace with your own resource items
const sampleResources = [
  {
    id: 1,
    title: "Guide to Medical Device Regulations in 2025",
    description: "Comprehensive overview of the latest regulatory changes affecting medical device manufacturers and distributors in the US and EU markets.",
    category: "GUIDE",
    date: "February 2025",
    link: "/resources/medical-device-regulations"
  },
  {
    id: 2,
    title: "Patient Care Best Practices for Modern Healthcare Providers",
    description: "Evidence-based approaches to improving patient outcomes while reducing provider burnout and enhancing operational efficiency.",
    category: "WHITEPAPER",
    date: "January 2025",
    link: "/resources/patient-care-best-practices"
  },
  {
    id: 3,
    title: "Understanding Advanced Medical Imaging Technologies",
    description: "A technical breakdown of emerging imaging modalities including AI-enhanced MRI and portable ultrasound innovations.",
    category: "TUTORIAL",
    date: "December 2024",
    link: "/resources/medical-imaging-technologies"
  },
  {
    id: 4,
    title: "Healthcare Data Security: Comprehensive Protection Guidelines",
    description: "Strategic frameworks for securing patient data while maintaining compliance with HIPAA and international privacy regulations.",
    category: "REPORT",
    date: "November 2024",
    link: "/resources/healthcare-data-security"
  },
  {
    id: 5,
    title: "Telemedicine Implementation Strategies",
    description: "Step-by-step guide to establishing effective telemedicine programs that enhance patient access and clinical workflows.",
    category: "GUIDE",
    date: "October 2024",
    link: "/resources/telemedicine-implementation"
  },
  {
    id: 6,
    title: "Medical Device Connectivity Standards",
    description: "Analysis of interoperability protocols for medical devices in hospital and home care environments.",
    category: "WHITEPAPER",
    date: "September 2024",
    link: "/resources/device-connectivity-standards"
  },
  {
    id: 7,
    title: "Preventative Care Programs: ROI Analysis",
    description: "Financial models demonstrating the long-term cost benefits of comprehensive preventative care initiatives.",
    category: "REPORT",
    date: "August 2024",
    link: "/resources/preventative-care-roi"
  },
  {
    id: 8,
    title: "Remote Patient Monitoring Best Practices",
    description: "Clinical guidelines for implementing effective remote monitoring programs for chronic disease management.",
    category: "TUTORIAL",
    date: "July 2024",
    link: "/resources/remote-patient-monitoring"
  },
  {
    id: 9,
    title: "AI in Clinical Decision Support",
    description: "Review of machine learning applications that enhance diagnostic accuracy and treatment planning.",
    category: "WHITEPAPER",
    date: "June 2024",
    link: "/resources/ai-clinical-decision-support"
  },
  {
    id: 10,
    title: "Medical Robotics: Surgical Applications",
    description: "Current capabilities and future developments in robotic-assisted surgical procedures across specialties.",
    category: "REPORT",
    date: "May 2024",
    link: "/resources/medical-robotics-surgery"
  },
  {
    id: 11,
    title: "Value-Based Care Implementation Framework",
    description: "Transitional strategies for healthcare organizations moving from fee-for-service to value-based reimbursement models.",
    category: "GUIDE",
    date: "April 2024",
    link: "/resources/value-based-care-framework"
  },
  {
    id: 12,
    title: "Infection Control Protocols for Outpatient Settings",
    description: "Evidence-based guidelines for preventing healthcare-associated infections in ambulatory care facilities.",
    category: "TUTORIAL",
    date: "March 2024",
    link: "/resources/outpatient-infection-control"
  }
];

const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

const ResourcesSection = ({ 
  title = "RESOURCES",
  buttonText = "VIEW ALL RESOURCES",
  initialItemsToShow = 8,
  resources = sampleResources
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showAll, setShowAll] = useState(false);
  const [displayedResources, setDisplayedResources] = useState(resources.slice(0, initialItemsToShow));

  // This useEffect ensures resources update immediately when showAll changes
  useEffect(() => {
    setDisplayedResources(showAll ? resources : resources.slice(0, initialItemsToShow));
  }, [showAll, resources, initialItemsToShow]);

  const handleToggleView = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="px-4 md:px-6 py-16 md:py-24 lg:pt-36 text-[#333333] bg-gray-50">
       <div 
      className="container mx-auto flex flex-col"
    >
      <div
        className="title flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-mansory uppercase mb-4 sm:mb-0 text-black">
          {title}
        </h1>
        <button 
          onClick={handleToggleView}
          className="button border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white py-2 px-6 text-xs sm:text-sm transition duration-300"
        >
          {showAll ? "SHOW LESS" : buttonText}
        </button>
      </div>

      <div
        className="content grid grid-cols-1 md:grid-cols-2 gap-12"
        ref={ref}
      >
        {displayedResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              delay: index < initialItemsToShow ? index * 0.1 : 0.1
            }}
            className="item flex flex-col border-l-2 border-red-500 pl-4 hover:border-blue-700 transition-colors duration-300 pb-2  "
          >
            <Link href={resource.link}>
              <div className="texts flex flex-col justify-between h-full">
                <div className="flex items-start justify-between mb-2 group">
                  <h2 className="font-mansory text-lg md:text-xl pr-4 group-hover:text-blue-500 transition duration-300 text-gray-800">
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
                    <span className="bg-blue-700 px-3 py-1 text-xs text-white font-medium">
                      {resource.category}
                    </span>
                    <span className="text-xs inline-block text-gray-600">
                      {resource.date}
                    </span>
                  </div>
                  <hr className="border-t border-gray-200 w-full mt-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {resources.length > initialItemsToShow && !showAll && (
        <div className="flex justify-center mt-12">
          <button 
            onClick={handleToggleView}
            className="text-blue-700 hover:underline flex items-center gap-2"
          >
            View all {resources.length} resources <HiArrowRight />
          </button>
        </div>
      )}
    </div>
    </section>
   
  );
};

export default ResourcesSection;