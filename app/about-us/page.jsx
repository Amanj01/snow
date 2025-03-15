import React, { Suspense } from 'react'
import { Metadata } from 'next';
import SnowAbout from '@/components/SnowAbout'

export const metadata = {
  title: 'About Us || Snow Medical',
  description: 'Learn about Snow Medical and our mission to revolutionize medical care.',
};




const About = () => {
  return (
      <SnowAbout />
  )
}

export default About
