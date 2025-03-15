import React from 'react'
import ItemSlider from './BrandItemSlider'

const BrandItems = async (data) => {
  const items = data.data;
  return <ItemSlider items={items} title={"Medical Devices By Snow Medical"}/>
}

export default BrandItems