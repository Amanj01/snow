import React, { Suspense } from 'react'
import SnowAbout from '@/components/SnowAbout'

export const metadata = {
  title: 'Snow || About Us',
  description: 'Learn about Snow Medical and our mission to revolutionize medical care.',
};

const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-pulse text-2xl font-mansory uppercase text-black">
      Loading About Us...
    </div>
  </div>
);


const About = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SnowAbout />
    </Suspense>
  )
}

export default About