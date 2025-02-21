import React from 'react'
import { testimonials } from '@/lib/testimonialsData'
import Carousel from '@/components/Carousel'
const Testimonials = () => {
  return (
    <div>
      <Carousel data={testimonials} title="Users Feedback" />
    </div>
  )
}
export default Testimonials