import Hero from '@/components/Hero'
import BrandItems from '@/components/BrandItems'
import React from 'react'
import MedicalTestimonials from '@/components/Testimonials'
import LogoSlider from '@/components/LogoBrandsSlider'
const page = () => {
  return (
    <div className=''>
      <Hero />
      <BrandItems />
      <MedicalTestimonials />
      <LogoSlider />
    </div>
  )
}

export default page


