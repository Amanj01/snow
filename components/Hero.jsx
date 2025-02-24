import React from 'react';
import HeroSection from './HeroDaynamic';
import { data } from '../lib/hero-data';

const Hero = () => {
  return <div>{<HeroSection data={data}/>}</div>
};

export default Hero;