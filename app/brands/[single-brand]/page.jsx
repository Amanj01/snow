import BrandPage from '@/components/SingleBrand'
import React from 'react'
import { brandData } from '@/lib/single-brand-data'

 const SingleBrandPage = () => {
  return <BrandPage brand={brandData}/>
}

export default SingleBrandPage