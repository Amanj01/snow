"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaHeartbeat, FaHospitalSymbol, FaStethoscope } from 'react-icons/fa';

const medicalContent = [
  {
    title: "Advanced Cardiac Care",
    subtitle: "Comprehensive heart health services with cutting-edge technology",
    image: "/hero1.webp",
    icon: <FaHeartbeat />
  },
  {
    title: "Emergency Medicine",
    subtitle: "24/7 emergency services with expert medical teams",
    image: "/hero2.jpg",
    icon: <FaHospitalSymbol />
  },
  {
    title: "Preventive Healthcare",
    subtitle: "Personalized wellness programs for optimal health",
    image: "/hero3.jpg",
    icon: <FaStethoscope />
  }
];

const MedicalHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % medicalContent.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-gray-900 ">
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="lg:w-1/2 mb-12 lg:mb-0 space-y-8 relative z-10">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="mb-6 text-4xl text-emerald-400">
                {medicalContent[activeIndex].icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {medicalContent[activeIndex].title}
              </h1>
              <p className="text-xl mb-8 text-gray-300 font-light">
                {medicalContent[activeIndex].subtitle}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2"
              >
                <FaStethoscope />
                Schedule Consultation
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image Container */}
        <div className="lg:w-1/2 w-full relative lg:mt-24">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-96 lg:h-[500px]"
            >
              <Image
                src={medicalContent[activeIndex].image}
                alt="Medical service"
                fill
                className="object-cover shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl mix-blend-lighten"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-4 mt-12">
        {medicalContent.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => setActiveIndex(index)}
            className="h-1 w-12 bg-gray-300 rounded-full cursor-pointer relative overflow-hidden"
            whileHover={{ scaleY: 1.2 }}
          >
            {index === activeIndex && (
              <motion.div
                className="absolute left-0 top-0 h-full bg-emerald-400 w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5.8, ease: "linear" }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating Features */}
      <div className="container mx-auto px-4 mt-16 grid md:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ y: -10 }}
          className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold text-white mb-4">24/7 Emergency</h3>
          <p className="text-gray-300 font-light">Immediate care when you need it most</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -10 }}
          className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold text-white mb-4">Expert Doctors</h3>
          <p className="text-gray-300 font-light">Board-certified specialists</p>
        </motion.div>
        <motion.div
          whileHover={{ y: -10 }}
          className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold text-white mb-4">Digital Records</h3>
          <p className="text-gray-300 font-light">Secure patient portal access</p>
        </motion.div>
      </div>
    </section>
  );
};

export default MedicalHero;