"use client"
import React, { useEffect , useState} from 'react';
import { motion } from 'framer-motion';
import { Heart, Pill, Stethoscope, Syringe, Microscope, Activity, ThermometerSun} from "lucide-react";
import Slider from 'react-infinite-logo-slider';
import Link from 'next/link';

const LogoSlider = () => {
  
  const [sliderWidth, setSliderWidth] = useState("200px");
  useEffect(() => {
    const handleResize = () => {
      setSliderWidth(window.innerWidth < 780 ? "100px" : "200px");
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
    image:<Heart size={65}/>,
  },
  {
    id: 2,
    name: 'Philips Healthcare',
    image: <Pill size={65}/>,
  },
  {
    id: 3,
    name: 'Medtronic',
    image: <Stethoscope size={65}/>,
  },
  {
    id: 4,
    name: '3M Littmann',
    image: <Syringe size={65}/>
    },
    {
      id: 2,
      name: 'Philips Healthcare',
      image: <Pill size={65}/>,
    },
    {
      id: 3,
      name: 'Medtronic',
      image: <Stethoscope size={65}/>,
    },
    {
      id: 4,
      name: '3M Littmann',
      image: <Syringe size={65}/>
    },
    {
      id: 5,
      name: 'Siemens Healthineers',
      image: <Microscope size={65}/>,
    },
    {
      id: 6,
      name: 'Philips Healthcare',
      image: <Activity size={65}/>
    },
    {
      id: 7,
      name: 'Medtronic',
      image: <ThermometerSun size={65}/>,
    }
]
  // const [logos, setLogos] = useState([]);
  // const [loading, setLoading] = useState(true);


  // useEffect(() => {
  //   const fetchLogo = async () => {
  //     try {
  //       const response = await fetch('http://plenum.a-h-y.com/api/brands');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setLogos(data.data);
  //       console.log(data.data);

  //     } catch (error) {
  //       console.error('Error fetching projects:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchLogo();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  
  return (
    <div className='pb-8 md:py-10 bg-white relative lg:mb-16'>
      <Slider
        width={sliderWidth}
        duration={12}
        pauseOnHover={true}
        blurBorders={true}
        blurBorderColor="white"
      >
        {brandLogos.map((item, index) => (
          <Slider.Slide key={index}>
            <motion.div
              className="p-4 transition-all duration-500 group"
            >
            <Link href={`/brands/${item.id}`}>
              {React.cloneElement(item.image, { 
              className: 'transition-all duration-300 grayscale group-hover:grayscale-0 text-gray-600 group-hover:text-blue-600 w-[45px] h-[45px] md:w-[70px] md:h-[70px]'
              })}
            </Link>
            </motion.div>
          </Slider.Slide>
        ))}
      </Slider>
    </div>
  );
}
export default LogoSlider;