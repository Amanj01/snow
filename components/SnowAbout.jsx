"use client"
import Image from 'next/image';
import { motion } from 'framer-motion';

  const SnowAbout = ()=> {
  return (
    <section className='flex flex-col items-center pb-24 pt-28 md:py-24 lg:pt-36 text-[#333333] overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto">
          <div className='max-w-7xl flex flex-col xl:flex-row gap-5 px-4 md:px-6'>
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl  font-semibold font-mansory uppercase"
              style={{ lineHeight: "1.5" }}
            >
              Medical Innovation
            </h1>
            <p className="text-lg sm:w-2/3 md:text-xl">
              At Snow Medical, we're dedicated to developing cutting-edge medical devices that transform patient care and clinical outcomes.
            </p>
          </div>
        </div>

        <div className="relative bg-accent my-12 sm:my-20 md:my-24">
          <Image
            src="/about.jpg"
            alt="Snow Medical Team"
            className="object-cover w-full"
              width={1200}
              height={675}
            priority={true}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col xl:flex-row justify-between gap-14">
          <h1 className="text-5xl font-bold font-mansory md:text-7xl uppercase">
            Our Commitment <br className="hidden sm:block" />
            <span className="font-light">to the Medical Community</span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
            <motion.div 
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold font-mansory uppercase">
                Research Partnerships
              </h1>
              <p className="text-lg">
                We partner with leading research institutions to advance medical knowledge and technology.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold font-mansory uppercase">
                Clinical Training
              </h1>
              <p className="text-lg">
                We provide comprehensive training programs to ensure optimal use of our medical devices.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold font-mansory uppercase">
                Ongoing Support
              </h1>
              <p className="text-lg">
                Our dedicated support team ensures healthcare providers can focus on patient care.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>

  );
}

export default SnowAbout;