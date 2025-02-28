import Hero from '@/components/Hero'
import BrandItems from '@/components/BrandItems'
import React from 'react'
 import LogoSlider from '@/components/LogoBrandsSlider'
import Carousel from '@/components/Carousel'
import { comments } from '@/lib/testimonialsData'

const page = () => {
  return (
    <div className=''>
      <Hero />
      <div className='pt-16 md:pt-28 lg:pt-36'>
       <BrandItems />
      </div>
      <div className='pt-16 md:pt-28 lg:pt-36'>
       <Carousel comments={comments} title={"user testimonials"} brandAppearance={true} />
      </div>
      <div className='py-16 md:py-24'>
         <LogoSlider />
      </div>
    </div>
  )
}

export default page


