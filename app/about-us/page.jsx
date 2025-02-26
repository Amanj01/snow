"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';
import Head from 'next/head';


const aboutText = [
  {
    title: "Research Partnerships",
    description: "We partner with leading research institutions to advance medical knowledge and technology."
  },
  {
    title: "Clinical Training",
    description: "We provide comprehensive training programs to ensure optimal use of our medical devices."
  },
  {
    title: "Ongoing Support",
    description: "Our dedicated support team ensures healthcare providers can focus on patient care."
  }
]

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>

    {/* for SEO optmazation meta tags and title */}
      <Head>
        <title>About | Snow Medical</title>
        <meta name="description" content="Learn about Snow Medical and our commitment to advancing healthcare" />
      </Head>

      <section className="w-screen mx-auto px-4 md:px-6 py-16 md:py-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 md:mb-10 lg:mb-16"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-mansory text-black pt-12"
          >
            ABOUT
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[500px] w-full overflow-hidden shadow-lg"
          >
            <Image
              src="/about.jpg"
              alt="Snow Medical Team"
              layout="fill"
              objectFit="cover"
              priority
            />
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-mansory mb-6 text-black uppercase border-b-2 border-red-500 pb-2 inline-block"
            >
              Advancing Medical Innovation
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg mb-6 text-gray-700">
              At Snow Medical, we're dedicated to developing cutting-edge medical devices that transform patient care and clinical outcomes.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-lg mb-6 text-gray-700">
              Our team of expert engineers, clinicians, and researchers work together to create innovative solutions that address the most pressing challenges in healthcare today.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-lg mb-6 text-gray-700">
              From AI-powered monitoring systems to precision robotics, we combine advanced technology with medical expertise to improve patient lives worldwide.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-mansory uppercase mb-4 text-blue-700">
              Our Commitment to the Medical Community
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We collaborate closely with healthcare professionals to develop solutions that meet real clinical needs and improve workflow efficiency.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutText.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 shadow-lg"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <div className="w-6 h-1 bg-red-500"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}