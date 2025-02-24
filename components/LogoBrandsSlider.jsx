"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Pill, Stethoscope, Syringe, Microscope, Activity, ThermometerSun} from "lucide-react";
import Slider from 'react-infinite-logo-slider';

const LogoSlider = () => {

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
    <div className='py-6 md:py-10 bg-white relative my-16'>
      <Slider
        width="180px"
        duration={12}
        pauseOnHover={false}
        blurBorders={true}
        blurBorderColor="white"
      >
        {brandLogos.map((item, index) => (
          <Slider.Slide key={index}>
            <motion.div
              className="p-4 transition-all duration-500 group"
            >
              {React.cloneElement(item.image, { 
                className: 'transition-all duration-300 grayscale group-hover:grayscale-0 text-gray-600 group-hover:text-blue-600'
              })}
            </motion.div>
          </Slider.Slide>
        ))}
      </Slider>
    </div>
  );
}

export default LogoSlider;