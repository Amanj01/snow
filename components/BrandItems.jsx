import React from 'react'
import ItemSlider from './BrandItemSlider'
import { productItems } from '@/lib/brand-items-slider'

const BrandItems = () => {
  return <ItemSlider items={productItems} title={"Medical Devices By Snow Medical"}/>
}

export default BrandItems