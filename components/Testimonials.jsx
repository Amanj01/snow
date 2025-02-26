import React from 'react'
import { comments } from '@/lib/testimonialsData'
import Carousel from '@/components/Carousel'
const Testimonials = () => {
  return (
    <div>
      <Carousel data={comments} title="Users Feedback" brandAppearance={true}/>
    </div>
  )
}
export default Testimonials