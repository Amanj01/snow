"use client"
import React, { useEffect , useState} from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-infinite-logo-slider';
import Link from 'next/link'
import Image from 'next/image';

const LogoSlider = (data) => {
  const brands = data.data;
  
  const [sliderWidth, setSliderWidth] = useState("200px");
  useEffect(() => {
    const handleResize = () => {
      setSliderWidth(window.innerWidth < 780 ? "100px" : "230px");
    };

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

const brandLogos = [
  {
    id: 1,
    name: 'Siemens Healthineers',
    image:"/lg.png",
  },
  {
    id: 2,
    name: 'Philips Healthcare',
    image:"/lg2.png",
  },
  {
    id: 3,
    name: 'Medtronic',
    image: "/lg3.png",
  },
  {
    id: 4,
    name: '3M Littmann',
    image: "/lg4.png",
    },
    {
      id: 2,
      name: 'Philips Healthcare',
      image: "/lg.png",
    },
    {
      id: 3,
      name: 'Medtronic',
      image: "/lg2.png",
    },
    {
      id: 4,
      name: '3M Littmann',
      image: "/lg3.png",
    }
]

  
  return (
    <div className=' bg-white relative'>
      <Slider
        width={sliderWidth}
        duration={11}
        pauseOnHover={true}
        blurBorders={true}
        blurBorderColor="white"
      >
        {brands.map((item, index) => (
          <Slider.Slide key={index}>
            <motion.div
              className="p-4 transition-all duration-500 group"
            >
            <Link href={`/brands/${item.id}`}>
              <Image src={process.env.NEXT_PUBLIC_API_URL+item.logo} alt={item.name} width={400} height={400}
              className= 'transition-all duration-300 grayscale group-hover:grayscale-0 text-gray-600 w-max h-[50px] md:w-max md:h-[90px]'
              />
            </Link>
            </motion.div>
          </Slider.Slide>
        ))}
      </Slider>
    </div>
  );
}
export default LogoSlider;