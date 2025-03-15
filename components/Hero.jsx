import React from 'react';
import HeroSection from './HeroDaynamic';



const Hero = async ({ data }) => {
   return <HeroSection data={data}/>
};

export default Hero;