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
      <BrandItems />
      <Carousel comments={comments} title={"user testimonials"} brandAppearance={true} />
      <LogoSlider />
    </div>
  )
}

export default page


