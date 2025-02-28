import ResourcesSection from '@/components/Resources'
import React from 'react'
import { SnowResourcesData } from '@/lib/snow-resources-data'

 const SnowResources = () => {  
  return(
    <div className='pb-24 pt-28 md:pt-32 lg:pt-36'>
      <ResourcesSection resources={SnowResourcesData}/>
    </div>
  )
}

export default SnowResources
