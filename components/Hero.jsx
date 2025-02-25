import React from 'react';
import HeroSection from './HeroDaynamic';
import { data } from '../lib/hero-data';

const Hero = () => {
  return <HeroSection data={data}/>
};

export default Hero;