import ResourcesSection from '@/components/Resources'
import React, { Suspense } from 'react'
import { getAllResources } from '@/api-requests/apiReq'

export const metadata = {
  title: 'Snow || Rources',
  description: 'Read our latest resources.',
};

const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-pulse text-2xl font-mansory uppercase text-black">
      Loading Resources...
    </div>
  </div>
);

 const SnowResources = async () => {  
  const response = await getAllResources();
  const data = response.data;
   return(
    <Suspense fallback={<Loading />}>
      <div className='pb-24 pt-28 md:pt-32 lg:pt-36'>
        <ResourcesSection  initialResources={data} initialTotalPages={response.meta.totalPages} />
      </div>
    </Suspense>
  )
}

export default SnowResources
