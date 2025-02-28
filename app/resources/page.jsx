import ResourcesSection from '@/components/Resources'
import React from 'react'
import { SnowResourcesData } from '@/lib/snow-resources-data'
import Head from 'next/head'

 const SnowResources = () => {  
  return(
    <>
      <Head> 
      <title>Snow recources || Snow Medical</title>
      <meta name="description" content="Read our latest recrources on snow medical." />
      </Head>
    <div className='pb-24 pt-28 md:pt-32 lg:pt-36'>
    <ResourcesSection resources={SnowResourcesData}/>
    </div>
    </>
 
  )
}

export default SnowResources
